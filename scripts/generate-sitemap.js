import fs from "fs";
import path from "path";

const BASE_URL = "https://asalogistic.co.id";

const routes = [
    {
        url: "/",
        priority: "1.0",
        changefreq: "weekly",
    },
    {
        url: "/home",
        priority: "0.8",
        changefreq: "monthly",
    },
    {
        url: "/resource",
        priority: "0.8",
        changefreq: "monthly",
    },
    {
        url: "/service",
        priority: "0.8",
        changefreq: "monthly",
    },
    {
        url: "/career",
        priority: "0.9",
        changefreq: "daily",
    },
    {
        url: "/contact",
        priority: "0.9",
        changefreq: "weekly",
    },
    {
        url: "/login",
        priority: "0.7",
        changefreq: "monthly",
    },
    {
        url: "/signup",
        priority: "0.7",
        changefreq: "monthly",
    },
    {
        url: "/visitor",
        priority: "0.7",
        changefreq: "monthly",
    },
    {
        url: "/officer",
        priority: "0.7",
        changefreq: "monthly",
    },
];

const today = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${routes
    .map(
        (route) => `
<url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
</url>`
    )
    .join("\n")}

</urlset>
`;

fs.writeFileSync(
    path.join("public", "sitemap.xml"),
    sitemap
);

const robots = `
User-agent: *
Allow: /

Sitemap: https://asalogistic.co.id/sitemap.xml
`;

fs.writeFileSync(
    path.join("public", "robots.txt"),
    robots
);

console.log("✓ sitemap.xml generated");