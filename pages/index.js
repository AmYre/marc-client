import React, { useState } from "react"
import { useGlobalContext } from "../components/GlobalContext"

import { motion } from "framer-motion"
import { Md3DRotation } from "react-icons/md"
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi"

import Head from "next/head"
import Nav from "../components/Nav"
import NavBar from "../components/NavBar"

import { Video, CloudinaryContext } from "cloudinary-react"

export default function Home() {
	const { lang, texts } = useGlobalContext()
	const [muted, setMuted] = useState(true)

	return (
		<div>
			<Head>
				<title>{texts.title[lang]}</title>
				<meta name="description" content={texts.desc[lang]} />
			</Head>
			<main className="">
				<CloudinaryContext cloud_name="amircloud" secure={true}>
					<Video className="h-screen w-full object-cover" publicId="marc/home" autoPlay playsInline muted={muted} loop poster={{ startOffset: "0" }} />
				</CloudinaryContext>

				<div className="md:hidden">
					<NavBar />
				</div>
				<nav className="hidden md:block absolute text-white z-10 top-12 left-12">
					<Nav />
				</nav>
				<div className="flex gap-3 absolute bottom-10 right-10 items-center">
					<motion.button onClick={() => setMuted((prev) => !prev)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.3 }}>
						{muted ? (
							<GiSpeakerOff className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
						) : (
							<GiSpeaker className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
						)}
					</motion.button>
					<Md3DRotation className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
				</div>
			</main>
		</div>
	)
}
