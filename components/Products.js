import React, { useState } from "react"
import { useGlobalContext } from "./GlobalContext"

import Link from "next/link"
import Image from "next/image"
import Masonry from "react-masonry-css"
import { motion } from "framer-motion"
import imageUrlBuilder from "@sanity/image-url"

const Products = ({ products, vignette }) => {
	const { lang, setLang, tagLang, setTagLang, texts, setTexts, currentProduct, setCurrentProduct } = useGlobalContext()
	const [filter, setFilter] = useState()

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" })

	const urlFor = (source) => {
		return imageBuilder.image(source)
	}
	const vig = urlFor(vignette[0].image).url()

	return (
		<div className="p-12 pt-28 md:pt-12">
			<h2 className="text-3xl tracking-widest font-thin mb-12 font-bodoni">{texts.menu1[lang]}</h2>
			<div className="text-sm p-4 mb-12 font-thin border-t-[1px] border-b-[1px] border-gray-100 flex flex-wrap justify-center gap-8">
				<button onClick={() => setFilter("museum")} className="cursor-pointer hover:font-bold active:font-bold focus:font-bold transition-all duration-300">
					{texts.museum[lang]}
				</button>
				<button onClick={() => setFilter("")} className="cursor-pointer hover:font-bold active:font-bold focus:font-bold transition-all duration-300">
					{texts.all[lang]}
				</button>
				<button onClick={() => setFilter("expo")} className="cursor-pointer hover:font-bold active:font-bold focus:font-bold transition-all duration-300">
					{texts.expotitle[lang]}
				</button>
			</div>
			{products && (
				<div className="">
					<>
						<div className="md:hidden">
							<Masonry breakpointCols={1} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
								{products.map((product, index) =>
									filter ? (
										product.category?.slug?.current == filter && (
											<motion.div
												key={index}
												initial={{ y: "50%", opacity: 0, scale: 0.5 }}
												animate={{ y: 0, opacity: 1, scale: 1 }}
												transition={{ duration: 0.5, ease: "easeOut" }}
												exit={{ opacity: 0, scale: 0.1 }}>
												{product?.slugen && (
													<Link
														key={index}
														href={tagLang ? `${product.slugfr?.current}${tagLang}` : product.slugfr?.current}
														onClick={() => {
															setCurrentProduct(product)
														}}>
														<div className="w-full overflow-hidden">
															<figure className="mb-8">
																<Image
																	className="hover:scale-105 transition-all duration-1000"
																	src={urlFor(product.image).url()}
																	alt={product.alt ? product.alt[lang] : product.title?.en}
																	width="300"
																	height="300"
																	style={{ backgroundImage: `url(${vig})`, backgroundSize: "cover" }}
																/>
																<figcaption className="w-full bg-black bg-opacity-50 py-[10px] shadow ellipse2 px-4 font-thin ">
																	<h2 className="ellipse2 px-4 font-thin " key={product.title.en}>
																		{product.title[lang] ? product.title[lang] : product.title.en}
																	</h2>
																</figcaption>
															</figure>
														</div>
													</Link>
												)}
											</motion.div>
										)
									) : (
										<motion.div
											key={index}
											initial={{ y: "50%", opacity: 0, scale: 0.5 }}
											animate={{ y: 0, opacity: 1, scale: 1 }}
											transition={{ duration: 0.5, ease: "easeOut" }}
											exit={{ opacity: 0, scale: 0.1 }}>
											{product?.slugen && (
												<Link
													key={index}
													href={tagLang ? `${product.slugfr?.current}${tagLang}` : product.slugfr?.current}
													onClick={() => {
														setCurrentProduct(product)
													}}>
													<div className="w-full overflow-hidden">
														<figure className="mb-8">
															<Image
																className="hover:scale-105 transition-all duration-1000"
																src={urlFor(product.image).url()}
																alt={product.alt ? product.alt[lang] : product.title?.en}
																width="300"
																height="300"
																style={{ backgroundImage: `url(${vig})`, backgroundSize: "cover" }}
															/>
															<figcaption className="w-full bg-black bg-opacity-50 py-[10px] shadow ellipse2 px-4 font-thin ">
																<h2 className="ellipse2 px-4 font-thin " key={product.title[lang]}>
																	{product.title[lang] || product.title.en}
																</h2>
															</figcaption>
														</figure>
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
									filter ? (
										product.category?.slug?.current == filter && (
											<motion.div
												key={index}
												initial={{ y: "50%", opacity: 0, scale: 0.5 }}
												animate={{ y: 0, opacity: 1, scale: 1 }}
												transition={{ duration: 0.5, ease: "easeOut" }}
												exit={{ opacity: 0, scale: 0.1 }}>
												{product?.slugen && (
													<Link
														key={index}
														href={tagLang ? `${product.slugfr?.current}${tagLang}` : product.slugfr?.current}
														onClick={() => {
															setCurrentProduct(product)
														}}>
														<div className="vig-wrapper relative w-full overflow-hidden mb-8">
															<Image
																className="hover:scale-105 transition-all duration-1000"
																src={urlFor(product.image).url()}
																alt={product.alt ? product.alt[lang] : product.title?.en}
																width="300"
																height="300"
																style={{ backgroundImage: `url(${vig})`, backgroundSize: "cover" }}
															/>
															<div className="vig-txt w-full bg-black bg-opacity-50 py-[10px] shadow ellipse2 px-4 font-thin absolute">
																<h2 className="ellipse2 px-4 font-thin " key={product.title.en}>
																	{product.title[lang] ? product.title[lang] : product.title.en}
																</h2>
															</div>
														</div>
													</Link>
												)}
											</motion.div>
										)
									) : (
										<motion.div
											key={index}
											initial={{ y: "50%", opacity: 0, scale: 0.5 }}
											animate={{ y: 0, opacity: 1, scale: 1 }}
											transition={{ duration: 0.5, ease: "easeOut" }}
											exit={{ opacity: 0, scale: 0.1 }}>
											{product?.slugen && (
												<Link
													key={index}
													href={tagLang ? `${product.slugfr?.current}${tagLang}` : product.slugfr?.current}
													onClick={() => {
														setCurrentProduct(product)
													}}>
													<div className="vig-wrapper relative w-full overflow-hidden mb-8">
														<Image
															className="hover:scale-105 transition-all duration-1000"
															src={urlFor(product.image).url()}
															alt={product.alt ? product.alt[lang] : product.title?.en}
															width="300"
															height="300"
															style={{ backgroundImage: `url(${vig})`, backgroundSize: "cover" }}
														/>
														<div className="vig-txt w-full bg-black bg-opacity-50 py-[10px] shadow ellipse2 px-4 font-thin absolute">
															<h2 className="ellipse2 px-4 font-thin " key={product.title.en}>
																{product.title[lang] ? product.title[lang] : product.title.en}
															</h2>
														</div>
													</div>
												</Link>
											)}
										</motion.div>
									)
								)}
							</Masonry>
						</div>
					</>
				</div>
			)}
		</div>
	)
}

export default Products
