import { writable } from 'svelte/store';

export const writable_index_task = writable(0);
export const writable_selected_task = writable({});
export const writable_story = writable([]);
