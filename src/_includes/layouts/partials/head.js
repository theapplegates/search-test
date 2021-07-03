const fs = require('fs')
var internalCSS = ''
var internalCSSPath = 'src/_includes/css/index.css'
if (process.env.NODE_ENV === 'production') {
  if(fs.existsSync(internalCSSPath)) {
    internalCSS = fs.readFileSync(internalCSSPath)
  }
}

module.exports = function(eleventyConfig) {

  // restructuring for easier reading/typing
  // ... https://wesbos.com/destructuring-objects
  eleventyConfig.addShortcode('headTag', function({ csshash, siteparams, page, description, title }) {
    const { indexCSS } = csshash
    const { siteTitle, siteDescription, siteURLforOG } = siteparams
    const { url } = page

    return /*html*/ `
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="generator" content="Eleventy - 11ty - https://11ty.dev - v${require(`@11ty/eleventy/package.json`).version}" />
    ${
      (url == "/")
      ? /*html*/ `
      <title>${siteTitle}</title>
      <meta property="og:title" content="${siteTitle}" />
      `
      : /*html*/ `
      <title>${title} | ${siteTitle}</title>
      <meta property="og:title" content="${title} | ${siteTitle}" />
      `
    }

    <meta name="description" content="${description
      ? `${description}`
      : `${siteDescription}`
    }" />

    <meta name="og:description" content="${description
      ? `${description}`
      : `${siteDescription}`
    }" />

    <meta property="og:url" content="${url
      ? `${url}`
      : `${siteURLforOG}`
    }" />

    <link rel="icon" type="image/png" href="/images/icons/Eleventy-favicon-16x16.png" sizes="16x16" />
    <link rel="icon" type="image/png" href="/images/icons/Eleventy-favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/images/icons/Eleventy-favicon-96x96.png" sizes="96x96" />

    ${ process.env.NODE_ENV === 'production'
      ? /*html*/ `<link rel="preload" href="/css/${indexCSS}" as="style" />
      <link rel="stylesheet" href="/css/${indexCSS}" type="text/css" />`
      : /*html*/ `<link rel="stylesheet" href="/css/index.css" type="text/css"  />`
    }

    <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/docsearch.js@{{docSearchJSVersion}}/dist/cdn/docsearch.min.css"
  />
<script src="https://cdn.jsdelivr.net/npm/docsearch.js@{{docSearchJSVersion}}/dist/cdn/docsearch.min.js"></script>
<script>
  docsearch({
    // Your apiKey and indexName will be given to you once
    // we create your config
    apiKey: '<API_KEY>',
    indexName: 'index',
    appId: 'TT3RHF8013', // Should be only included if you are running DocSearch on your own.
    // Replace inputSelector with a CSS selector
    // matching your search input
    inputSelector: '<YOUR_CSS_SELECTOR>',
    // Set debug to true to inspect the dropdown
    debug: false,
  });
</script>

  </head>
    `
  })
}
