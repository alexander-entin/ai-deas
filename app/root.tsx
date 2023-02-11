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
import logo from "~/../public/logo.svg"
import logo192 from "~/../public/logo-192x192-mask.png"
import logo512 from "~/../public/logo-512x512.png"

let title = `ChatGPT солов'їною`
let description = 'ChatGPT для українців без зайвого клопоту - без VPN, SMS, реєстрації'
let image = `https://aideas.win${logo512}`
export const meta: MetaFunction = () => ({
	title,
	description,
	'og:title': `ChatGPT солов'їною`,
	'og:description': description,
	'og:image': image,
	'og:type': 'website',
	'twitter:site': 'AI-deas',
	'twitter:title': title,
	'twitter:description': description,
	'twitter:image': image,
	'twitter:card': 'summary',
	charset: 'utf-8',
	viewport: 'width=device-width,initial-scale=1',
	'theme-color': '#373737',
	'mobile-web-app-capable': 'yes',
	'apple-mobile-web-app-capable': 'yes',
})

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: styles },
	{ rel: 'icon', href: logo },
	{ rel: 'apple-touch-icon', href: logo192 },
]

function onCssPreload() {
	this.onload = null
	this.rel = 'stylesheet'
}

export default function App() {
	return (
		<html lang="uk" className="h-screen">
			<head>
				<Meta />
				<link rel="manifest" href="/manifest.webmanifest" />
				<Links />
			</head>
			<body className="h-screen bg-white">
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
				<link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" as="style" onLoad={onCssPreload} />
				<script defer src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
				<script defer src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
				<link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/toolbar/prism-toolbar.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" as="style" onLoad={onCssPreload} />
				<script defer src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/toolbar/prism-toolbar.min.js" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
				<script defer src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
			</body>
		</html>
	)
}
