const path = require("path");
const { uiBackground, interactive01 } = require("@carbon/elements");
const defaultLunrOptions = require("./config/lunr-options");

module.exports = {
  siteMetadata: {
    isSearchEnabled: false,
    title: "Gatsby Theme Carbon",
    description:
      "Add a description by supplying it to siteMetadata in your gatsby-config.js file.",
    keywords: "gatsby,theme,carbon,design",
    lang: "en",
    repository: {
      baseUrl: "",
      subDirectory: "",
      branch: "master",
    },
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-catch-links`,
    {
      resolve: "gatsby-plugin-lunr",
      options: defaultLunrOptions,
    },
    {
      resolve: `gatsby-source-filesystem`,
      name: `Nav`,
      options: {
        path: path.resolve(`./src/data/nav-items.yaml`),
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          { resolve: `gatsby-remark-unwrap-images` },
          { resolve: `gatsby-remark-smartypants` },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1152,
              linkImagesToOriginal: false,
              quality: 75,
              withWebp: false,
              pngCompressionSpeed: 4,
            },
          },
          { resolve: `gatsby-remark-responsive-iframe` },
          { resolve: `gatsby-remark-copy-linked-files` },
        ],
        defaultLayouts: {
          default: require.resolve("./src/templates/Default.js"),
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: path.resolve("./src/pages/"),
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Carbon Design Gatsby Theme",
        short_name: "Gatsby Theme Carbon",
        start_url: "/",
        background_color: uiBackground,
        theme_color: interactive01,
        display: "browser",
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};
