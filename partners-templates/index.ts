/**
 * This is literally the index of templates available in the folder.
 * It is used as brigde to pick them all up and import them in the code.
 *
 * Partners Templates are code templates written in handlebars. They get
 * precompiled through handlebars-loader as functions, so we can generate
 * partners code when user is going to export the pass.
 *
 * Every exported name **must** match the name saved in `index.json`.
 *
 * `index.json` acts as a supplementary index to contain configuration for
 * the code to show the tabs and the processed template... but json is not
 * allowed to have comments.
 */

// @ts-ignore - handled by webpack
import passkitGenerator from "./passkit-generator.hbs";

export {
	passkitGenerator
};
