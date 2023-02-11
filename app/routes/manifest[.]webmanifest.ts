import { json } from "@remix-run/cloudflare";
import type { LoaderFunction } from "@remix-run/cloudflare";

export let loader: LoaderFunction = () => {
  return json(
    {
      short_name: "ChatGPT UA",
      name: "ChatGPT солов'їною",
      description: "ChatGPT для українців без зайвого клопоту - без VPN, SMS, реєстрації",
      lang: "uk-UA",
      start_url: "/",
      display: "fullscreen",
      background_color: "#d3d3d3",
      theme_color: "#d3d3d3",
      icons: [
        {
          src: "/logo.svg",
          type: "image/svg+xml",
          sizes: "all",
        },
        {
          src: "/logo.png",
          type: "image/png",
          sizes: "200x200",
        },
      ],
    },
    {
      headers: {
        "Cache-Control": "public, max-age=600",
        "Content-Type": "application/manifest+json",
      },
    },
  );
};
