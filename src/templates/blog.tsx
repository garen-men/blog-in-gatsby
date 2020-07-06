
// import '../css/blog-post.css'; // make it pretty!
export interface ITemplate {
  data: { markdownRemark: MarkdownRemark};
}

import React from "react";
import { graphql } from "gatsby";
import "./blog.css";
import { MarkdownRemark } from "../../types/graphql-types";
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}: ITemplate) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="blog-post-container" style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }} >
      <div className="blog-post" >
        <h1>{frontmatter && frontmatter.title}</h1>
        <h2>{frontmatter && frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html||"" }}
        />
      </div>
    </div>
  )
}
export const query = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`