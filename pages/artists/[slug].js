import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../components/GlobalContext";

import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";

import Nav from "../../components/Nav";
import NavBar from "../../components/NavBar";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "../../lib/sanityClient";

const DetailArtist = ({ vignette }) => {
	const { lang, setLang, isOpen, setIsOpen, texts, setTexts } = useGlobalContext();
	const [creation, setCreation] = useState();
	const [artist, setArtist] = useState();

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" });

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	const vig = urlFor(vignette[0].image).url();

	const router = useRouter();
	const slug = router.query.slug;

	const toPlainText = (blocks) => {
		if (blocks) {
			return blocks
				.map((block) => {
					if (block._type !== "block" || !block.children) {
						return "";
					}
					return block.children.map((child) => child.text).join("");
				})
				.join("");
		}
	};

	useEffect(() => {
		sanityClient.fetch(`*[ _type == "artists" && slug.current == "${slug}" ]`).then((res) => {
			setArtist(res[0]);
			sanityClient
				.fetch(
					`*[_type == "artists" && slug.current == "${res[0].slug.current}"]{
				"products": *[_type == "products" && references(^._id)]| order(_updatedAt desc){title,slugfr,slugen,slugcn,slugru,image,sold}
				}`
				)
				.then((res) => {
					setCreation(res[0].products);
				});
		});
	}, []);

	return (
		<>
			<Head>
				<title>MarcMaison.Art | {artist ? artist.title : router?.query?.slug}</title>
				<meta name="description" content={artist ? toPlainText(artist.description[lang]) : router?.query?.slug} />
				<meta name="keywords" content={`${artist ? artist.title : router?.query?.slug} Marc Maison 19ème, Oeuvres 19ème, Artistes du 19ème siècle`} />
				<meta name="author" content="Galerie Marc Maison" />
				<link rel="icon" href="/favicon.ico" />
				<meta property="og:title" content={`MarcMaison.Art | ${artist ? artist.title : router?.query?.slug}`} />
				<meta property="og:description" content={artist ? toPlainText(artist.description[lang]) : router?.query?.slug} />
				<meta property="og:image" content="./logo.png" />
			</Head>
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
									transition={{ duration: 0.5, ease: "easeOut" }}
								>
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
										transition={{ duration: 0.5, ease: "easeOut" }}
									>
										<Image src={urlFor(artist?.image)?.url()} alt={artist?.title} width="500" height="500" />
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
												<div key={index} className="h-[200px] w-[200px] overflow-hidden relative">
													{creation.sold && (
														<div className="ribbon ribbon-top-right">
															<span>{texts.vendu[lang]}</span>
														</div>
													)}
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
		</>
	);
};

export const getStaticProps = async () => {
	const vignette = await sanityClient.fetch(`*[_type=="walls" && title == 'vignette']{...}`);

	return {
		props: {
			vignette,
		},
	};
};

export default DetailArtist;
