const dotenv = require("dotenv");

if (process.env.ENVIRONMENT !== "production") {
    dotenv.config();
}

const {spaceId, accessToken} = process.env;

module.exports = {
    siteMetadata: {
        title: `Rohit Gupta`,
        description: `Personal Site`,
        author: `@rohitguptab`
    },
    plugins: [
        "gatsby-plugin-gatsby-cloud",
        "gatsby-plugin-postcss",
        {
            resolve: "gatsby-source-strapi",
            options: {
                apiURL: process.env.STRAPI_API_URL || "http://localhost:1337",
                accessToken: process.env.STRAPI_TOKEN,
                collectionTypes: [
                    {
                        singularName: "article",
                        queryParams: {
                            publicationState:
                                process.env.GATSBY_IS_PREVIEW === "true" ? "preview" : "live",
                            populate: {
                                cover: "*",
                                blocks: {
                                    populate: "*",
                                },
                            },
                        },
                    },
                    {
                        singularName: "author",
                    },
                    {
                        singularName: "category",
                    },
                ],
                singleTypes: [
                    {
                        singularName: "about",
                        queryParams: {
                            populate: {
                                blocks: {
                                    populate: "*",
                                },
                            },
                        },
                    },
                    {
                        singularName: "global",
                        queryParams: {
                            populate: {
                                favicon: "*",
                                defaultSeo: {
                                    populate: "*",
                                },
                            },
                        },
                    },
                ],
            },
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`
            }
        },
        `gatsby-plugin-sharp`,
        `gatsby-plugin-image`,
        `gatsby-transformer-sharp`,
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Rohit Gupta`,
                short_name: `Rohit Gupta`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#333`,
                icon: `src/images/fev_icon.png` // This path is relative to the root of the site.
            }
        }, // To learn more, visit: https://gatsby.dev/offline // this (optional) plugin enables Progressive Web App + Offline functionality
        `gatsby-plugin-offline`
    ]
};
