import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import Card from '../components/blog-card'
import Category from '../components/category'

export default class TagTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const siteAuthor = this.props.data.site.siteMetadata.author
    const siteDescription = this.props.data.site.siteMetadata.description
    const posts = this.props.data.allMarkdownRemark.edges
    const categoryName = this.props.data.categoriesJson.name
    const categoryDescription = this.props.data.categoriesJson.desc
    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[
            {
              name: 'name',
              content: categoryName
            },
            {
              name: 'description',
              content: categoryDescription
            },
            {
              name: 'author',
              content: siteAuthor
            },
            {
              name: 'image',
              content: siteUrl + '/default.jpg'
            },
            {
              name: 'og:url',
              content: siteUrl
            },
            {
              name: 'og:type',
              content: 'article'
            },
            {
              name: 'og:locale',
              content: 'th_TH'
            },
            {
              name: 'og:locale:alternate',
              content: 'en_US'
            },
            {
              name: 'og:title',
              content: siteTitle
            },
            {
              name: 'og:description',
              content: siteDescription
            },
            {
              name: 'article:author',
              content: 'https://facebook.com/rayriffy'
            },
            {
              name: 'og:image',
              content: siteUrl + '/default.jpg'
            },
            {
              name: 'og:image:secure_url',
              content: siteUrl + '/default.jpg'
            },
            {
              name: 'og:image:alt',
              content: 'banner'
            },
            {
              name: 'twitter:card',
              content: 'summary_large_image'
            },
            {
              name: 'twitter:site',
              content: '@rayriffy'
            },
            {
              name: 'twitter:creator',
              content: '@rayriffy'
            },
            {
              name: 'twitter:title',
              content: categoryName
            },
            {
              name: 'twitter:description',
              content: categoryDescription
            },
            {
              name: 'twitter:image',
              content: siteUrl + '/default.jpg'
            },
          ]}
          title={`${categoryName} · ${siteTitle}`}
        >
          <script type="application/ld+json" data-react-helmet="true">
            {`
              {
                "@context": "http://schema.org/",
                "@type" : "Website",
                "url" : "${siteUrl}"
              }
            `}
          </script>
        </Helmet>
        <Category
          name={categoryName}
          desc={categoryDescription}
        />
        {posts.map(({ node }) => {
          var author = null
          this.props.data.allAuthorsJson.edges.forEach((authorJson) => {
            if(authorJson.node.user === node.frontmatter.author) {
              author = authorJson.node
              return
            }
          })
          return (
            <Card
              slug={node.fields.slug}
              author={author}
              banner={node.frontmatter.banner.childImageSharp.fluid}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              subtitle={node.frontmatter.subtitle}
              featured={node.frontmatter.featured}
              status={node.frontmatter.status}
              link={true}
            />
          )
        })}
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: { category: { eq: $category } } }) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            subtitle
            status
            featured
            author
            banner {
              childImageSharp {
                fluid(maxWidth: 1000, quality: 100) {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
              }
            }
          }
        }
      }
    }
    allAuthorsJson {
      edges {
        node {
          user
          name
          facebook
        }
      }
    }
    categoriesJson(key: { eq: $category }) {
      name
      desc
    }
  }
`;