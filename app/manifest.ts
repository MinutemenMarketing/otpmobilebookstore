import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Off the Page Mobile Bookstore",
    short_name: "Off the Page",
    description: "A mobile bookstore, built to roll up wherever readers are.",
    start_url: "/",
    display: "standalone",
    background_color: "#F3E7CC",
    theme_color: "#F3E7CC",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
