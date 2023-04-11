import React from "react"
import Image from "next/image"
import { sanityClient } from "../lib/sanityClient"

import logo from "../public/logo.png"
import { useGlobalContext } from "../components/GlobalContext"
import Nav from "../components/Nav"
import NavBar from "../components/NavBar"
import Contact from "../components/Contact"

const ContactPage = ({ contactPic }) => {
	const { nav, setNav, lang, setLang, isOpen, setIsOpen } = useGlobalContext()

	return (
		<div className={`flex ${isOpen ? "h-screen overflow-hidden" : "min-h-screen"} md:gap-8 bg-bg md:p-12`}>
			<div className="md:hidden">
				<NavBar />
			</div>
			<nav className="hidden md:block h-fit text-white">
				<Nav />
			</nav>
			<main className="w-full bg-layout bg-opacity-90 text-white font-nunito text-center">
				<Contact contactPic={contactPic} />
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
	const contactPic = await sanityClient.fetch(`*[_type=="walls" && title == 'contact']{...}`)

	return {
		props: {
			contactPic,
		},
	}
}

export default ContactPage
