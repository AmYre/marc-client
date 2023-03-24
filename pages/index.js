import { useState, useRef, useEffect } from "react"
import { useGlobalContext } from "../components/GlobalContext"
import { Video, CloudinaryContext } from "cloudinary-react"
import useSound from "use-sound"
import { motion } from "framer-motion"

import { Md3DRotation } from "react-icons/md"

import Head from "next/head"
import Image from "next/image"
import { MdVolumeUp } from "react-icons/md"
import Link from "next/link"

import { sanityClient } from "../lib/sanityClient"
import imageUrlBuilder from "@sanity/image-url"
import locales from "../lang/locales.js"
import Nav from "../components/Nav"
import NavBar from "../components/NavBar"
import MobNav from "../components/MobNav"
import poster from "../public/poster-home.png"

export default function Home({ walls }) {
	const { lang, setLang } = useGlobalContext()
	const [playing, setPlaying] = useState(false)

	const [play, { stop, isPlaying }] = useSound("/quiet.mp3")

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" })
	const urlFor = (source) => {
		return imageBuilder.image(source)
	}

	/* 	const [currentSlide, setCurrentSlide] = useState(0);
	let sliderInterval = useRef();

	useEffect(() => {
		sliderInterval = setInterval(() => {
			if (currentSlide < walls.length - 1) {
				setCurrentSlide(currentSlide + 1);
			} else {
				setCurrentSlide(0);
			}
		}, 10000);
		return () => {
			clearInterval(sliderInterval);
		};
	}); */
	return (
		<div>
			<Head>
				<title>{locales.title[lang]}</title>
				<meta name="description" content={locales.desc[lang]} />
			</Head>
			<main className="">
				<CloudinaryContext cloud_name="amircloud" secure={true}>
					<Video className="h-screen w-full object-cover" publicId="marc/home" autoPlay playsInline muted loop poster={poster} />
				</CloudinaryContext>
				{/* 	<div className='h-screen -z-10 absolute overflow-hidden'>
		

					<Image src={urlFor(walls[currentSlide].image).quality(100).url()} className='anim -z-10 object-cover h-screen w-screen' alt='bg' width='2500' height='2500' />;
				</div> */}
				<div className="md:hidden">
					<NavBar />
				</div>
				<nav className="hidden md:block absolute text-white z-10 top-12 left-12">
					<Nav />
				</nav>
				<div className="bg-black">
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
				</div>
				<Md3DRotation />
				{playing ? play() : stop()}
				{playing ? play() : stop()}
			</main>
		</div>
	)
}

export const getServerSideProps = async () => {
	const walls = await sanityClient.fetch(`*[_type == "walls"]`)

	return {
		props: {
			walls,
		},
	}
}
