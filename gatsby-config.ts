import type { GatsbyConfig } from "gatsby";
const { createProxyMiddleware } = require("http-proxy-middleware");

const config: GatsbyConfig = {
  siteMetadata: {
    title: `family-expense`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: ["gatsby-plugin-styled-components"],
  // developMiddleware: (app) => {
  //   app.use(
  //     "/api/",
  //     createProxyMiddleware({
  //       target: "http://localhost:3000",
  //       pathRewrite: {
  //         "/api/": "", // optionally remove the path prefix from the proxied request
  //       },
  //     })
  //   );
  // },
};

export default config;
