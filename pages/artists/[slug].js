import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useGlobalContext } from "../../components/GlobalContext"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import Masonry from "react-masonry-css"
import { PortableText } from "@portabletext/react"

import Nav from "../../components/Nav"
import NavBar from "../../components/NavBar"
import imageUrlBuilder from "@sanity/image-url"
import { sanityClient } from "../../lib/sanityClient"

const Creation = () => {
	const { lang, setLang, isOpen, setIsOpen } = useGlobalContext()
	const [slugLang, setSlugLang] = useState()
	const [creation, setCreation] = useState()
	const [artist, setArtist] = useState()

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" })

	const urlFor = (source) => {
		return imageBuilder.image(source)
	}

	const router = useRouter()
	const slug = router.query.slug

	useEffect(() => {
		sanityClient.fetch(`*[ _type == "artists" && slug.current == "${slug}" ]`).then((res) => {
			setArtist(res[0])
			sanityClient
				.fetch(
					`*[_type == "artists" && slug.current == "${res[0].slug.current}"]{
				"products": *[_type == "products" && references(^._id)]{title,slugfr,slugen,slugcn,slugru,image}
				}`
				)
				.then((res) => setCreation(res[0].products))
		})
	}, [])

	return (
		<main>
			<div className={`flex ${isOpen ? "h-screen overflow-hidden" : "min-h-screen"} md:gap-8 bg-bg md:p-12`}>
				<div className="md:hidden">
					<NavBar />
				</div>
				<nav className="hidden md:block h-fit text-white">
					<Nav />
				</nav>

				<main className="w-full bg-layout bg-opacity-90 text-white font-nunito text-center flex flex-col items-center p-12 pt-32 md:pt-12 ">
					<h2 className="text-3xl tracking-widest font-thin font-bodoni mb-12">{artist?.title}</h2>
					{artist?.image && (
						<motion.div className="mb-12" initial={{ y: "50%", opacity: 0, scale: 0.5 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
							<Image className="rounded-xs w-48 shadow shadow-white" src={urlFor(artist?.image)?.url()} alt="Image produit" width="300" height="300" />
						</motion.div>
					)}

					<div className="text-justify flex flex-col gap-4 border-b border-b-white pb-12 mb-12">
						<PortableText value={artist?.description[lang]} />
					</div>
					<div className="flex justify-center items-center">
						<Masonry breakpointCols={3} className="my-masonry-grid justify-center" columnClassName="my-masonry-grid_column">
							{creation &&
								creation?.map((creation, index) => (
									<motion.div
										key={index}
										initial={{ y: "50%", opacity: 0, scale: 0.5 }}
										animate={{ y: 0, opacity: 1, scale: 1 }}
										transition={{ duration: 0.5, ease: "easeOut" }}
										exit={{ opacity: 0, scale: 0.1 }}>
										{creation?.slugen && (
											<Link key={index} href={`/${creation.slugfr.current}`}>
												<div className="w-full overflow-hidden">
													<figure className="mb-8">
														<Image
															className="hover:scale-105 transition-all duration-1000"
															src={urlFor(creation.image).url()}
															alt="Image produit"
															width="600"
															height="600"
														/>
														<figcaption className="w-full bg-black bg-opacity-50 py-[10px] shadow ellipse2 px-4 font-thin ">
															<h2 className="ellipse2 px-4 font-thin " key={creation.title[lang]}>
																{creation.title[lang]}
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
				</main>
			</div>
		</main>
	)
}

export default Creation
