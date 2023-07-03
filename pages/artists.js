import React from "react"
import { useGlobalContext } from "../components/GlobalContext"
import Image from "next/image"
import { sanityClient } from "../lib/sanityClient"
import Head from "next/head"

import logo from "../public/logo.png"
import Nav from "../components/Nav"
import NavBar from "../components/NavBar"
import Artists from "../components/Artists"

const ArtistPage = ({ artists, vignette }) => {
	const { isOpen, setIsOpen } = useGlobalContext()

	return (
		<div className={`flex ${isOpen ? "h-screen overflow-hidden" : "min-h-screen"} md:gap-8 bg-bg md:p-12`}>
			<Head>
				<title>MarcMaison.Art | Découvrez les artistes qui ont façonné le 19ème</title>
				<meta name="description" content="Plongez dans une collection captivante de vidéos présentant des chefs-d'œuvre emblématiques de cette période artistique influente." />
				<meta name="keywords" content="Marc Maison 19ème, Oeuvres 19ème, Artistes du 19ème siècle" />
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
			<div className="md:hidden">
				<NavBar />
			</div>
			<nav className="hidden md:block h-fit text-white">
				<Nav />
			</nav>
			<main className="w-full bg-layout bg-opacity-90 text-white font-nunito text-center">
				<Artists artists={artists} vignette={vignette} />
				<div className="flex flex-row items-center justify-end">
					<Image src={logo} className="w-20" alt="logo Marc Maison XIX" />
					<div className="flex flex-col">
						<h1 className="mb-0 pb-0 text-[1.5rem] text-gray-200 pt-6 px-6 font-bodoni">Marc Maison</h1>
						<h2 className="font-splash text-[#c49d50] text-[0.8rem] tracking-wide pb-4 text-gold">- 19ème -</h2>
					</div>
				</div>
			</main>
		</div>
	)
}

export const getServerSideProps = async () => {
	const artists = await sanityClient.fetch(`*[_type == "artists" && slug.current != 'hotel-particulier'] | order(title asc)`)
	const vignette = await sanityClient.fetch(`*[_type=="walls" && title == 'vignette']{...}`)

	return {
		props: {
			artists,
			vignette,
		},
	}
}

export default ArtistPage
