import type { MetaFunction, LinksFunction } from "@remix-run/cloudflare"
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react"

import styles from "./tailwind.css"
import logo from "~/../public/logo.png"

let title = `ChatGPT солов'їною`
let description = 'ChatGPT для українців без зайвого клопоту - без VPN, SMS, реєстрації'
let image = `https://ai-deas.pages.dev${logo}`
export const meta: MetaFunction = () => ({
	title,
	description,
	'og:title': `ChatGPT солов'їною`,
	'og:description': description,
	'og:image': image,
	'twitter:site': 'AI-deas',
	'twitter:title': title,
	'twitter:description': description,
	'twitter:image': image,
	'twitter:card': 'summary',
	charset: 'utf-8',
	viewport: 'width=device-width,initial-scale=1',
	'mobile-web-app-capable': 'yes',
	'apple-mobile-web-app-capable': 'yes',
})

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: styles },
	{ rel: 'icon', href: logo, type: 'image/png' },
]

export default function App() {
	return (
		<html lang="uk" className="h-screen">
			<head>
				<Meta />
				<Links />
			</head>
			<body className="h-screen bg-white">
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
				<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" rel="stylesheet" />
				<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
				<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/toolbar/prism-toolbar.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" rel="stylesheet" />
				<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/toolbar/prism-toolbar.min.js" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
			</body>
		</html>
	)
}
