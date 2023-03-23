import React, { useState } from "react"
import { useGlobalContext } from "../../components/GlobalContext"

import Link from "next/link"
import Image from "next/image"
import Masonry from "react-masonry-css"
import locales from "../../lang/locales.js"

import { motion } from "framer-motion"
import { sanityClient } from "../../lib/sanityClient"
import imageUrlBuilder from "@sanity/image-url"

import Nav from "../../components/Nav"
import NavBar from "../../components/NavBar"

const Showcased = ({ products }) => {
	const { nav, setNav, lang, setLang, isOpen, setIsOpen } = useGlobalContext()
	const [filter, setFilter] = useState("showed")

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" })

	const urlFor = (source) => {
		return imageBuilder.image(source)
	}
	return (
		<div className={`flex ${isOpen ? "h-screen overflow-hidden" : "min-h-screen"} md:gap-8 bg-bg md:p-12`}>
			<div className="md:hidden">
				<NavBar />
			</div>
			<nav className="hidden md:block h-fit text-white">
				<Nav />
			</nav>
			<main className="w-full bg-layout bg-opacity-90 text-white font-nunito text-center">
				<div className="p-12 pt-28 md:pt-12">
					<h2 className="text-3xl tracking-widest font-thin font-bodoni mb-12">{locales.showcased[lang]}</h2>
					<div className="text-sm p-4 mb-12 font-thin border-t-[1px] border-b-[1px] border-gray-100 flex flex-wrap justify-center gap-8">
						<button
							onClick={() => setFilter("showed")}
							className="cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300">
							{locales.all[lang]}
						</button>
						<button
							onClick={() => setFilter("showed-museum")}
							className="cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300">
							{locales.expo[lang]}
						</button>
						<button
							onClick={() => setFilter("showed-expo")}
							className="cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300">
							{locales.menu3[lang]}
						</button>
					</div>
					{products && (
						<div className="">
							{lang == "fr" && (
								<>
									<div className="hidden md:block">
										<Masonry breakpointCols={3} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
											{products.map((product, index) =>
												filter != "showed"
													? product.category?.slug.current == filter && (
															<motion.div
																key={index}
																initial={{ y: "50%", opacity: 0, scale: 0.5, borderRadius: "1000%" }}
																animate={{ y: 0, opacity: 1, scale: 1, borderRadius: "50%" }}
																transition={{ duration: 0.5, ease: "easeOut" }}
																exit={{ opacity: 0, scale: 0.1 }}>
																{product?.slugfr && (
																	<Link key={index} href={`/${product.slugfr.current}`} className="relative w-full">
																		<div className="product-frame relative w-full overflow-hidden">
																			<div className="overlay relative">
																				<Image
																					className="hover:scale-105 transition-all duration-1000 overflow-hidden"
																					src={urlFor(product.image).url()}
																					alt="Image produit"
																					width="300"
																					height="300"></Image>
																			</div>
																			<h2
																				className="absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out"
																				key={product.title.fr}>
																				{product.title.fr}
																			</h2>
																		</div>
																	</Link>
																)}
															</motion.div>
													  )
													: product.category?.parent?.slug.current == filter && (
															<motion.div
																key={index}
																initial={{ y: "50%", opacity: 0, scale: 0.5, borderRadius: "1000%" }}
																animate={{ y: 0, opacity: 1, scale: 1, borderRadius: "50%" }}
																transition={{ duration: 0.5, ease: "easeOut" }}
																exit={{ opacity: 0, scale: 0.1 }}>
																{product?.slugfr && (
																	<Link key={index} href={`/${product.slugfr.current}`} className="relative w-full">
																		<div className="product-frame relative w-full overflow-hidden">
																			<div className="overlay relative">
																				<Image
																					className="hover:scale-105 transition-all duration-1000 overflow-hidden"
																					src={urlFor(product.image).url()}
																					alt="Image produit"
																					width="300"
																					height="300"></Image>
																			</div>
																			<h2
																				className="absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out"
																				key={product.title.fr}>
																				{product.title.fr}
																			</h2>
																		</div>
																	</Link>
																)}
															</motion.div>
													  )
											)}
										</Masonry>
									</div>
									<div className="md:hidden">
										<Masonry breakpointCols={1} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
											{products.map((product, index) =>
												filter != "showed"
													? product.category?.slug.current == filter && (
															<motion.div
																key={index}
																initial={{ y: "50%", opacity: 0, scale: 0.5, borderRadius: "1000%" }}
																animate={{ y: 0, opacity: 1, scale: 1, borderRadius: "50%" }}
																transition={{ duration: 0.5, ease: "easeOut" }}
																exit={{ opacity: 0, scale: 0.1 }}>
																{product?.slugfr && (
																	<Link key={index} href={`/${product.slugfr.current}`} className="relative w-full">
																		<div className="product-frame relative w-full overflow-hidden">
																			<div className="overlay relative">
																				<Image
																					className="hover:scale-105 transition-all duration-1000 overflow-hidden"
																					src={urlFor(product.image).url()}
																					alt="Image produit"
																					width="300"
																					height="300"></Image>
																			</div>
																			<h2
																				className="absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out"
																				key={product.title.fr}>
																				{product.title.fr}
																			</h2>
																		</div>
																	</Link>
																)}
															</motion.div>
													  )
													: product.category?.parent?.slug.current == filter && (
															<motion.div
																key={index}
																initial={{ y: "50%", opacity: 0, scale: 0.5, borderRadius: "1000%" }}
																animate={{ y: 0, opacity: 1, scale: 1, borderRadius: "50%" }}
																transition={{ duration: 0.5, ease: "easeOut" }}
																exit={{ opacity: 0, scale: 0.1 }}>
																{product?.slugfr && (
																	<Link key={index} href={`/${product.slugfr.current}`} className="relative w-full">
																		<div className="product-frame relative w-full overflow-hidden">
																			<div className="overlay relative">
																				<Image
																					className="hover:scale-105 transition-all duration-1000 overflow-hidden"
																					src={urlFor(product.image).url()}
																					alt="Image produit"
																					width="300"
																					height="300"></Image>
																			</div>
																			<h2
																				className="absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out"
																				key={product.title.fr}>
																				{product.title.fr}
																			</h2>
																		</div>
																	</Link>
																)}
															</motion.div>
													  )
											)}
										</Masonry>
									</div>
								</>
							)}

							{lang == "en" && (
								<>
									<div className="md:hidden">
										<Masonry breakpointCols={1} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
											{products.map((product, index) =>
												filter != "showed"
													? product.category?.slug.current == filter && (
															<motion.div
																key={index}
																initial={{ y: "50%", opacity: 0, scale: 0.5, borderRadius: "1000%" }}
																animate={{ y: 0, opacity: 1, scale: 1, borderRadius: "50%" }}
																transition={{ duration: 0.5, ease: "easeOut" }}
																exit={{ opacity: 0, scale: 0.1 }}>
																{product?.slugen && (
																	<Link key={index} href={`/${product.slugen.current}`} className="relative w-full">
																		<div className="product-frame relative w-full overflow-hidden">
																			<div className="overlay relative">
																				<Image
																					className="hover:scale-105 transition-all duration-1000 overflow-hidden"
																					src={urlFor(product.image).url()}
																					alt="Image produit"
																					width="300"
																					height="300"></Image>
																			</div>
																			<h2
																				className="absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out"
																				key={product.title.en}>
																				{product.title.en}
																			</h2>
																		</div>
																	</Link>
																)}
															</motion.div>
													  )
													: product.category?.parent?.slug.current == filter && (
															<motion.div
																key={index}
																initial={{ y: "50%", opacity: 0, scale: 0.5, borderRadius: "1000%" }}
																animate={{ y: 0, opacity: 1, scale: 1, borderRadius: "50%" }}
																transition={{ duration: 0.5, ease: "easeOut" }}
																exit={{ opacity: 0, scale: 0.1 }}>
																{product?.slugen && (
																	<Link key={index} href={`/${product.slugen.current}`} className="relative w-full">
																		<div className="product-frame relative w-full overflow-hidden">
																			<div className="overlay relative">
																				<Image
																					className="hover:scale-105 transition-all duration-1000 overflow-hidden"
																					src={urlFor(product.image).url()}
																					alt="Image produit"
																					width="300"
																					height="300"></Image>
																			</div>
																			<h2
																				className="absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out"
																				key={product.title.en}>
																				{product.title.en}
																			</h2>
																		</div>
																	</Link>
																)}
															</motion.div>
													  )
											)}
										</Masonry>
									</div>
									<div className="hidden md:block">
										<Masonry breakpointCols={3} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
											{products.map((product, index) =>
												filter != "showed"
													? product.category?.slug.current == filter && (
															<motion.div
																key={index}
																initial={{ y: "50%", opacity: 0, scale: 0.5, borderRadius: "1000%" }}
																animate={{ y: 0, opacity: 1, scale: 1, borderRadius: "50%" }}
																transition={{ duration: 0.5, ease: "easeOut" }}
																exit={{ opacity: 0, scale: 0.1 }}>
																{product?.slugen && (
																	<Link key={index} href={`/${product.slugen.current}`} className="relative w-full">
																		<div className="product-frame relative w-full overflow-hidden">
																			<div className="overlay relative">
																				<Image
																					className="hover:scale-105 transition-all duration-1000 overflow-hidden"
																					src={urlFor(product.image).url()}
																					alt="Image produit"
																					width="300"
																					height="300"></Image>
																			</div>
																			<h2
																				className="absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out"
																				key={product.title.en}>
																				{product.title.en}
																			</h2>
																		</div>
																	</Link>
																)}
															</motion.div>
													  )
													: product.category?.parent?.slug.current == filter && (
															<motion.div
																key={index}
																initial={{ y: "50%", opacity: 0, scale: 0.5, borderRadius: "1000%" }}
																animate={{ y: 0, opacity: 1, scale: 1, borderRadius: "50%" }}
																transition={{ duration: 0.5, ease: "easeOut" }}
																exit={{ opacity: 0, scale: 0.1 }}>
																{product?.slugen && (
																	<Link key={index} href={`/${product.slugen.current}`} className="relative w-full">
																		<div className="product-frame relative w-full overflow-hidden">
																			<div className="overlay relative">
																				<Image
																					className="hover:scale-105 transition-all duration-1000 overflow-hidden"
																					src={urlFor(product.image).url()}
																					alt="Image produit"
																					width="300"
																					height="300"></Image>
																			</div>
																			<h2
																				className="absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out"
																				key={product.title.en}>
																				{product.title.en}
																			</h2>
																		</div>
																	</Link>
																)}
															</motion.div>
													  )
											)}
										</Masonry>
									</div>
								</>
							)}
							{lang == "ru" &&
								products.map(
									(product, index) =>
										product?.slugru && (
											<Link key={index} href={`/${product.slugru.current}`}>
												<Image src={urlFor(product.image).url()} alt="Image produit" width="300" height="300" />
												<h2 key={product.title.ru}>{product.title.ru}</h2>
											</Link>
										)
								)}
							{lang == "cn" &&
								products.map(
									(product, index) =>
										product?.slugcn && (
											<Link key={index} href={`/${product.slugcn.current}`}>
												<Image src={urlFor(product.image).url()} alt="Image produit" width="300" height="300" />
												<h2 key={product.title.cn}>{product.title.cn}</h2>
											</Link>
										)
								)}
						</div>
					)}
				</div>
			</main>
		</div>
	)
}

export const getServerSideProps = async () => {
	const products = await sanityClient.fetch(`*[_type == "products"]{ ..., _id, category->{..., parent->}}`)

	return {
		props: {
			products,
		},
	}
}

export default Showcased
