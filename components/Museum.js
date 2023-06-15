import React, { useState } from "react"
import { useGlobalContext } from "./GlobalContext"
import { sanityClient } from "../lib/sanityClient"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import imageUrlBuilder from "@sanity/image-url"
import { useEffect } from "react"

const Museum = () => {
	const { lang, setLang, texts, setTexts, walls } = useGlobalContext()
	const [picMuseum, setPicMuseum] = useState("/bg2.jpg")
	const [picRelated, setPicRelated] = useState("/bg3.jpg")
	const [picExpo, setPicExpo] = useState("/bg1.jpg")

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" })

	const urlFor = (source) => {
		return imageBuilder.image(source)
	}

	useEffect(() => {
		sanityClient.fetch(`*[_type=="walls"]{...}`).then((walls) => {
			walls.map((wall) => {
				wall.title == "museum"
					? setPicMuseum(urlFor(wall.image).url())
					: wall.title == "related"
					? setPicRelated(urlFor(wall.image).url())
					: wall.title == "expo" && setPicExpo(urlFor(wall.image).url())
			})
		})
	}, [])

	return (
		<div className="p-12 pt-28 md:pt-12">
			<h2 className="text-3xl tracking-widest font-thin font-bodoni mb-12">{texts.museum[lang]}</h2>

			<div className="md:hidden">
				<div className="flex flex-col md:flex-row gap-12">
					<motion.div
						className="w-full"
						initial={{ y: "50%", opacity: 0, scale: 0.5, borderRadius: "1000%" }}
						animate={{ y: 0, opacity: 1, scale: 1, borderRadius: "50%" }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						exit={{ opacity: 0, scale: 0.1 }}>
						<Link href="/museum/expo" className="relative w-full cursor-pointer">
							<div className="product-frame relative w-full overflow-hidden">
								<div className="overlay relative">
									<Image
										className="w-full h-60 hover:scale-105 object-cover transition-all duration-1000 overflow-hidden"
										src={picExpo}
										alt="Image produit"
										width="200"
										height="200"
									/>
								</div>
								<div className="absolute bottom-[33%] w-full bg-secondary bg-opacity-50 py-[10px] shadow">
									<h2 className="font-bold ellipse2 px-4">{texts.expo[lang]}</h2>
								</div>
							</div>
						</Link>
					</motion.div>
					<motion.div
						className="w-full"
						initial={{ y: "50%", opacity: 0, scale: 0.5, borderRadius: "1000%" }}
						animate={{ y: 0, opacity: 1, scale: 1, borderRadius: "50%" }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						exit={{ opacity: 0, scale: 0.1 }}>
						<Link href="/museum/sold" className="relative w-full cursor-pointer">
							<div className="product-frame relative w-full overflow-hidden">
								<div className="overlay relative">
									<Image
										className="w-full h-60 hover:scale-105 object-cover transition-all duration-1000 overflow-hidden"
										src={picMuseum}
										alt="Image produit"
										width="200"
										height="200"
									/>
								</div>
								<div className="absolute bottom-[33%] w-full bg-layout bg-opacity-50 py-[10px] shadow">
									<h2 className="font-bold ellipse2 px-4 ">{texts.sold[lang]}</h2>
								</div>
							</div>
						</Link>
					</motion.div>
					<motion.div
						className="w-full"
						initial={{ y: "50%", opacity: 0, scale: 0.5, borderRadius: "1000%" }}
						animate={{ y: 0, opacity: 1, scale: 1, borderRadius: "50%" }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						exit={{ opacity: 0, scale: 0.1 }}>
						<Link href="/museum/related" className="relative w-full cursor-pointer">
							<div className="product-frame relative w-full overflow-hidden">
								<div className="overlay relative">
									<Image
										className="w-full h-60 hover:scale-105 object-cover transition-all duration-1000 overflow-hidden"
										src={picRelated}
										alt="Image produit"
										width="200"
										height="200"
									/>
								</div>
								<div className="absolute bottom-[33%] w-full bg-secondary bg-opacity-50 py-[10px] shadow">
									<h2 className="font-bold ellipse2 px-4 ">{texts.museumRelated[lang]}</h2>
								</div>
							</div>
						</Link>
					</motion.div>
				</div>
			</div>
			<div className="hidden md:block">
				<div className="flex gap-2">
					<motion.div
						className="w-full"
						initial={{ y: "50%", opacity: 0, scale: 0.5, borderRadius: "1000%" }}
						animate={{ y: 0, opacity: 1, scale: 1, borderRadius: "50%" }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						exit={{ opacity: 0, scale: 0.1 }}>
						<Link href="/museum/expo" className="relative w-full cursor-pointer">
							<div className="product-frame relative w-full overflow-hidden">
								<div className="overlay relative">
									<Image
										className="w-full h-[500px] hover:scale-105 object-cover transition-all duration-1000 overflow-hidden"
										src="/bg1.jpg"
										alt="Image produit"
										width="500"
										height="500"
									/>
								</div>
								<div className="absolute bottom-[40%] w-full bg-secondary bg-opacity-70 py-[10px] shadow">
									<h2 className="text-xl font-bold ellipse2 px-4">{texts.expo[lang]}</h2>
								</div>
							</div>
						</Link>
					</motion.div>
					<motion.div
						className="w-full"
						initial={{ y: "50%", opacity: 0, scale: 0.5, borderRadius: "1000%" }}
						animate={{ y: 0, opacity: 1, scale: 1, borderRadius: "50%" }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						exit={{ opacity: 0, scale: 0.1 }}>
						<Link href="/museum/sold" className="relative w-full cursor-pointer">
							<div className="product-frame relative w-full overflow-hidden">
								<div className="overlay relative">
									<Image
										className="w-full h-[500px] hover:scale-105 object-cover transition-all duration-1000 overflow-hidden"
										src="/bg2.jpg"
										alt="Image produit"
										width="500"
										height="500"
									/>
								</div>
								<div className="absolute bottom-[40%] w-full bg-layout bg-opacity-50 py-[10px] shadow">
									<h2 className="font-bold text-xl ellipse2 px-4 ">{texts.sold[lang]}</h2>
								</div>
							</div>
						</Link>
					</motion.div>
					<motion.div
						className="w-full"
						initial={{ y: "50%", opacity: 0, scale: 0.5, borderRadius: "1000%" }}
						animate={{ y: 0, opacity: 1, scale: 1, borderRadius: "50%" }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						exit={{ opacity: 0, scale: 0.1 }}>
						<Link href="/museum/related" className="relative w-full cursor-pointer">
							<div className="product-frame relative w-full overflow-hidden">
								<div className="overlay relative">
									<Image
										className="w-full h-[500px] hover:scale-105 object-cover transition-all duration-1000 overflow-hidden"
										src="/bg3.jpg"
										alt="Image produit"
										width="500"
										height="500"
									/>
								</div>
								<div className="absolute bottom-[40%] w-full bg-secondary bg-opacity-70 py-[10px] shadow">
									<h2 className="font-bold text-xl ellipse2 px-4 ">{texts.museumRelated[lang]}</h2>
								</div>
							</div>
						</Link>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default Museum
