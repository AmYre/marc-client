import "../styles/globals.css"
import "../styles/custom.css"
import { ContextProvider } from "../components/GlobalContext"
import { Analytics } from "@vercel/analytics/react"
import { Head } from "next/head"

import NextNProgress from "nextjs-progressbar"

function MyApp({ Component, pageProps }) {
	return (
		<ContextProvider>
			<NextNProgress color="#6A2147" />
			<Head>
				<title>MarcMaison.Art | Explorez les merveilles de l&apos;art du 19ème siècle sur notre site vidéo dédié</title>
				<meta
					name="description"
					content="Plongez dans une collection captivante de vidéos présentant des chefs-d'œuvre emblématiques de cette période artistique influente. Découvrez les mouvements artistiques, les techniques et les artistes qui ont façonné cette époque dorée de la créativité."
				/>
				<meta name="keywords" content="Marc Maison 19ème, Oeuvres 19ème, Artistes du 19ème siècle, Theodore Deck" />
				<meta name="author" content="Galerie Marc Maison" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="alternate" href="/" hrefLang="x-default" />
				<link rel="alternate" href="/" hrefLang="fr" />
				<meta property="og:title" content="MarcMaison.Art | Explorez les merveilles de l'art du 19ème siècle" />
				<meta
					property="og:description"
					content="Plongez dans une collection captivante de vidéos présentant des chefs-d'œuvre emblématiques de cette période artistique influente. Découvrez les mouvements artistiques, les techniques et les artistes qui ont façonné cette époque dorée de la créativité."
				/>
				<meta property="og:image" content="./logo.png" />
			</Head>
			<Component {...pageProps} />
			<Analytics />
		</ContextProvider>
	)
}

export default MyApp
