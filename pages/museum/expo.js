import React, { useState } from "react";
import { useGlobalContext } from "../../components/GlobalContext";

import Link from "next/link";
import Image from "next/image";
import Masonry from "react-masonry-css";

import { motion } from "framer-motion";
import { sanityClient } from "../../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

import Nav from "../../components/Nav";
import NavBar from "../../components/NavBar";

const Expo = ({ products, vignette }) => {
	const { lang, setLang, isOpen, setIsOpen, texts, setTexts } = useGlobalContext();
	const [filter, setFilter] = useState("expo");

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" });

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};
	const vig = urlFor(vignette[0].image).url();

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
					<h2 className="text-3xl tracking-widest font-thin font-bodoni mb-12">{texts.expo[lang]}</h2>

					{products && (
						<div className="">
							<div className="hidden md:block">
								<Masonry breakpointCols={3} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
									{products.map((product, index) => (
										<motion.div
											key={index}
											initial={{ y: "50%", opacity: 0, scale: 0.5, borderRadius: "1000%" }}
											animate={{ y: 0, opacity: 1, scale: 1, borderRadius: "50%" }}
											transition={{ duration: 0.5, ease: "easeOut" }}
											exit={{ opacity: 0, scale: 0.1 }}
										>
											{product?.slugfr && (
												<Link key={index} href={`/${product.slugfr.current}`}>
													<div className="vig-wrapper relative w-full overflow-hidden mb-8">
													{product.sold && (
																	<div className="ribbon ribbon-top-right">
																		<span>{texts.vendu[lang]}</span>
																	</div>
																)}
														<Image
															className="hover:scale-105 transition-all duration-1000"
															src={urlFor(product.image).url()}
															alt="Image produit"
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
									))}
								</Masonry>
							</div>
							<div className="md:hidden">
								<Masonry breakpointCols={1} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
									{products.map((product, index) => (
										<motion.div
											key={index}
											initial={{ y: "50%", opacity: 0, scale: 0.5, borderRadius: "1000%" }}
											animate={{ y: 0, opacity: 1, scale: 1, borderRadius: "50%" }}
											transition={{ duration: 0.5, ease: "easeOut" }}
											exit={{ opacity: 0, scale: 0.1 }}
										>
											{product?.slugfr && (
												<Link key={index} href={`/${product.slugfr.current}`}>
													<div className="w-full overflow-hidden">
														<figure className="mb-8">
															{product.sold && (
																	<div className="ribbon ribbon-top-right">
																		<span>{texts.vendu[lang]}</span>
																	</div>
																)}
															<Image
																className="hover:scale-105 transition-all duration-1000"
																src={urlFor(product.image).url()}
																alt="Image produit"
																width="300"
																height="300"
																style={{ backgroundImage: `url(${vig})`, backgroundSize: "cover" }}
															/>
															<figcaption className="w-full bg-black bg-opacity-50 py-[10px] shadow ellipse2 px-4 ">
																<h2 className="ellipse2 px-4 font-thin" key={product.title.en}>
																	{product.title[lang] ? product.title[lang] : product.title.en}
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
			</main>
		</div>
	);
};

export const getStaticProps = async () => {
	const products = await sanityClient.fetch(`*[_type=="products" && references(*[_type=="category" && slug.current == 'expo']._id)] | order(_updatedAt desc) {..., category->}`);
	const vignette = await sanityClient.fetch(`*[_type=="walls" && title == 'vignette']{...}`);

	return {
		props: {
			products,
			vignette,
		},
	};
};

export default Expo;
