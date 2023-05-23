import React, { useEffect, useState, useMemo, useRef } from "react"
import { useGlobalContext } from "../components/GlobalContext"
import { Video, CloudinaryContext } from "cloudinary-react"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { Md3DRotation } from "react-icons/md"
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi"
import { AnimatePresence } from "framer-motion"

import Nav from "../components/Nav"
import NavBar from "../components/NavBar"
import EndCard from "../components/EndCard"

const DetailProduct = () => {
	const { lang, setLang, ended, setEnded, replay, setReplay } = useGlobalContext()
	const [playing, setPlaying] = useState(false)
	const [screen, setScreen] = useState(false)
	const vRefDesk = useRef(null)
	const vRefMob = useRef(null)

	const router = useRouter()
	const slug = router.query.slug

	const handleSound = () => {
		setPlaying((prev) => !prev)
		vRefDesk.current.muted = !vRefDesk.current.muted
	}
	const handleMobSound = () => {
		setPlaying((prev) => !prev)
		vRefMob.current.muted = !vRefMob.current.muted
	}

	useEffect(() => {
		window?.matchMedia("(max-width: 800px)") ? setScreen("mob") : setScreen("desk")
	}, [])

	const videoDesktop = useMemo(
		() =>
			slug && (
				<video
					key={replay}
					ref={vRefDesk}
					className="h-screen w-full object-cover"
					publicId={
						lang == "fr"
							? `marc/${slug}`
							: lang == "en"
							? `marc/${slug}`
							: lang == "cn"
							? `marc/${slug}-cn`
							: lang == "po"
							? `marc/${slug}-po`
							: lang == "pb"
							? `marc/${slug}-pb`
							: lang == "ar"
							? `marc/${slug}-ar`
							: lang == "it"
							? `marc/${slug}-it`
							: lang == "kr"
							? `marc/${slug}-kr`
							: lang == "tu"
							? `marc/${slug}-tu`
							: lang == "ru"
							? `marc/${slug}-ru`
							: lang == "jp" && `marc/${slug}-jp`
					}
					autoPlay
					playsInline
					muted
					onEnded={() => {
						setEnded(true)
						setPlaying(false)
					}}
					poster={{ startOffset: "0" }}>
					<source src={`https://res.cloudinary.com/amircloud/video/upload/marc/${slug}.mp4`} type="video/mp4" />
					<source src="https://res.cloudinary.com/amircloud/video/upload/v1673634198/marc/home.mp4" type="video/mp4" />
				</video>
			),
		[lang, slug, replay]
	)

	const videoMobile = useMemo(
		() =>
			slug && (
				<video
					key={replay}
					ref={vRefMob}
					className="h-screen w-full object-cover"
					publicId={
						lang == "fr"
							? `marc/${slug}-mob`
							: lang == "en"
							? `marc/${slug}-mob-en`
							: lang == "cn"
							? `marc/${slug}-mob-cn`
							: lang == "po"
							? `marc/${slug}-mob-po`
							: lang == "pb"
							? `marc/${slug}-mob-pb`
							: lang == "ar"
							? `marc/${slug}-mob-ar`
							: lang == "it"
							? `marc/${slug}-mob-it`
							: lang == "kr"
							? `marc/${slug}-mob-kr`
							: lang == "tu"
							? `marc/${slug}-mob-tu`
							: lang == "ru"
							? `marc/${slug}-mob-ru`
							: lang == "jp" && `marc/${slug}-mob-jp`
					}
					autoPlay
					playsInline
					muted
					onEnded={() => {
						setEnded(true)
						setPlaying(false)
					}}
					poster={{ startOffset: "0" }}>
					<source src={`https://res.cloudinary.com/amircloud/video/upload/marc/${slug}-mob.mp4`} type="video/mp4" />
					<source src="https://res.cloudinary.com/amircloud/video/upload/v1673634198/marc/home.mp4" type="video/mp4" />
				</video>
			),
		[lang, slug, replay]
	)

	return (
		<main>
			<div className="md:hidden">
				<NavBar />
			</div>
			<div className="md:hidden">
				<CloudinaryContext cloud_name="amircloud" secure={true}>
					{videoMobile}
				</CloudinaryContext>
				<AnimatePresence>{ended && <EndCard />}</AnimatePresence>
			</div>
			<nav className="hidden md:block absolute text-white z-10 top-12 left-12 ">
				<Nav />
			</nav>
			<div className="hidden md:block">
				<CloudinaryContext cloud_name="amircloud" secure={true}>
					{videoDesktop}
				</CloudinaryContext>
				<AnimatePresence>{ended && <EndCard />}</AnimatePresence>
			</div>
			<div className="flex gap-3 absolute bottom-10 right-10 items-center">
				<div className="flex md:hidden">
					<motion.button onClick={() => handleMobSound()} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} animate={{ scale: playing ? 1.2 : 1 }} transition={{ duration: 0.3 }}>
						{!playing ? (
							<GiSpeakerOff className="flex text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
						) : (
							<GiSpeaker className="flex text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
						)}
					</motion.button>
				</div>
				<div className="hidden md:block">
					<div className="flex">
						<motion.button onClick={() => handleSound()} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} animate={{ scale: playing ? 1.2 : 1 }} transition={{ duration: 0.3 }}>
							{!playing ? (
								<GiSpeakerOff className="flex text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
							) : (
								<GiSpeaker className="flex text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
							)}
						</motion.button>
					</div>
				</div>
				<Md3DRotation className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
			</div>
		</main>
	)
}

export default DetailProduct
