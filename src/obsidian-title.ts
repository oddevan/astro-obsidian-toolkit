import { parse } from 'path';

// The Astro type ContentCollection is generated per-project. This declares just the fields we're looking for, and
// we'll trust TypeScript to duck-type it.
export interface AstroContentCollectionEntry {
	id: string;
	filePath?: string;
	data: { title?: string };
}

export function obsidianTitle(entry: AstroContentCollectionEntry): string {
	if (entry.data.title) {
		return entry.data.title;
	}

	if (entry.filePath) {
		const details = parse(entry.filePath);
		return details.name;
	}

	return entry.id;
}
