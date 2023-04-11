import React, { useState } from "react"
import { useGlobalContext } from "./GlobalContext"

import Link from "next/link"
import Image from "next/image"
import Masonry from "react-masonry-css"
import locales from "../lang/locales.js"
import { motion } from "framer-motion"
import imageUrlBuilder from "@sanity/image-url"

const Artists = ({ artists }) => {
	const { nav, setNav, lang, setLang } = useGlobalContext()
	const [filter, setFilter] = useState()

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" })

	const urlFor = (source) => {
		return imageBuilder.image(source)
	}

	const filterByCat = (cat) => {
		if (cat == "all") {
			setFilter("")
		}
		if (cat == "nouveau") {
			setFilter("nouveau")
		}
		if (cat == "artisanats") {
			setFilter("artisanats")
		}
	}

	return (
		<div className="p-12 pt-28 md:pt-12">
			<h2 className="text-3xl tracking-widest font-thin font-bodoni mb-12">{locales.menu2[lang]}</h2>

			{artists && (
				<div className="">
					<div className="hidden md:block">
						<Masonry breakpointCols={3} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
							{artists.map((artist, index) => (
								<motion.div
									key={index}
									initial={{ y: "50%", opacity: 0, scale: 0.5 }}
									animate={{ y: 0, opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, ease: "easeOut" }}
									exit={{ opacity: 0, scale: 0.1 }}>
									{artist?.slug && (
										<Link key={index} href={`artists/${artist.slug.current}`}>
											<div className="w-full overflow-hidden">
												<figure className="mb-8">
													<Image className="hover:scale-105 transition-all duration-1000" src={urlFor(artist.image).url()} alt="Image produit" width="300" height="300" />
													<figcaption className="w-full bg-black bg-opacity-50 py-[10px] shadow ellipse2 px-4 ">
														<h2 className="ellipse2 px-4 font-thin" key={artist.title}>
															{artist.title}
														</h2>
													</figcaption>
												</figure>
											</div>
										</Link>
									)}
								</motion.div>
							))}
						</Masonry>
					</div>
					<div className="md:hidden">
						<Masonry breakpointCols={1} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
							{artists.map((artist, index) => (
								<motion.div
									key={index}
									initial={{ y: "50%", opacity: 0, scale: 0.5 }}
									animate={{ y: 0, opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, ease: "easeOut" }}
									exit={{ opacity: 0, scale: 0.1 }}>
									{artist?.slug && (
										<Link key={index} href={`artists/${artist.slug.current}`} className="relative w-full">
											<div className="product-frame relative w-full overflow-hidden">
												<div className="overlay relative">
													<Image
														className="hover:scale-105 transition-all duration-1000 overflow-hidden"
														src={urlFor(artist.image).url()}
														alt="Image produit"
														width="300"
														height="300"></Image>
												</div>
												<div className="absolute bottom-[30px] w-full bg-black bg-opacity-50 py-[10px] shadow">
													<h2 className="ellipse2 px-4 " key={artist.title}>
														{artist.title}
													</h2>
												</div>
											</div>
										</Link>
									)}
								</motion.div>
							))}
						</Masonry>
					</div>
				</div>
			)}
		</div>
	)
}

export default Artists
