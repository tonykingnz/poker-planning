import { writable } from 'svelte/store';

export const index_task = writable(0);
export const selected_story_task = writable({});
export const stories = writable([[]]);
