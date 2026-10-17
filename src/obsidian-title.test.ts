import {
	obsidianTitle,
	type AstroContentCollectionEntry,
} from './obsidian-title.js';
import { test, expect } from 'vitest';

test('Title in frontmatter', () => {
	const entry: AstroContentCollectionEntry = {
		id: 'sample-item',
		filePath: '/path/to/Sample Item.md',
		data: { title: 'Sample Item From Frontmatter' },
	};

	expect(obsidianTitle(entry)).toBe('Sample Item From Frontmatter');
});

test('No frontmatter; has file name', () => {
	const entry: AstroContentCollectionEntry = {
		id: 'sample-item',
		filePath: '/path/to/Sample Item.md',
		data: {},
	};

	expect(obsidianTitle(entry)).toBe('Sample Item');
});

test('No frontmatter; no file name', () => {
	const entry: AstroContentCollectionEntry = {
		id: 'sample-item',
		data: {},
	};

	expect(obsidianTitle(entry)).toBe('sample-item');
});
