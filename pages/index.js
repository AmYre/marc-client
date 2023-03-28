import { useState, useRef, useEffect } from "react"
import { useGlobalContext } from "../components/GlobalContext"

import { Video, CloudinaryContext } from "cloudinary-react"
import { motion } from "framer-motion"
import { Md3DRotation } from "react-icons/md"

import Head from "next/head"
import locales from "../lang/locales.js"
import Nav from "../components/Nav"
import NavBar from "../components/NavBar"

export default function Home() {
	const { lang, setLang, play, stop, playing, setPlaying } = useGlobalContext()

	return (
		<div>
			<Head>
				<title>{locales.title[lang]}</title>
				<meta name="description" content={locales.desc[lang]} />
			</Head>
			<main className="">
				<CloudinaryContext cloud_name="amircloud" secure={true}>
					<Video className="h-screen w-full object-cover" publicId="marc/home" autoPlay playsInline muted loop poster={{ startOffset: "0" }} />
				</CloudinaryContext>

				<div className="md:hidden">
					<NavBar sound={stop} />
				</div>
				<nav className="hidden md:block absolute text-white z-10 top-12 left-12">
					<Nav sound={stop} />
				</nav>
				<div className="flex gap-3 absolute bottom-10 right-10 items-center">
					<motion.button
						onClick={() => setPlaying((prev) => !prev)}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						animate={{ rotate: playing ? 90 : 0 }}
						transition={{ duration: 0.3 }}>
						<svg width="24" height="24" viewBox="0 0 24 24">
							<motion.path fill="#FFFFFF" d={playing ? "M4 4h8v16H4zM12 4h8v16h-8z" : "M8 5.14v13.72l11-6.86L8 5.14z"} />
						</svg>
					</motion.button>
					<Md3DRotation className="text-xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
				</div>
				{playing ? play() : stop()}
			</main>
		</div>
	)
}
