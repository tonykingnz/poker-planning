<script>
	import { selected_story_task } from "./stores.js";
	import { stories } from "./stores.js";

	let index_store = 0

	let task_local = [];
	selected_story_task.subscribe(value => {task_local = value;});

	let story_local = [];
	stories.subscribe(value => {story_local = value[index_store];});

	let input_text = ""
	let possibleScores = [0,1,2,3,5,8,13,21,34,55,89]
	
	function giveScore(value){
		if (task_local.length != {}){
			task_local.score = value;
			selected_story_task.update(selected_story_task => task_local);
			story_local[task_local.index] = task_local
			stories.update(stories => [stories[index_store], story_local]);
		}
	}

	function editTask(){
		if (task_local.lenght != {} && (input_text.trim()).length){
			task_local.title = input_text;
			selected_story_task.update(selected_story_task => task_local);
			story_local[task_local.index] = task_local
			stories.update(stories => [stories[index_store], story_local]);
			input_text = ""
		}
	}
	
	function deleteTask(){
		if (task_local !== {}){
			delete story_local[task_local.index]
			task_local = {}
			var i = 0, story_local_copy = []
			for (var task in story_local){
				let task_new = story_local[task]
				if (task_new != null && task_new != undefined && task_new != {}){
					task_new.index = i;
					console.log("here - ajsdhkjas")
					story_local_copy[i] = task_new
					i += 1
				}
			}
			story_local = []
			story_local = story_local_copy
			stories.update(stories => [stories[index_store], story_local]);
		}
	}
</script>

<div class="py-4">
	{#if task_local.title != undefined}
		<h4>Task selected: <b>{task_local.title}</b></h4>
		<h5>Task score: {task_local.score}</h5>
		
		<div class="py-4">
				<p>Edit task title:</p>
				<div class="flex space-x-2">
					<input bind:value={input_text} type="text" placeholder="New title" class="input input-bordered">
					<button class="btn btn-secondary px-2" on:click={() => editTask()}>Update Title</button>
					<button class="btn btn-warning px-2" on:click={() => deleteTask()}>Delete Task</button>
				</div>
		</div>	
		
		<div class="flex space-x-1 py">
			{#each possibleScores as score}
				{#if score == task_local.score}
					<button class="btn btn-accent btn-active btn-disabled" on:click={() => giveScore(score)}>{score}</button>
				{:else}
					<button class="btn btn-outline" on:click={() => giveScore(score)}>{score}</button>
				{/if}
			{/each}	
		</div>

	{:else}
		{#if story_local.length}
			<p>Select an task below.</p>
		{:else}
			<p>Nothing created</p>
		{/if}	
	{/if}
</div>

