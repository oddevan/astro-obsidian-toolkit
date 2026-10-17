# Astro Obsidian Toolkit

A package with useful functions for using an [Obsidian][ob] vault as an [Astro][as] content collection.

[ob]: https://obsidian.md/
[as]: https://astro.build/

## Install (eventually)

```shell
npm install --save @oddevan/astro-obsidian-toolkit
```

## Available Functions

### `obsidianFilter`

A [Satteri][md] `mdast` plugin that converts links to Obsidian-style files to Astro's URL format.

[md]: https://satteri.bruits.org/

In Obsidian, the default title is the filename. This makes wikilinks easy, where a link to a page describing A Thing
just looks like `[[A Thing]]`. Also, Astro 7's default Markdown processor, Satteri, can natively parse wikilinks as
normal links!

However, when Astro parses the directory of files, it converts a file like `A Thing` into `a-thing`. This breaks the
links in the Obsidian vault, leaving your pages filled with broken links to `A%20Thing`.

This function, `obsidianFilter`, bridges that gap. It checks for any links whose URL begins with a capital letter
and runs the URL through [github-slugger][ghs], the same library [used by Astro][ghs-astro]. If the link has a
fragment, it is converted separately.

[ghs]: https://github.com/Flet/github-slugger
[ghs-astro]: https://docs.astro.build/en/guides/markdown-content/#heading-ids

Some examples:

- `[[Alaskan Salmon|fish]]` becomes `<a href="alaskan-salmon">fish</a>`
- `[[Quite A Dish]]` becomes `<a href="quite-a-dish">Quite A Dish</a>`

To use, add to your Satteri config, along with enabling the `wikilinks` feature:

```javascript
import { obsidianFilter } from '@oddevan/astro-obsidian-toolkit';
import { markdownToHtml } from 'satteri';

const md = `Some kind of [[Markdown]]`;
const result = await markdownToHtml(md, {
	mdastPlugins: [obsidianFilter],
	features: { wikilinks: true },
});
```

### `obsidianTitle`

By default, the title of an Obsidian document is the filename. But having a `title` in the document's frontmatter is
always an option. This function makes it easy to pull the correct title out no matter where the title actually is:

- If the document has a `title` property in its frontmatter, it uses that.
- If not, it checks for the original filename.
- Failing both, it falls back to the `id` attribute.

To use, pass the Astro `ContentEntry` to the function:

```javascript
import { obsidianTitle } from '@oddevan/astro-obsidian-toolkit';
import { getEntry } from 'astro:content';

const entry = await getEntry('vault', 'quite-a-dish');
const title = obsidianTitle(entry);
```

## License and Acknowledgements

This package was set up using [this tutorial at Total TypeScript][tut].

[tut]: https://www.totaltypescript.com/how-to-create-an-npm-package

This package is released under an MIT-style license. See [LICENSE](LICENSE.md) for the full text.

I'm [oddEvan][oe], and I approved this code.

[oe]: https://www.oddevan.com/
