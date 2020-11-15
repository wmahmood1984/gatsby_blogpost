import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Blog = () => {
  const data = useStaticQuery(
    graphql`
      query {
  allContentfulBlogPost4(sort: {fields: date, order: DESC}) {
    edges {
      node {
        title
        id
        slug
        excerpts
        date
        image {
                fluid(maxWidth: 750) {
                  ...GatsbyContentfulFluid
                }
              }
      }
    }
  }
}
    `
  )

  console.log("data",data)
  return (
    <Layout>
      <SEO title="Blog" />
      <p>
        <Link to="/">Go back to the homepage</Link>
      </p>
      <ul className="posts">
        {data.allContentfulBlogPost4.edges.map(edge => {
          return (
            <li className="post" key={edge.node.id}>
              <h2>
                <Link to={`/blog/${edge.node.slug}/`}>{edge.node.title}</Link>
              </h2>
              <div className="meta">
                <span>Posted on {edge.node.date}</span>
              </div>
              {edge.node.image && (
                <Img
                  className="featured"
                  fluid={edge.node.image.fluid}
                  alt={edge.node.title}
                />
              )}
              <p className="excerpt">
                {edge.node.excerpt}
              </p>
              <div className="button">
                <Link to={`/blog/${edge.node.slug}/`}>Read More</Link>
              </div>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Blog