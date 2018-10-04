# Run Lola Run

This is WIP of my new dev environment. Switching from Grunt/Bower to Gulp.

## Dependencies

Latest versions of node and npm then run:

`npm install -g gulp-cli`

## Installation

Clone this, change the repo and package name then drop into the templates directory of Craft / Shopify (for example). Then run: `npm install`.

## Assumptions

Your file tree has a `src` folder containing `images`, `js` and `scss` which is where you do your work

The task builds to an `assets` folder. Everything gets dumped in there because in this instance it's for a Shopify build, so everything goes into a single level folder. No sub folders. Because Shopify

Change this to suit your development style.

Don't blame me if it doesn't work.

Peace
