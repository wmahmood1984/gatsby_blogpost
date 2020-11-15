import React from "react"
import { graphql, Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost4(slug: { eq: $slug }) {
      title
      date(formatString: "Do MMMM, YYYY")
      image {
        fluid(maxWidth: 750) {
          ...GatsbyContentfulFluid
        }
      }
      body{
          raw
      }
      }
    }
  
`

const BlogPost = props => {
    console.log("Raw",JSON.parse(props.data.contentfulBlogPost4.body.raw))
  return (
    <Layout>
      <SEO title={props.data.contentfulBlogPost4.title} />
      <Link to="/blog/">Visit the Blog Page</Link>
      <div className="content">
        <h1>{props.data.contentfulBlogPost4.title}</h1>
        <span className="meta">
          Posted on {props.data.contentfulBlogPost4.date}
        </span>

        {props.data.contentfulBlogPost4.image    && (
          <Img
            className="featured"
            fluid={props.data.contentfulBlogPost4.image.fluid}
            alt={props.data.contentfulBlogPost4.title}
          />
        )}
<div>
    <h2>Body Text</h2>
    {documentToReactComponents(JSON.parse(props.data.contentfulBlogPost4.body.raw))}</div>

      </div>
    </Layout>
  )
}

export default BlogPost