import { json } from "@remix-run/cloudflare"
import type { LoaderFunction } from "@remix-run/cloudflare"

import logo from "~/../public/logo.svg"
import logo192 from "~/../public/logo-192x192-o.png"
import logo384 from "~/../public/logo-384x384-o.png"
import logo512 from "~/../public/logo-512x512-m.png"

export let loader: LoaderFunction = () => {
	return json(
		{
			short_name: "ChatGPT UA",
			name: "ChatGPT солов'їною",
			description: "ChatGPT для українців без зайвого клопоту - без VPN, SMS, реєстрації",
			lang: "uk-UA",
			start_url: "/",
			display: "fullscreen",
			background_color: "#373737",
			theme_color: "#373737",
			icons: [
				{
					src: logo,
					type: "image/svg+xml",
					sizes: "any",
				},
				{
					src: logo192,
					type: "image/png",
					sizes: "192x192",
				},
				{
					src: logo384,
					type: "image/png",
					sizes: "384x384",
				},
				{
					src: logo512,
					type: "image/png",
					sizes: "512x512",
					purpose: "any maskable",
				},
			],
		},
		{
			headers: {
				"Cache-Control": "public, max-age=600",
				"Content-Type": "application/manifest+json",
			},
		},
	)
}
