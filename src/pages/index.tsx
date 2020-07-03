
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
import { MarkdownRemark, MarkdownRemarkConnection } from "../../types/graphql-types"
// import { rhythm } from "../utils/typography"
// import Layout from "../components/layout"
const BlogIndex: React.FC<IBlogIndexProps> = ({ data }) => {
    console.log(data)
    return (
        <div>
            <div>
                <h1 style={{ display: "inline-block",borderBottom: "1px solid"}}
                >
                    Amazing Pandas Eating Things
        </h1>
                <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
                {data.allMarkdownRemark.edges.map(({ node }: { node: MarkdownRemark}) => (
                    <div key={node.id}>
                        <h3 style={{
                marginBottom: 5}}
                        >
                            {node.frontmatter && node.frontmatter.title}{" "}
                            <span
                                style={{
                                    color: "#bbb"
                                }}
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
