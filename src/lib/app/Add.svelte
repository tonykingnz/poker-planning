<script>
	import { stories, index_task } from './stores.js';

	let index_story = 0;

	let story_local = [];
	stories.subscribe((value) => {
		story_local = value[index_story];
	});

	let index_task_local = {};
	index_task.set(0);
	index_task.subscribe((value) => {
		index_task_local = value;
	});

	let title = '';
	$: title_trim = title.trim();
	$: task = { index: index_task_local, title: title_trim, score: 0 };

	function addStory() {
		if (title_trim.length) {
			if (!story_local.some((story_local) => story_local.title === task.title)) {
				story_local.push(task);
				stories.update((stories) => [stories[index_story], story_local]);
				index_task.update((index_task) => (index_task += 1));
				title = '';
			}
		}
	}
</script>

<div class="form-control flex flex-row justify-start py-2">
	<div class="pr-2">
		<input class="input input-bordered" bind:value={title} placeholder="Create new task" />
	</div>
	<div>
		<button class="btn btn-primary text-2xl" on:click={addStory}> + </button>
	</div>
</div>
