import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*", 
                allow: "/",
                disallow: ["/admin","/signin"]
            },

        ],
        sitemap: "https://www.RedHatBrew.com/sitemap.xml",

    };
}