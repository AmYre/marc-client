import React, { useRef, useMemo, useState } from "react"
import { useGlobalContext } from "../components/GlobalContext"

import { motion } from "framer-motion"
import { MutatingDots } from "react-loader-spinner"
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi"
import logo from "../public/logo.png"

import Head from "next/head"
import Nav from "../components/Nav"
import NavBar from "../components/NavBar"
import Image from "next/image"
import { Video, CloudinaryContext } from "cloudinary-react"

export default function Home() {
	const { lang, texts } = useGlobalContext()
	const [muted, setMuted] = useState(true)
	const [wall, setWall] = useState(true)
	const [playing, setPlaying] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)

	const vRefHome = useRef(null)

	const handleSound = () => {
		setPlaying((prev) => !prev)
		vRefHome.current.muted = !vRefHome.current.muted
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

	return (
		<div>
			{wall && (
				<div className="absolute bg-layout h-screen w-screen z-50 flex flex-col justify-center items-center">
					<h2 className="text-xl text-white uppercase font-thin font-bodoni mb-12">Under construction website</h2>
					<h2 className=" text-white  mb-12">- Available 16 of June 2023 -</h2>
					<Image src={logo} className="" alt="logo Marc Maison XIX" />
					<div className="absolute bottom-0 left-0 hover:cursor-pointer h-5 w-5" onClick={() => setWall(false)}></div>
				</div>
			)}
			<Head>
				<title>{texts.title[lang]}</title>
				<meta name="description" content={texts.desc[lang]} />
			</Head>
			<main className="">
				<CloudinaryContext cloud_name="amircloud" secure={true}>
					{videoHome}
				</CloudinaryContext>

				<div className="md:hidden">
					<NavBar />
				</div>
				<nav className="hidden md:block absolute text-white z-10 top-12 left-12">
					<Nav />
				</nav>
				<div className="flex gap-3 absolute bottom-10 right-10 items-center">
					<motion.button
						onClick={() => setMuted((prev) => !prev)}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						animate={{ scale: playing ? 1 : [1.1, 1] }}
						transition={playing ? { duration: 0.3 } : { duration: 0.3, repeat: Infinity, repeatType: "reverse" }}>
						{!playing ? (
							<div className="w-[50px] h-[50px] m-auto bg-[#a87e2d] rounded-full border-2 border-white p-2 opacity-80 flex items-center justify-center">
								<GiSpeakerOff onClick={() => handleSound()} className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
							</div>
						) : (
							<div className="w-[50px] h-[50px] m-auto bg-[#a87e2d] rounded-full border-2 border-white p-2 opacity-80 flex items-center justify-center">
								<GiSpeaker onClick={() => handleSound()} className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
							</div>
						)}
					</motion.button>
				</div>
			</main>
		</div>
	)
}
