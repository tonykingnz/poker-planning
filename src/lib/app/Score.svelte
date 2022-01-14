<script>
	import { stories } from './stores.js';

	let score = 0;

	let index_store = 0;
	let stories_local = [];
	stories.subscribe((value) => {
		stories_local = value[index_store];
	});

	$: !stories_local.length ||
		(score = stories_local.reduce((total, story) => (total += story.score), 0));
</script>

<div>
	<h3 class="text-xl pb-2">
		Total Score: {score}
	</h3>
	<hr />
</div>
