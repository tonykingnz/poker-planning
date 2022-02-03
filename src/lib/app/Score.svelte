<script>
	import { writable_story } from './stores.js';

	let score = 0;

	let writable_story_local = [];
	writable_story.subscribe((value) => {
		writable_story_local = value;
	});

	$: !writable_story_local.length ||
		(score = writable_story_local.reduce((total, story) => (total += story.score), 0));
</script>

<div>
	<h3 class="text-xl pb-2">
		Total Score: {score}
	</h3>
	<hr />
</div>
