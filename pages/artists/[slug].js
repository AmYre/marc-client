import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useGlobalContext } from "../../components/GlobalContext"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { PortableText } from "@portabletext/react"

import Nav from "../../components/Nav"
import NavBar from "../../components/NavBar"
import imageUrlBuilder from "@sanity/image-url"
import { sanityClient } from "../../lib/sanityClient"

const DetailArtist = ({ vignette }) => {
	const { lang, setLang, isOpen, setIsOpen } = useGlobalContext()
	const [creation, setCreation] = useState()
	const [artist, setArtist] = useState()

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" })

	const urlFor = (source) => {
		return imageBuilder.image(source)
	}

	const vig = urlFor(vignette[0].image).url()

	const router = useRouter()
	const slug = router.query.slug

	useEffect(() => {
		sanityClient.fetch(`*[ _type == "artists" && slug.current == "${slug}" ]`).then((res) => {
			setArtist(res[0])
			sanityClient
				.fetch(
					`*[_type == "artists" && slug.current == "${res[0].slug.current}"]{
				"products": *[_type == "products" && references(^._id)]| order(_updatedAt desc){title,slugfr,slugen,slugcn,slugru,image}
				}`
				)
				.then((res) => {
					setCreation(res[0].products)
				})
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

				<main className="w-full bg-layout bg-opacity-90 text-white font-roboto flex flex-col p-12 pt-32 md:pt-12 ">
					<h2 className="text-3xl tracking-widest font-thin font-bodoni mb-4">{artist?.title}</h2>
					<hr className="mb-4" />
					<div className="md:hidden">
						{artist?.image && (
							<motion.div
								className="rounded-xs mb-4"
								initial={{ y: "50%", opacity: 0, scale: 0.5 }}
								animate={{ y: 0, opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, ease: "easeOut" }}>
								<Image src={urlFor(artist?.image)?.url()} alt="Image produit" width="500" height="500" />
							</motion.div>
						)}
					</div>
					<div className="flex gap-4 border-b border-b-white pb-4 mb-12">
						<div className="font-roboto md:w-3/4 porText">{artist?.description && <PortableText value={artist?.description[lang] || artist?.description.en} />}</div>
						<div className="hidden md:block w-1/4">
							{artist?.image && (
								<motion.div
									className="rounded-xs"
									initial={{ y: "50%", opacity: 0, scale: 0.5 }}
									animate={{ y: 0, opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, ease: "easeOut" }}>
									<Image src={urlFor(artist?.image)?.url()} alt="Image produit" width="500" height="500" />
								</motion.div>
							)}
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center gap-10 ">
						{creation &&
							creation?.map((creation, index) => (
								<div className="mb-8" key={index}>
									{creation?.slugen && (
										<Link key={index} href={`/${creation.slugfr.current}`}>
											<div key={index} className="h-[200px] w-[200px] overflow-hidden">
												<img
													className="h-full w-full object-contain hover:scale-105 transition-all duration-1000"
													src={urlFor(creation.image).url()}
													alt="Image produit"
													style={{ backgroundImage: `url(${vig})`, backgroundSize: "cover" }}
												/>
												<div className="absolute w-[200px] bg-black bg-opacity-50 p-[10px] shadow ellipse2 px-4 font-thin">
													<h2 className="ellipse2 px-4 font-thin " key={creation.title.en}>
														{creation.title[lang] || creation.title.en}
													</h2>
												</div>
											</div>
										</Link>
									)}
								</div>
							))}
					</div>
				</main>
			</div>
		</main>
	)
}

export const getServerSideProps = async () => {
	const vignette = await sanityClient.fetch(`*[_type=="walls" && title == 'vignette']{...}`)

	return {
		props: {
			vignette,
		},
	}
}

export default DetailArtist
