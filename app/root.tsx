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

let title = `ChatGPT солов'їною`
let description = 'ChatGPT для України без зайвого клопоту: без VPN, SMS, реэстрації'
let image = 'https://ai-deas.pages.dev/favicon.svg'
export const meta: MetaFunction = () => ({
	title,
	description,
	'og:title': `ChatGPT солов'їною`,
	'og:description': description,
	'og:image': image,
	'twitter:title': title,
	'twitter:description': description,
	'twitter:image': image,
	'twitter:card': 'summary_large_image',
	charset: 'utf-8',
	viewport: 'width=device-width,initial-scale=1',
	'mobile-web-app-capable': 'yes',
	'apple-mobile-web-app-capable': 'yes',
})

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: styles },
	{ rel: 'icon', href: '/favicon.svg', type: 'image/svg' },
]

export default function App() {
	return (
		<html lang="uk" className="h-screen">
			<head>
				<Meta />
				{/* <style>{`html, body { height: 100% }`}</style> */}
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
