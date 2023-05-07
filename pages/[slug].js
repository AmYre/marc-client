import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useGlobalContext } from "../components/GlobalContext"
import useSound from "use-sound"
import ProductVideo from "../components/ProductVideo"
import MobVideo from "../components/MobVideo"
import { Video, CloudinaryContext } from "cloudinary-react"
import { motion } from "framer-motion"
import { Md3DRotation } from "react-icons/md"
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi"
import Nav from "../components/Nav"
import NavBar from "../components/NavBar"

const Creation = () => {
	const { play, stop, playing, setPlaying } = useGlobalContext()

	const router = useRouter()
	const slug = router.query.slug

	return (
		<main>
			<div className="md:hidden">
				<NavBar />
			</div>
			<div className="md:hidden">
				<MobVideo publicId={`marc/${slug}-mob`} />
			</div>
			<nav className="hidden md:block absolute text-white z-10 top-12 left-12 ">
				<Nav />
			</nav>
			<div className="hidden md:block">
				<ProductVideo publicId={`marc/${slug}`} />
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
			{/* {playing ? play() : stop()} */}
		</main>
	)
}

export default Creation
