import React, { useRef, useMemo, useState } from "react"
import { useGlobalContext } from "../components/GlobalContext"

import { motion } from "framer-motion"
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi"

import Head from "next/head"
import Nav from "../components/Nav"
import NavBar from "../components/NavBar"
import { CloudinaryContext } from "cloudinary-react"

export default function Home() {
	const { lang, texts } = useGlobalContext()
	const [playing, setPlaying] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)

	const vRefHome = useRef(null)
	const vRefHomeMob = useRef(null)

	const handleSound = () => {
		setPlaying((prev) => !prev)
		vRefHome.current.muted = !vRefHome.current.muted
	}

	const handleSoundMob = () => {
		setPlaying((prev) => !prev)
		vRefHomeMob.current.muted = !vRefHomeMob.current.muted
	}

	const videoHome = useMemo(
		() => (
			<video
				ref={vRefHome}
				className="h-screen w-full object-cover"
				autoPlay
				playsInline
				muted
				loop
				onEnded={() => {
					setPlaying(false)
				}}
				onCanPlayThrough={() => setIsLoaded(true)}
				poster={{ startOffset: "0" }}>
				<source src={`https://res.cloudinary.com/amircloud/video/upload/marc/home.mp4`} type="video/mp4" />
				<source src="https://res.cloudinary.com/amircloud/video/upload/v1673634198/marc/home.mp4" type="video/mp4" />
			</video>
		),
		[isLoaded]
	)

	const videoHomeMob = useMemo(
		() => (
			<video
				ref={vRefHomeMob}
				className="h-screen w-full object-cover"
				autoPlay
				playsInline
				muted
				loop
				onEnded={() => {
					setPlaying(false)
				}}
				onCanPlayThrough={() => setIsLoaded(true)}
				poster={{ startOffset: "0" }}>
				<source src={`https://res.cloudinary.com/amircloud/video/upload/marc/home-mob.mp4`} type="video/mp4" />
				<source src="https://res.cloudinary.com/amircloud/video/upload/v1673634198/marc/home-mob.mp4" type="video/mp4" />
			</video>
		),
		[isLoaded]
	)

	return (
		<div>
			<Head>
				<title>{texts.title[lang]}</title>
				<meta name="description" content={texts.desc[lang]} />
			</Head>
			<main className="">
				<div className="hidden md:block">
					<CloudinaryContext cloud_name="amircloud" secure={true}>
						{videoHome}
					</CloudinaryContext>
				</div>

				<div className="md:hidden">
					<NavBar />
					<CloudinaryContext cloud_name="amircloud" secure={true}>
						{videoHomeMob}
					</CloudinaryContext>
				</div>
				<nav className="hidden md:block absolute text-white z-10 top-12 left-12">
					<Nav />
				</nav>
				<div className="md:hidden">
					<div className="flex gap-3 absolute bottom-10 right-10 items-center">
						<motion.button
							onClick={() => handleSoundMob()}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							animate={{ scale: playing ? 1 : [1.1, 1] }}
							transition={playing ? { duration: 0.3 } : { duration: 0.3, repeat: Infinity, repeatType: "reverse" }}>
							{!playing ? (
								<div className="w-[50px] h-[50px] m-auto bg-yellow rounded-full border-2 border-white p-2 opacity-80 flex items-center justify-center">
									<GiSpeakerOff className="text-2xl text-[#6A2147] hover:scale-110 transition-all duration-300 cursor-pointer" />
								</div>
							) : (
								<div className="w-[50px] h-[50px] m-auto bg-yellow rounded-full border-2 border-white p-2 opacity-80 flex items-center justify-center">
									<GiSpeaker className="text-2xl text-[#6A2147] hover:scale-110 transition-all duration-300 cursor-pointer" />
								</div>
							)}
						</motion.button>
					</div>
				</div>
				<div className="hidden md:block">
					<div className="flex gap-3 absolute bottom-10 right-10 items-center">
						<motion.button
							onClick={() => handleSound()}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							animate={{ scale: playing ? 1 : [1.1, 1] }}
							transition={playing ? { duration: 0.3 } : { duration: 0.3, repeat: Infinity, repeatType: "reverse" }}>
							{!playing ? (
								<div className="w-[50px] h-[50px] m-auto bg-yellow rounded-full border-2 border-white p-2 opacity-80 flex items-center justify-center">
									<GiSpeakerOff className="text-2xl text-[#6A2147] hover:scale-110 transition-all duration-300 cursor-pointer" />
								</div>
							) : (
								<div className="w-[50px] h-[50px] m-auto bg-yellow rounded-full border-2 border-white p-2 opacity-80 flex items-center justify-center">
									<GiSpeaker className="text-2xl text-[#6A2147] hover:scale-110 transition-all duration-300 cursor-pointer" />
								</div>
							)}
						</motion.button>
					</div>
				</div>
			</main>
		</div>
	)
}
