import React, { useState, useEffect } from "react"
import { sanityClient } from "../lib/sanityClient"
import { PortableText } from "@portabletext/react"
import imageUrlBuilder from "@sanity/image-url"
import { motion } from "framer-motion"

import Image from "next/image"
import Link from "next/link"

import { useGlobalContext } from "./GlobalContext"

const Gallery = () => {
	const { nav, setNav, lang, setLang, texts, setTexts } = useGlobalContext()
	const [judic, setJudic] = useState()

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" })

	const urlFor = (source) => {
		return imageBuilder.image(source)
	}

	useEffect(() => {
		sanityClient.fetch(`*[_type=="artists" && slug.current == 'hotel-particulier']{...}`).then((res) => {
			setJudic(res[0])
		})
	}, [])

	return (
		<main className="w-full h-full bg-opacity-90 text-white font-roboto flex flex-col p-12 pt-32 md:pt-12 ">
			<h2 className="text-3xl tracking-widest font-thin font-bodoni mb-4">{judic && judic?.title}</h2>
			<div className="flex flex-col justify-center items-center md:flex-row gap-4 pb-8">
				{judic?.image && (
					<motion.div className="rounded-xs" initial={{ y: "50%", opacity: 0, scale: 0.5 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
						<Image src={urlFor(judic?.image)?.url()} alt="Image produit" width="500" height="500" />
					</motion.div>
				)}
				<div className="font-roboto text-justify">{judic?.description && <PortableText value={judic?.description[lang] || judic?.description.en} />}</div>
			</div>
			<div className="flex flex-col md:flex-row justify-around items-center gap-4">
				<Link target="_blank" href="https://www.calameo.com/read/00672831782014e6b2b41">
					<button className="bg-secondary hover:cursor-pointer hover:scale-[1.02] hover:shadow-md text-white px-8 py-4 rounded transition-all duration-300">{texts?.ad[lang]}</button>
				</Link>
			</div>
		</main>
	)
}

export default Gallery
