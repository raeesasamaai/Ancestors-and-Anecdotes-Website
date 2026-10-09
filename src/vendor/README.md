# StPageFlip compatibility build

`page-flip.js` and `page-flip.css` are built from the MIT-licensed StPageFlip 2.0.7 source shipped with the existing `page-flip` dependency. The license is included in `page-flip.LICENSE.txt`.

Local changes in `page-flip.lifecycle.patch`:

- Store and cancel the renderer's animation-frame request on destruction.
- Cancel delayed initialization and touch timers.
- Make destruction idempotent and release the library event subscriptions.
- Always detach UI listeners, including the resize listener.

The book mounts the library inside a disposable child, so its destructor can remove its own root safely. The viewer uses HTML image pages with `object-fit: contain`; its one-page-wide mount selects single-page mode naturally. The pages retain the existing A4 landscape layout.

To regenerate from the same upstream source, apply the patch at the package root, then bundle `src/PageFlip.ts` with esbuild (`--bundle --format=esm --target=es2020`). Keep the resulting JavaScript and CSS together. `Examples.jsx` imports this compatibility build directly; no installation script or node_modules edits are required.
