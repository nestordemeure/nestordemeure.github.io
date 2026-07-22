# Vendored: justif

Source: **justif** — <https://github.com/lyallcooper/justif> (MIT, see `LICENSE`)
Version: **0.4.2**, npm package `justif`
Fetched from: <https://cdn.jsdelivr.net/npm/justif@0.4.2/dist/>

TeX-style (Knuth–Plass) paragraph justification, used by `../sidenote.js`.

## What's here (and why only this)

justif ships ~25 hyphenation languages and splits its code into hash-named
internal chunk files. We vendor only the transitive closure of the two modules
`sidenote.js` imports:

- `index.js`            — entry point; exports `justify`
- `chunk-AKQMEKJ5.js`   — core algorithm (imported by `index.js`)
- `hyphenate/en-us.js`  — exports `hyphenateEnUS`
- `chunk-KQ5ZWCOR.js`   — hyphenator (imported by `hyphenate/en-us.js`)

Hugo's esbuild (`js.Build`, in the theme's `partials/javascript.html`) bundles
and tree-shakes these together with `sidenote.js`.

## Updating

Re-download the four files above from the jsdelivr URL for the new version. The
chunk filenames are hash-based and change between releases, so follow the
`import ... from './chunk-*.js'` lines in `index.js` and `hyphenate/en-us.js`
to get the current chunk names. Then rebuild (`hugo`) and check a
footnote-heavy page, since justif affects layout.
