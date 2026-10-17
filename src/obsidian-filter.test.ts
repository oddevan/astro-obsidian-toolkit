import { obsidianFilter } from './obsidian-filter.js';
import { test, expect } from 'vitest';
import { markdownToHtml, type CompileOptions } from 'satteri';

const satteriConfig: CompileOptions = {
	mdastPlugins: [obsidianFilter],
	features: { wikilinks: true },
};

test('No change to normal markdown', async () => {
	const md =
		'The fish was _delish_ and it made [quite a dish](fish-dish.html).';
	const expected =
		'<p>The fish was <em>delish</em> and it made <a href="fish-dish.html">quite a dish</a>.</p>\n';
	const actual = await markdownToHtml(md, satteriConfig);

	expect(actual.html).toBe(expected);
});

test('No change to normal wikilink', async () => {
	const md =
		'The fish was _delish_ and it made [[fish-dish.html|quite a dish]].';
	const expected =
		'<p>The fish was <em>delish</em> and it made <a href="fish-dish.html">quite a dish</a>.</p>\n';
	const actual = await markdownToHtml(md, satteriConfig);

	expect(actual.html).toBe(expected);
});

test('Changes Obsidian link as wikilink', async () => {
	const md =
		'The [[Alaskan Salmon|fish]] was _delish_ and it made [[Quite A Dish]].';
	const expected =
		'<p>The <a href="alaskan-salmon">fish</a> was <em>delish</em> and it made <a href="quite-a-dish">Quite A Dish</a>.</p>\n';
	const actual = await markdownToHtml(md, satteriConfig);

	expect(actual.html).toBe(expected);
});
