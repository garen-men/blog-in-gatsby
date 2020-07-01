import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from "gatsby"

// import '../css/blog-post.css'; // make it pretty!
export interface ITemplate {
  data: any;// 怎么设置graphql类型 
}

export default function Template({
  data // this prop will be injected by the GraphQL query we'll write in a bit
}: ITemplate) {
    const { markdownRemark: post } = data; // data.markdownRemark holds our post data
    return (
        <div className="blog-post-container">
            <Helmet title={`Your Blog Name -`} />
            <div className="blog-post">
                <h1>{post}</h1>
                {/* <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} /> */}
            </div>
        </div>
    );
}


export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;