
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
interface IBlogIndexProps {
    data: { allMarkdownRemark: MarkdownRemarkConnection};
    // location: Location;
}

import React from "react"
import { graphql, Link } from "gatsby"
import { MarkdownRemark, MarkdownRemarkConnection } from "../../types/graphql-types"

const BlogIndex: React.FC<IBlogIndexProps> = ({ data }) => {
    console.log(data)
    return (
        <div>
            <div>
                <h1 style={{ display: "inline-block",borderBottom: "1px solid"}}>
                    Let's Do Some Amazing Things
                </h1>
                <h4>{data.allMarkdownRemark.totalCount} Posts</h4>

                {data.allMarkdownRemark.edges.map(({ node }: { node: MarkdownRemark}) => (
                    <div key={node.id}>
                        <h3 style={{marginBottom: 5}}>
                            <Link to={node.frontmatter && node.frontmatter.path || ''}>{node.frontmatter && node.frontmatter.title}{" "}</Link>
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
            path
            }
            excerpt
        }
        }
    }
    }
`

export default BlogIndex
