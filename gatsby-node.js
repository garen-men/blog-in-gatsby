const path = require('path');
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = require.resolve(`./src/templates/blog.tsx`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    console.log('%cnode.frontmatter.path: ', 'color: MidnightBlue; background: Aquamarine; font-size: 20px;', node.frontmatter.path);

    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        // path: "/product" + node.frontmatter.path,
      },
    })
                    //     createPage({
                    //     path: node.frontmatter.path,
                    //     component: blogPostTemplate,
                    //   context: {
                    //     pathPrefix: '/'
                    //     } // additional data can be passed via context
                    // });
  })
}
// exports.createPages = ({ actions, graphql }) => {
//   const { createPage } = actions;

//     const blogPostTemplate = path.resolve(`src/templates/blog-post.tsx`);

//     return graphql(`{
//     allMarkdownRemark(
//       sort: { order: DESC, fields: [frontmatter___date] }
//       limit: 1000
//     ) {
//       edges {
//         node {
//           excerpt(pruneLength: 250)
//           html
//           id
//           frontmatter {
//             date
//             path
//             title
//           }
//         }
//       }
//     }
//  }`)
//         .then(result => {
//             if (result.errors) {
//                 return Promise.reject(result.errors);
//             }

//             result.data.allMarkdownRemark.edges
//                 .forEach(({ node }) => {
//                   console.log('%cnode: ', 'color: MidnightBlue; background: Aquamarine; font-size: 20px;', node);
//                   console.log('%cnode.frontmatter.path: ', 'color: MidnightBlue; background: Aquamarine; font-size: 20px;', node.frontmatter.path);

//                     createPage({
//                         path: node.frontmatter.path,
//                         component: blogPostTemplate,
//                       context: {
//                         pathPrefix: '/'
//                         } // additional data can be passed via context
//                     });
//                 });
//         });
// }

// develop
// develop - html
// build - javascript
// build - html
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
        actions.setWebpackConfig({
            module: {
                rules: [
                    
        ],
            },
        })
    }
}
