import React, { Suspense, useState, useMemo, useRef } from "react"
import { useGlobalContext } from "../components/GlobalContext"
import { CloudinaryContext } from "cloudinary-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { Md3DRotation } from "react-icons/md"
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi"
import { BsTranslate } from "react-icons/bs"
import { AnimatePresence } from "framer-motion"

import Nav from "../components/Nav"
import NavBar from "../components/NavBar"
import EndCard from "../components/EndCard"

import flagfr from "../public/fr.png"
import flagen from "../public/en.png"
import flagcn from "../public/cn.png"
import flagpb from "../public/pb.png"
import flagpo from "../public/po.png"
import flagkr from "../public/kr.png"
import flagar from "../public/ar.png"
import flagjp from "../public/jp.png"
import flagit from "../public/it.png"
import flagtu from "../public/tu.png"
import flagru from "../public/ru.png"

const DetailProduct = () => {
	const { lang, setLang, tagLang, setTagLang, ended, setEnded, replay, setReplay, currentProduct } = useGlobalContext()
	const [playing, setPlaying] = useState(false)
	const [translate, setTranslate] = useState(false)
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

	let flags = [
		{ name: "français", pic: flagfr, lang: "fr", tagLang: "", mobtag: "-mob" },
		{ name: "english", pic: flagen, lang: "en", tagLang: "-en", mobtag: "-en-mob" },
		{ name: "chinese", pic: flagcn, lang: "cn", tagLang: "-cn", mobtag: "-cn-mob" },
		{ name: "netherland", pic: flagpb, lang: "pb", tagLang: "-pb", mobtag: "-pb-mob" },
		{ name: "polish", pic: flagpo, lang: "po", tagLang: "-po", mobtag: "-po-mob" },
		{ name: "korean", pic: flagkr, lang: "kr", tagLang: "-kr", mobtag: "-kr-mob" },
		{ name: "arabic", pic: flagar, lang: "ar", tagLang: "-ar", mobtag: "-ar-mob" },
		{ name: "japanese", pic: flagjp, lang: "jp", tagLang: "-jp", mobtag: "-jp-mob" },
		{ name: "italian", pic: flagit, lang: "it", tagLang: "-it", mobtag: "-it-mob" },
		{ name: "turkish", pic: flagtu, lang: "tu", tagLang: "-tu", mobtag: "-tu-mob" },
		{ name: "russian", pic: flagru, lang: "ru", tagLang: "-ru", mobtag: "-ru-mob" },
	]

	const videoDesktop = useMemo(
		() =>
			slug && (
				<video
					key={replay}
					ref={vRefDesk}
					className="h-screen w-full object-cover"
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
			<div key={slug} className="md:hidden">
				<Suspense fallback={<div className="h-screen w-full bg-black">Loading....</div>}>
					<CloudinaryContext cloud_name="amircloud" secure={true}>
						{videoMobile}
					</CloudinaryContext>
				</Suspense>
				<AnimatePresence>{ended && <EndCard />}</AnimatePresence>
			</div>
			<nav className="hidden md:block absolute text-white z-10 top-12 left-12 ">
				<Nav />
			</nav>
			<div key={slug + slug} className="hidden md:block">
				<CloudinaryContext cloud_name="amircloud" secure={true}>
					{videoDesktop}
				</CloudinaryContext>
				<AnimatePresence>{ended && <EndCard />}</AnimatePresence>
			</div>
			<div className="flex gap-3 absolute bottom-10 right-10 items-center">
				<div className="flex md:hidden">
					<motion.button
						onClick={() => handleMobSound()}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						animate={{ scale: playing ? 1 : [1.1, 1] }}
						transition={playing ? { duration: 0.3 } : { duration: 0.3, repeat: Infinity, repeatType: "reverse" }}>
						{!playing ? (
							<div className="w-[60px] h-[60px] m-auto bg-layout rounded-full border-2 border-white p-2 opacity-80 flex items-center justify-center">
								<GiSpeakerOff className="text-3xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
							</div>
						) : (
							<div className="w-[60px] h-[60px] m-auto bg-layout rounded-full border-2 border-white p-2 opacity-80 flex items-center justify-center">
								<GiSpeaker className="text-3xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
							</div>
						)}
					</motion.button>
				</div>
				<div className="hidden md:block">
					<div className="flex">
						<motion.button
							onClick={() => handleSound()}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							animate={{ scale: playing ? 1 : [1.1, 1] }}
							transition={playing ? { duration: 0.3 } : { duration: 0.3, repeat: Infinity, repeatType: "reverse" }}>
							{!playing ? (
								<div className="w-[60px] h-[60px] m-auto bg-layout rounded-full border-2 border-white p-2 opacity-80 flex items-center justify-center">
									<GiSpeakerOff className="text-3xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
								</div>
							) : (
								<div className="w-[60px] h-[60px] m-auto bg-layout rounded-full border-2 border-white p-2 opacity-80 flex items-center justify-center">
									<GiSpeaker className="text-3xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
								</div>
							)}
						</motion.button>
					</div>
				</div>
				<div className="w-[50px] h-[50px] m-auto bg-white rounded-full p-2 opacity-80 flex items-center justify-center">
					<Md3DRotation className="text-2xl text-black hover:scale-110 transition-all duration-300 cursor-pointer" />
				</div>
				<div
					className="w-[50px] h-[50px] m-auto bg-white rounded-full p-2 opacity-80 flex items-center justify-center"
					onClick={() => {
						setTranslate((prev) => !prev)
					}}>
					<BsTranslate className="text-2xl text-black hover:scale-110 transition-all duration-300 cursor-pointer" />
				</div>
				<AnimatePresence>
					{!translate && (
						<motion.div
							className="absolute left-0 bottom-[80px] p-4 flex flex-wrap justify-center items-center gap-3 bg-layout bg-opacity-70"
							initial={{ x: "10px", opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							exit={{ x: "10px", opacity: 0 }}>
							{flags.map((flag, index) => (
								<div className="relative flex flex-col justify-center items-center mb-2 mt-2" key={index}>
									<Link href={`${currentProduct?.slugfr?.current}${flag.tagLang}`}>
										<Image
											onClick={() => {
												setTagLang(flag.tagLang)
												setPlaying(false)
											}}
											className="hover:cursor-pointer transition-all duration-300"
											src={flag.pic}
											alt={flag.name}
											width="30"
											height="30"
										/>
									</Link>
									{tagLang == flag.tagLang && (
										<motion.div
											initial={{ y: "50%", opacity: 0, scale: 0.5 }}
											animate={{ y: 0, opacity: 1, scale: 1 }}
											transition={{ duration: 0.5, ease: "easeOut" }}
											exit={{ opacity: 0, scale: 0.1 }}
											className="absolute top-[30px] w-[8px] h-[8px] bg-white rounded-full"></motion.div>
									)}
								</div>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</main>
	)
}

export default DetailProduct
