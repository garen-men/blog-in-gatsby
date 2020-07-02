/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-plugin-ts`,
      options: {
        tsLoader: {
          logLevel: 'warn',
        },
        forkTsCheckerPlugin: {
          eslint: true,
        },
        fileName: `types/graphql-types.ts`,
        codegen: true,
        codegenDelay: 250,
        // typeCheck: false,
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [] // just in case those previously mentioned remark plugins sound cool :)
      }
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-theme-blog`,
      options: {
        /*
        - basePath defaults to `/`
        */
        // basePath: `/blog/`,
      },
    },
  ],
  siteMetadata: {
    title: "My Blog For Team Building",
    author: "mguy",
    description: "A collection of my thoughts and writings.",
    social: [{name:"github",url:"https://github.com"}],
    siteUrl: "https://amberley.blog/",
  },
}
