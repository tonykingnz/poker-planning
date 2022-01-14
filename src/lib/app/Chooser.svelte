<script>
	import { stories, selected_story_task } from "./stores.js";

	let index_story = 0

	let story_local = []
	stories.subscribe(value => {story_local = value[index_story];});
	
	function selectTask(task){
		selected_story_task.set(task);
	}
</script>


<div class="task">
	<hr>
	<!--<p>{JSON.stringify(story_local)}</p>-->
	{#if story_local.length > 0}
		<div class="flex space-x-2 py-4">
			{#each story_local as task}
				<button class="btn" on:click={selectTask(task)}>
					{task.title} - {task.score}
				</button>
			{/each}
		</div>
		<hr>
	{/if}
</div>

