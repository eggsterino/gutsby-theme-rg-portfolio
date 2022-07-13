var path = require("path");

exports.createPages = ({graphql, boundActionCreators}) => {
    const {createPage} = boundActionCreators;
    return new Promise((resolve, reject) => {
        const articlePost = path.resolve("./src/templates/article-post.js")

        resolve(
            graphql(
                `
              {
                allStrapiArticle {
                  nodes {
                    title
                    slug
                  }
                }
              }
            `).then(result => {
                if (result.errors) {
                    /*reporter.panicOnBuild(
                        `There was an error loading your Strapi articles`,
                        result.errors
                    )*/
                    reject(result.errors)
                }
                result.data.allStrapiArticle.nodes.forEach((article) => {
                    createPage({
                        path: `/article/${article.slug}`,
                        component: articlePost,
                        context: {
                            slug: article.slug,
                        },
                    })
                })
            })
        )

        /*const blogPostTemplate = path.resolve("src/templates/blog-post.js");
        resolve(
            graphql(`
        {
          allContentfulBlogs(limit: 100) {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `).then(result => {
                if (result.errors) {
                    reject(result.errors);
                }
                result.data.allContentfulBlogs.edges.forEach(edge => {
                    createPage({
                        path: edge.node.slug,
                        component: blogPostTemplate,
                        context: {
                            slug: edge.node.slug
                        }
                    });
                });
                return;
            })
        );*/
    });
};
