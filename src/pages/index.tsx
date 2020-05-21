import React from "react"

export default () => <div>Hello world!</div>

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

// interface IBlogIndexProps {
//     data: pageQuery;
//     location: Location;
// }

// const BlogIndex: React.FC<IBlogIndexProps> = ({ data, location }) => {
//     return <div>Hello world!</div>
// }