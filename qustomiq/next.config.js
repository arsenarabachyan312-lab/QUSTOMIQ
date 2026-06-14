/** @type {import('next').NextConfig} */

// Set GITHUB_PAGES=true in CI env to enable sub-path routing for GitHub Pages.
// If a custom domain (qustomiq.ru) is configured in GitHub Pages settings,
// remove basePath and assetPrefix (or set GITHUB_PAGES to false/unset).
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  basePath:    isGithubPages ? "/QUSTOMIQ" : "",
  assetPrefix: isGithubPages ? "/QUSTOMIQ/" : "",
};

module.exports = nextConfig;
