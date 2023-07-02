import "../styles/globals.css"
import "../styles/custom.css"
import { ContextProvider } from "../components/GlobalContext"
import { Analytics } from "@vercel/analytics/react"
import { Head } from "next/document"

import NextNProgress from "nextjs-progressbar"

function MyApp({ Component, pageProps }) {
	return (
		<ContextProvider>
			<NextNProgress color="#6A2147" />
			<Head>
				<title>MarcMaison.Art | Explorez les merveilles de l'art du 19ème siècle sur notre site vidéo dédié</title>
				<meta
					name="description"
					content="Plongez dans une collection captivante de vidéos présentant des chefs-d'œuvre emblématiques de cette période artistique influente. Découvrez les mouvements artistiques, les techniques et les artistes qui ont façonné cette époque dorée de la créativité."
				/>
				<meta name="keywords" content="Marc Maison 19ème, Oeuvres 19ème, Artistes du 19ème siècle, Theodore Deck" />
				<meta name="author" content="Galerie Marc Maison" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="alternate" href="/" hrefLang="x-default" />
				<link rel="alternate" href="/" hrefLang="fr" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link href="https://fonts.googleapis.com/css2?family=Libre+Bodoni:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Splash&display=swap" rel="stylesheet" />
				<link
					href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Component {...pageProps} />
			<Analytics />
		</ContextProvider>
	)
}

export default MyApp
