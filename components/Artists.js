import React from "react"
import { useGlobalContext } from "./GlobalContext"

import Link from "next/link"
import Image from "next/image"
import Masonry from "react-masonry-css"
import { motion } from "framer-motion"
import imageUrlBuilder from "@sanity/image-url"

const Artists = ({ artists, vignette }) => {
	const { lang, setLang, texts, setTexts } = useGlobalContext()

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" })

	const urlFor = (source) => {
		return imageBuilder.image(source)
	}

	const vig = urlFor(vignette[0].image).url()

	return (
		<div className="p-12 pt-28 md:pt-12">
			<h2 className="text-3xl tracking-widest font-thin font-bodoni mb-12">{texts.menu2[lang]}</h2>

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
													<Image
														className="filter hover:brightness-125 transition-all duration-1000"
														src={urlFor(artist.image).url()}
														alt="Image produit"
														width="300"
														height="300"
														style={{ backgroundImage: `url(${vig})`, backgroundSize: "cover" }}
													/>
													<figcaption className="w-full bg-black bg-opacity-50 py-[10px] shadow ellipse2 px-4 font-thin ">
														<h2 className="ellipse2 px-4 font-thin " key={artist.title}>
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
											<div className="w-full overflow-hidden">
												<figure className="mb-8">
													<Image
														className="filter hover:brightness-110 transition-all duration-1000"
														src={urlFor(artist.image).url()}
														alt="Image produit"
														width="300"
														height="300"
														style={{ backgroundImage: `url(${vig})`, backgroundSize: "cover" }}
													/>
													<figcaption className="w-full bg-black bg-opacity-50 py-[10px] shadow ellipse2 px-4 font-thin ">
														<h2 className="ellipse2 px-4 font-thin " key={artist.title}>
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
				</div>
			)}
		</div>
	)
}

export default Artists
