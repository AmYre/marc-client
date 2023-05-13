import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../components/GlobalContext"
import { Video, CloudinaryContext } from "cloudinary-react"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { Md3DRotation } from "react-icons/md"
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi"
import { AnimatePresence } from "framer-motion"

import Nav from "../components/Nav"
import NavBar from "../components/NavBar"
import Contact from "../components/Contact"

const DetailProduct = () => {
	const { lang, setLang, playing, setPlaying, ended, setEnded } = useGlobalContext()

	const router = useRouter()
	const slug = router.query.slug

	return (
		<main>
			<div className="md:hidden">
				<NavBar />
			</div>
			<div className="md:hidden">
				<CloudinaryContext cloud_name="amircloud" secure={true}>
					<Video
						className="h-screen w-full object-cover"
						publicId={lang == "fr" ? `marc/${slug}-mob` : lang == "en" ? `marc/${slug}-mob-en` : lang == "cn" && `marc/${slug}-mob-cn`}
						autoPlay
						playsInline
						muted
						poster={{ startOffset: "0" }}>
						<source src={`https://res.cloudinary.com/amircloud/video/upload/marc/${slug}-mob.mp4`} type="video/mp4" />
						<source src="https://res.cloudinary.com/amircloud/video/upload/v1673634198/marc/home.mp4" type="video/mp4" />
					</Video>
				</CloudinaryContext>
				<AnimatePresence>{ended && <Contact />}</AnimatePresence>
			</div>
			<nav className="hidden md:block absolute text-white z-10 top-12 left-12 ">
				<Nav />
			</nav>
			<div className="hidden md:block">
				<CloudinaryContext cloud_name="amircloud" secure={true}>
					<Video
						className="h-screen w-full object-cover"
						publicId={lang == "fr" ? `marc/${slug}` : lang == "en" ? `marc/${slug}` : lang == "cn" && `marc/${slug}-cn`}
						autoPlay
						playsInline
						muted={playing}
						onEnded={() => {
							setEnded(true)
						}}
						poster={{ startOffset: "0" }}>
						<source src={`https://res.cloudinary.com/amircloud/video/upload/marc/${slug}.mp4`} type="video/mp4" />
						<source src="https://res.cloudinary.com/amircloud/video/upload/v1673634198/marc/home.mp4" type="video/mp4" />
					</Video>
				</CloudinaryContext>
				<AnimatePresence>
					<Contact />
				</AnimatePresence>
			</div>
			<div className="flex gap-3 absolute bottom-10 right-10 items-center">
				<motion.button onClick={() => setPlaying((prev) => !prev)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} animate={{ scale: playing ? 1.2 : 1 }} transition={{ duration: 0.3 }}>
					{playing ? (
						<GiSpeakerOff className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
					) : (
						<GiSpeaker className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
					)}
				</motion.button>
				<Md3DRotation className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
			</div>
		</main>
	)
}

export default DetailProduct
