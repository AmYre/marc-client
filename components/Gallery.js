import React, { useState, useEffect } from "react"
import { sanityClient } from "../lib/sanityClient"
import { PortableText } from "@portabletext/react"
import imageUrlBuilder from "@sanity/image-url"
import { motion } from "framer-motion"

import Image from "next/image"

import { useGlobalContext } from "./GlobalContext"

const Gallery = () => {
	const { nav, setNav, lang, setLang, texts, setTexts } = useGlobalContext()
	const [judic, setJudic] = useState()

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" })

	const urlFor = (source) => {
		return imageBuilder.image(source)
	}

	useEffect(() => {
		sanityClient.fetch(`*[_type=="artists" && slug.current == 'anna-judic']{...}`).then((res) => {
			setJudic(res[0])
		})
	}, [])

	return (
		<main className="w-full h-full bg-opacity-90 text-white font-roboto flex flex-col p-12 pt-32 md:pt-12 ">
			<h2 className="text-3xl tracking-widest font-thin font-bodoni mb-4">{judic && judic?.title}</h2>
			<div className="flex flex-col md:flex-row gap-4 pb-8">
				{judic?.image && (
					<motion.div className="rounded-xs md:w-1/2" initial={{ y: "50%", opacity: 0, scale: 0.5 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
						<Image src={urlFor(judic?.image)?.url()} alt="Image produit" width="500" height="500" />
					</motion.div>
				)}
				<div className="font-roboto md:w-1/2">{judic?.description && <PortableText value={judic?.description[lang] || judic?.description.en} />}</div>
			</div>
			<div className="flex flex-col md:flex-row justify-around items-center gap-4">
				<button className="bg-[#a87e2d] hover:cursor-pointer hover:scale-[1.02] hover:shadow-md text-white px-8 py-4 rounded transition-all duration-300">{texts?.more[lang]}</button>
				<button className="bg-[#a87e2d] hover:cursor-pointer hover:scale-[1.02] hover:shadow-md text-white px-8 py-4 rounded transition-all duration-300">{texts?.ad[lang]}</button>
			</div>
			{/* 			{lang == "fr" && (
				<>
					<div className="hidden md:block h-full w-full">
						<iframe className="bg-transparent m-auto" src="//v.calameo.com/?bkcode=0067283174fb6e58f9d0b&mode=mini" width="100%" height="100%" allowFullScreen></iframe>
					</div>
					<div className="md:hidden flex flex-col justify-center items-center mt-20">
						<Image src="/aj-fr/aj-fr-1.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-fr/aj-fr-2.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-fr/aj-fr-3.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-fr/aj-fr-4.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-fr/aj-fr-5.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-fr/aj-fr-6.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-fr/aj-fr-7.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-fr/aj-fr-8.jpg" alt="ana judic" width="300" height="600" />
					</div>
				</>
			)}
			{lang == "en" && (
				<>
					<div className="hidden md:block h-full w-full">
						<iframe className="bg-transparent m-auto" src="//v.calameo.com/?bkcode=00672831786ffbd4b8f8e&mode=mini" width="100%" height="100%" allowFullScreen></iframe>
					</div>
					<div className="md:hidden flex flex-col justify-center items-center mt-20">
						<Image src="/aj-en/aj-en-1.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-en/aj-en-2.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-en/aj-en-3.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-en/aj-en-4.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-en/aj-en-5.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-en/aj-en-6.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-en/aj-en-7.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-en/aj-en-8.jpg" alt="ana judic" width="300" height="600" />
					</div>
				</>
			)}
			{lang == "ru" && (
				<>
					<div className="hidden md:block h-full w-full">
						<iframe className="bg-transparent m-auto" src="//v.calameo.com/?bkcode=00672831786ffbd4b8f8e&mode=mini" width="100%" height="100%" allowFullScreen></iframe>
					</div>
					<div className="md:hidden flex flex-col justify-center items-center mt-20">
						<Image src="/aj-en/aj-en-1.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-en/aj-en-2.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-en/aj-en-3.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-en/aj-en-4.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-en/aj-en-5.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-en/aj-en-6.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-en/aj-en-7.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-en/aj-en-8.jpg" alt="ana judic" width="300" height="600" />
					</div>
				</>
			)}
			{lang == "cn" && (
				<>
					<div className="hidden md:block h-full w-full">
						<iframe className="bg-transparent m-auto" src="//v.calameo.com/?bkcode=006728317968097a3c634&mode=mini" width="100%" height="100%" allowFullScreen></iframe>
					</div>
					<div className="md:hidden flex flex-col justify-center items-center mt-20">
						<Image src="/aj-cn/aj-cn-1.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-cn/aj-cn-2.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-cn/aj-cn-3.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-cn/aj-cn-4.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-cn/aj-cn-5.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-cn/aj-cn-6.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-cn/aj-cn-7.jpg" alt="ana judic" width="300" height="600" />
						<Image src="/aj-cn/aj-cn-8.jpg" alt="ana judic" width="300" height="600" />
					</div>
				</>
			)} */}
		</main>
	)
}

export default Gallery
