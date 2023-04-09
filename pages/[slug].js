import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useGlobalContext } from "../components/GlobalContext"

import { Video, CloudinaryContext } from "cloudinary-react"
import { motion } from "framer-motion"
import { Md3DRotation } from "react-icons/md"
import { FaVolumeUp, FaVolumeDown } from "react-icons/fa"
import Nav from "../components/Nav"
import NavBar from "../components/NavBar"

const Creation = () => {
	const { play, stop, playing, setPlaying } = useGlobalContext()

	const router = useRouter()
	const slug = router.query.slug

	useEffect(() => {
		play()
	}, [])

	return (
		<main>
			<div className="md:hidden">
				<NavBar />
			</div>
			<div className="md:hidden">
				<CloudinaryContext cloud_name="amircloud" secure={true}>
					<Video className="h-screen w-full object-cover" publicId={`marc/${slug}-mob`} autoPlay playsInline muted loop poster={{ startOffset: "0" }}>
						<source src="https://res.cloudinary.com/amircloud/video/upload/v1673634198/marc/home.mp4" type="video/mp4" />
					</Video>
				</CloudinaryContext>
			</div>
			<nav className="hidden md:block absolute text-white z-10 top-12 left-12 ">
				<Nav />
			</nav>
			<div className="hidden md:block">
				<CloudinaryContext cloud_name="amircloud" secure={true}>
					<Video className="h-screen w-full object-cover" publicId={`marc/${slug}`} autoPlay playsInline muted loop poster={{ startOffset: "0" }}>
						<source src="https://res.cloudinary.com/amircloud/video/upload/v1673634198/marc/home.mp4" type="video/mp4" />
					</Video>
				</CloudinaryContext>
			</div>
			<div className="flex gap-3 absolute bottom-10 right-10 items-center">
				<motion.button onClick={() => setPlaying((prev) => !prev)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} animate={{ scale: playing ? 1.2 : 1 }} transition={{ duration: 0.3 }}>
					{playing ? (
						<FaVolumeUp className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
					) : (
						<FaVolumeDown className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
					)}
				</motion.button>
				<Md3DRotation className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
			</div>
			{playing ? play() : stop()}
		</main>
	)
}

export default Creation
