<script>
	import { writable_story, writable_selected_task, writable_index_task } from './stores.js';

	let writable_selected_task_local = [];
	writable_selected_task.subscribe((value) => {
		writable_selected_task_local = value;
	});

	let writable_story_local = [];
	writable_story.subscribe((value) => {
		writable_story_local = value;
	});

	let input_text = '';
	let possibleScores = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

	function giveScore(value) {
		if (writable_selected_task_local.length != {}) {
			writable_selected_task_local.score = value;
			writable_selected_task.update((value) => writable_selected_task_local);
			writable_story_local[writable_selected_task_local.index] = writable_selected_task_local;
			writable_story.update((value) => writable_story_local);
		}
	}

	function editTask() {
		let input_trim = input_text.trim().toLowerCase();
		let exist_task = Boolean(writable_selected_task_local.lenght != {} && input_trim.length);

		if (exist_task) {
			writable_selected_task_local.title = input_trim;
			writable_selected_task.update((value) => writable_selected_task_local);
			writable_story_local[writable_selected_task_local.index] = writable_selected_task_local;
			writable_story.update((value) => writable_story_local);
			input_text = '';
		}
	}

	function deleteTask() {
		writable_story_local.splice(writable_selected_task_local.index, 1);
		writable_selected_task.set([]);

		let i = 0;
		function reIndex(task) {
			let process = task;
			process.index = i;
			let result = process;
			i += 1;
			return result;
		}

		let story_reindexed = writable_story_local.map(reIndex);

		let index_task_value = i;
		writable_index_task.set(index_task_value);
		writable_story.update((value) => story_reindexed);
	}
</script>

<div class="py-4">
	{#if writable_selected_task_local.title != undefined}
		<h4>Task selected: <b>{writable_selected_task_local.title}</b></h4>
		<h5>Task score: {writable_selected_task_local.score}</h5>

		<div class="py-4">
			<p>Edit task title:</p>
			<div class="flex flex-wrap space-x-2">
				<input
					bind:value={input_text}
					type="text"
					placeholder="New title"
					class="input input-bordered mr-1 my-1"
				/>
				<button class="btn btn-secondary m-1 px-2" on:click={() => editTask()}>Update Title</button>
				<button class="btn btn-warning m-1 px-2" on:click={() => deleteTask()}>Delete Task</button>
			</div>
		</div>

		<div class="flex flex-wrap place-content-start py">
			{#each possibleScores as score}
				{#if score == writable_selected_task_local.score}
					<button
						class="btn m-0.5 btn-accent btn-active btn-disabled"
						on:click={() => giveScore(score)}>{score}</button
					>
				{:else}
					<button class="btn m-0.5 btn-outline" on:click={() => giveScore(score)}>{score}</button>
				{/if}
			{/each}
		</div>
	{:else if writable_story_local.length}
		<p>Select an task below.</p>
	{:else}
		<p>Nothing created</p>
	{/if}
</div>
