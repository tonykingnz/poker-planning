<script>
	import { stories, selected_story_task } from './stores.js';

	let index_story = 0;

	let story_local = [];
	stories.subscribe((value) => {
		story_local = value[index_story];
	});

	function selectTask(task) {
		selected_story_task.set(task);
	}

	function closeTask() {
		selected_story_task.set({});
	}
</script>

<div class="task">
	<hr />
	<!--<p>{JSON.stringify(story_local)}</p>-->
	{#if story_local.length > 0}
		<div class="flex flex-wrap place-content-evenly py-2">
			{#each story_local as task}
				{#if task.title === $selected_story_task.title}
					<button class="btn btn-accent mx-1 my-1" on:click={closeTask(task)}>
						{task.title} - {task.score}
					</button>
				{:else}
					<button class="btn mx-1 my-1" on:click={selectTask(task)}>
						{task.title} - {task.score}
					</button>
				{/if}
			{/each}
		</div>
		<hr />
	{/if}
</div>
