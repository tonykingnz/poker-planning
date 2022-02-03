<script>
	import { writable_story, writable_index_task } from './stores.js';

	let writable_story_local = [];
	writable_story.subscribe((value) => {
		writable_story_local = value;
	});

	let writable_index_task_local = {};
	writable_index_task.set(0);
	writable_index_task.subscribe((value) => {
		writable_index_task_local = value;
	});

	let title_task = '';
	$: task = { index: writable_index_task_local, title: title_task.trim().toLowerCase(), score: 0 };

	function addTask() {
		let title_trimed = title_task.trim().toLowerCase();
		let is_unique_task = !writable_story_local.some((value) => value.title === task.title);
		if (title_trimed.length && is_unique_task) {
			writable_story_local.push(task);
			writable_story.update((value) => writable_story_local);
			writable_index_task.update((index_task) => (index_task += 1));
			title_task = '';
		}
	}
</script>

<div class="form-control flex flex-row justify-start py-2">
	<div class="pr-2">
		<input class="input input-bordered" bind:value={title_task} placeholder="Create new task" />
	</div>
	<div>
		<button class="btn btn-primary text-2xl" on:click={addTask}> + </button>
	</div>
</div>
