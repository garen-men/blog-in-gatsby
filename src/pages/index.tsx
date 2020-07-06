
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
    return (
        <div style={{ display: "flex", justifyContent: "center",alignItems: "center"}}>
            <div style={{ maxWidth: 640}}>
                <h1 style={{ display: "flex",justifyContent: "center"}}>
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
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
