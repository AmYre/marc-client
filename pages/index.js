import { useGlobalContext } from "../components/GlobalContext"

import HomeVideo from "../components/HomeVideo"
import { motion } from "framer-motion"
import { Md3DRotation } from "react-icons/md"
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi"

import Head from "next/head"
import Nav from "../components/Nav"
import NavBar from "../components/NavBar"

export default function Home() {
	const { lang, setLang, play, stop, homePlaying, setHomePlaying, texts } = useGlobalContext()

	return (
		<div>
			<Head>
				<title>{texts.title[lang]}</title>
				<meta name="description" content={texts.desc[lang]} />
			</Head>
			<main className="">
				<HomeVideo />

				<div className="md:hidden">
					<NavBar sound={stop} />
				</div>
				<nav className="hidden md:block absolute text-white z-10 top-12 left-12">
					<Nav sound={stop} />
				</nav>
				<div className="flex gap-3 absolute bottom-10 right-10 items-center">
					<motion.button
						onClick={() => setHomePlaying((prev) => !prev)}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						animate={{ scale: homePlaying ? 1.2 : 1 }}
						transition={{ duration: 0.3 }}>
						{homePlaying ? (
							<GiSpeaker className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
						) : (
							<GiSpeakerOff className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
						)}
					</motion.button>
					<Md3DRotation className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
				</div>
				{homePlaying ? play() : stop()}
			</main>
		</div>
	)
}
