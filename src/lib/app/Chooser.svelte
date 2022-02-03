<script>
	import { writable_story, writable_selected_task } from './stores.js';

	let writable_story_local = [];
	writable_story.subscribe((value) => {
		writable_story_local = value;
	});

	function selectTask(task) {
		writable_selected_task.set(task);
	}

	function closeTask() {
		writable_selected_task.set({});
	}
</script>

<div class="task">
	<hr />
	{#if writable_story_local.length > 0}
		<div class="flex flex-wrap place-content-evenly py-2">
			{#each writable_story_local as task}
				{#if task.title === $writable_selected_task.title}
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
