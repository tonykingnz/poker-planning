<script>
	import { stories, selected_story_task, index_task } from './stores.js';

	let index_story = 0;

	let task_local = [];
	selected_story_task.subscribe((value) => {
		task_local = value;
	});

	let story_local = [];
	stories.subscribe((value) => {
		story_local = value[index_story];
	});

	let input_text = '';
	$: input_trim = input_text.trim();
	let possibleScores = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

	function giveScore(value) {
		if (task_local.length != {}) {
			task_local.score = value;
			selected_story_task.update((selected_story_task) => task_local);
			story_local[task_local.index] = task_local;
			stories.update((stories) => [stories[index_story], story_local]);
		}
	}

	function editTask() {
		if (task_local.lenght != {} && input_trim.length) {
			task_local.title = input_trim;
			selected_story_task.update((selected_story_task) => task_local);
			story_local[task_local.index] = task_local;
			stories.update((stories) => [stories[index_story], story_local]);
			input_text = '';
		}
	}

	function deleteTask() {
		story_local.splice(task_local.index, 1);
		selected_story_task.set([]);

		let i = 0;
		function reIndex(task) {
			let process = task;
			process.index = i;
			let result = process;
			i += 1;
			return result;
		}

		let story_reindexed = story_local.map(reIndex);

		let index_task_value = i;
		index_task.set(index_task_value);
		stories.update((stories) => [stories[index_story], story_reindexed]);
	}
</script>

<div class="py-4">
	{#if task_local.title != undefined}
		<h4>Task selected: <b>{task_local.title}</b></h4>
		<h5>Task score: {task_local.score}</h5>

		<div class="py-4">
			<p>Edit task title:</p>
			<div class="flex space-x-2">
				<input
					bind:value={input_text}
					type="text"
					placeholder="New title"
					class="input input-bordered"
				/>
				<button class="btn btn-secondary px-2" on:click={() => editTask()}>Update Title</button>
				<button class="btn btn-warning px-2" on:click={() => deleteTask()}>Delete Task</button>
			</div>
		</div>

		<div class="flex space-x-1 py">
			{#each possibleScores as score}
				{#if score == task_local.score}
					<button class="btn btn-accent btn-active btn-disabled" on:click={() => giveScore(score)}
						>{score}</button
					>
				{:else}
					<button class="btn btn-outline" on:click={() => giveScore(score)}>{score}</button>
				{/if}
			{/each}
		</div>
	{:else if story_local.length}
		<p>Select an task below.</p>
	{:else}
		<p>Nothing created</p>
	{/if}
</div>
