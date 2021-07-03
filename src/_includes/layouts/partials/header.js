module.exports = function(eleventyConfig) {

  eleventyConfig.addShortcode('siteHeader', function(data) {
    // restructuring for easier reading/typing...
    // https://wesbos.com/destructuring-objects
    // https://stackoverflow.com/questions/65565806/destructure-object-properties-inside-array-prototype-map

    const { collections } = data

    return /*html*/ `
    <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/docsearch.js@{{docSearchJSVersion}}/dist/cdn/docsearch.min.css"
  />
    <header class="h-12 bg-black dark:bg-blue-700 w-full fixed p-0 mt-0 z-50">
      <p class="text-white font-bold mt-2 pt-1 text-lg ml-4 md:ml-8 lg:ml-10 xb:ml-16 w-full"><a href="/" class="font-sans text-white active:text-gray-400 hover:text-gray-400" style="border: 0 !important; text-decoration: none !important;">Site name goes here</a></p>
      <input type="checkbox" id="nav-toggle" class="nav-toggle" aria-hidden="true" />
      <label for="nav-toggle" class="nav__icon" aria-hidden="true">
        Expand the menu
          <span class="nav__icon-line"></span>
          <span class="nav__icon-line"></span>
          <span class="nav__icon-line"></span>
      </label>
      <nav role="navigation" class="nav">
        <ul class="nav__items">
          <li class="nav__item">
            <a href="/about/" title="About">About</a>
          </li>
          <li class="nav__item">
          ${
            collections.post.slice(-1).reverse().map(
              ({url}) => /*html*/ `
            <a href="${url}" title="Latest post">Latest post</a>`
          ).join('')}
          </li>
          <li class="nav__item">
            <a href="/posts/" title="All posts">All posts</a>
          </li>
        </ul>
      </nav>
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
    </header>
    `

  })

}
