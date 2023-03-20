import React from "react"

import Nav from "../components/Nav"
import NavBar from "../components/NavBar"
import Gallery from "../components/Gallery"

const GalleryPage = () => {
	return (
		<div className="flex min-h-screen md:gap-8 bg-bg md:p-12">
			<div className="md:hidden">
				<NavBar />
			</div>
			<nav className="hidden md:block h-fit text-white">
				<Nav />
			</nav>
			<main className="w-full bg-layout bg-opacity-90 text-white font-nunito text-center">
				<Gallery />
			</main>
		</div>
	)
}

export default GalleryPage
