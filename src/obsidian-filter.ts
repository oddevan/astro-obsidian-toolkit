import { defineMdastPlugin } from 'satteri';
import { slug } from 'github-slugger';

export const obsidianFilter = defineMdastPlugin({
	name: 'obsidian-filter',
	link(node, context) {
		// We are assuming that a link whose URL begins with a capital letter is an Obsidian-style link.
		if (context.data.astro !== undefined && /^\p{Lu}/u.test(node.url)) {
			const newUrl = node.url.split('#').map(frag => slug(frag)).join('#');
			context.setProperty(node, 'url', newUrl);
		}
	}
})
