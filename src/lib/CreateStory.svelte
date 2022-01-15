<script>
	let story_input = ""	
	function createNewStory(){
		alert(story_input)
		story_input = ""
	}
</script>


<div class="form form-control py-4">
	<div class="flex space-x-2 place-content-center">
		<input class="input input-bordered w-3/4 md:w-1/3" bind:value={story_input} placeholder="Story name" />
	<button class="btn btn-primary" on:click={createNewStory} title="Create new story">+<button/>
	</div>
</div>
