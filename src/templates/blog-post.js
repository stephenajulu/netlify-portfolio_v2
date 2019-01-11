import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { DiscussionEmbed } from 'disqus-react'
import Layout from '../components/layout'
import Share from '../components/socialshare'

class PostTemplate extends Component {
  render() {
    const post = this.props.data.markdownRemark
    const disqusShortname = 'iamtimsmith'
    const disqusConfig = {
      url: `https://www.iamtimsmith.com${post.fields.slug}`,
      identifier: post.fields.slug,
      title: post.frontmatter.title,
    }

    return (
      <Layout location="blog">
        <div id="blog-post">
          <section className="hero is-large">
            <Img
              sizes={post.frontmatter.featured_image.childImageSharp.sizes}
            />
          </section>
          <section className="section">
            <div className="container">
              <h1 className="is-size-1">{post.frontmatter.title}</h1>
              <div className="columns">
                <div className="column is-narrow">
                  <p className="is-size-5">{post.frontmatter.date}</p>
                </div>
              </div>

              <hr />
              <br />
              <div
                id="post-content"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
              <br />
              <div id="post-comments">
                <DiscussionEmbed
                  shortname={disqusShortname}
                  config={disqusConfig}
                />
              </div>
            </div>
            <Share
              url={`https://www.iamtimsmith.com/blog/${post.frontmatter.path}`}
              image={`https://www.iamtimsmith.com/${
                post.frontmatter.featured_image.childImageSharp.sizes.src
              }`}
              title={post.frontmatter.title}
            />
          </section>
        </div>
      </Layout>
    )
  }
}

export default PostTemplate

export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
        featured_image {
          childImageSharp {
            sizes(maxWidth: 1200) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        tags
      }
    }
  }
`