
// export default () => <div>Hello world!</div>

// import { graphql } from "gatsby";

// export const pageQuery = graphql`
//     query {
//         query BlogIndex {
//             site {
//                 siteMetadata {
//                     title
//                 }
//             }
//         }
//     }
// `

// // import { BlogIndexQuery } from '../graphqlTypes'

interface IBlogIndexProps {
    data: { allMarkdownRemark: MarkdownRemarkConnection};
    // location: Location;
}

// const BlogIndex: React.FC<IBlogIndexProps> = ({ data, location }) => {
//     return <div>Hello world!</div>
// }
import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import { BlogPost, MarkdownRemark, MarkdownRemarkConnection } from "../../types/graphql-types"
// import { rhythm } from "../utils/typography"
// import Layout from "../components/layout"
const BlogIndex: React.FC<IBlogIndexProps> = ({ data }) => {
    console.log(data)
    return (
        <div>
            <div>
                <h1
                    css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
                >
                    Amazing Pandas Eating Things
        </h1>
                <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
                {data.allMarkdownRemark.edges.map(({ node }: { node: MarkdownRemark}) => (
                    <div key={node.id}>
                        <h3
                            css={css`
                margin-bottom: 5};
              `}
                        >
                            {node.frontmatter && node.frontmatter.title}{" "}
                            <span
                                css={css`
                  color: #bbb;
                `}
                            >
                                — {node.frontmatter && node.frontmatter.date}
                            </span>
                        </h3>
                        <p>{node.excerpt}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`

export default BlogIndex
