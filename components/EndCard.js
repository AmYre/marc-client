import React, { useState, useEffect } from "react"
import { useGlobalContext } from "../components/GlobalContext"
import { sanityClient } from "../lib/sanityClient"
import { useRouter } from "next/router"
import imageUrlBuilder from "@sanity/image-url"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

import ImgLoader from "./ImgLoader"

import { AiOutlineCloseCircle } from "react-icons/ai"
import { IoMdRefreshCircle } from "react-icons/io"

import cnes from "../public/cnes.png"
import cefa from "../public/cefa.png"
import flagpb from "../public/pb.png"
import flagpo from "../public/po.png"
import flagkr from "../public/kr.png"
import flagar from "../public/ar.png"
import flagjp from "../public/jp.png"
import flagit from "../public/it.png"
import flagtu from "../public/tu.png"
import flagru from "../public/ru.png"
import logo from "../public/logo.png"

const EndCard = () => {
	const { lang, setLang, texts, setTexts, ended, setEnded, replay, setReplay, currentProduct, setCurrentProduct } = useGlobalContext()

	const [isOpen, setIsOpen] = useState(false)
	const [products, setProducts] = useState()
	const [related, setRelated] = useState()
	const [currentLang, setCurrentLang] = useState()

	const router = useRouter()
	const url = router.query.slug

	const imageLoader = ({ src, width, quality }) => {
		return `${src}?w=${width}&q=${quality || 75}`
	}

	let relatedLangs = [
		{ name: "netherland", pic: flagpb, tag: "-pb" },
		{ name: "polish", pic: flagpo, tag: "-po" },
		{ name: "korean", pic: flagkr, tag: "-kr" },
		{ name: "arabic", pic: flagar, tag: "-ar" },
		{ name: "japanese", pic: flagjp, tag: "-jp" },
		{ name: "italian", pic: flagit, tag: "-it" },
		{ name: "turkish", pic: flagtu, tag: "-tu" },
		{ name: "russian", pic: flagru, tag: "-ru" },
	]

	const getVids = async () => {
		const products = await sanityClient.fetch(`*[_type == "products"]`)
		setProducts(products)
		return products
	}

	const getVidLang = async (lang) => {
		setCurrentLang(lang)
		setRelated(products.filter((product) => product.variants && product.variants.includes(lang)))
	}

	useEffect(() => {
		getVids().then((products) => {
			setCurrentProduct(products.filter((product) => product.slugfr.current == url)[0])
		})
	}, [])

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" })

	const urlFor = (source) => {
		return imageBuilder.image(source)
	}

	return (
		<>
			<div className="md:hidden">
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.25 }}
					className="absolute top-0 w-full h-full z-20 flex justify-around items-center bg-bg">
					<div className="w-screen h-screen flex flex-col justify-around items-center p-12 bg-layout">
						<div className="flex justify-center items-center h-[150px]">
							<Link href="/creations" onClick={() => setEnded(false)}>
								<AiOutlineCloseCircle className="text-white text-3xl cursor-pointer" />
							</Link>
						</div>
						<p className="text-white font-thin mb-4 text-center">{texts.formLang[lang]}</p>
						<div className="flex flex-wrap justify-center items-center gap-4 mb-4">
							{relatedLangs.map((lang, index) => (
								<Image
									key={index}
									onClick={() => {
										setIsOpen((prev) => !prev)
										getVidLang(lang.tag)
									}}
									className="hover:cursor-pointer"
									src={lang.pic}
									alt={lang.name}
									width="30"
									height="30"
								/>
							))}
						</div>
						<div className="flex flex-col justify-center items-center gap-4">
							<Link href="/contact">
								<input
									className="hover:bg-[#111111] text-white text-sm px-8 py-3 cursor-pointer shadow hover:shadow-none transition-all duration-300 border-black border-2"
									type="button"
									value={texts.infos[lang]}
								/>
							</Link>
							<div className="relative flex justify-center items-center">
								<Image src={logo} alt="Logo Marc Maison" className="w-[20vh]" width="50" height="50" />
								<IoMdRefreshCircle
									className="bg-white rounded-full text-[#a87e2d] absolute text-gold text-[5vh] cursor-pointer opacity-90"
									onClick={() => {
										setEnded(false)
										setReplay(Math.random() * (10 - 1) + 1)
									}}
								/>
							</div>
							<Link href="mailto:marcmaison@gmail.com?subject=Report condition">
								<input
									className="hover:bg-[#111111] text-white text-sm px-8 py-3 cursor-pointer shadow hover:shadow-none transition-all duration-300 border-black border-2"
									type="button"
									value={texts.report[lang]}
								/>
							</Link>
						</div>
						<div className="flex justify-center items-center mt-4 gap-12">
							<div className="flex flex-col items-center">
								<Image src={cnes} alt="expert CNES" width="50" height="50" />
								<p className="text-white text-sm text-center">Expert auprès du CNES</p>
							</div>
							<div className="flex flex-col items-center">
								<Image src={cefa} alt="expert CEFA" width="40" height="40" />
								<p className="text-white text-sm text-center">Expert auprès du CNES</p>
							</div>
						</div>
					</div>
				</motion.div>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.25 }}
						className="absolute top-0 w-full h-full z-30 flex flex-col gap-10 justify-center items-center bg-black bg-opacity-80">
						<AiOutlineCloseCircle className="text-white text-3xl cursor-pointer mb-4" onClick={() => setIsOpen(false)} />
						<div className="flex flex-wrap justify-center items-center gap-4">
							{currentProduct && (
								<motion.div
									initial={{ y: "50%", opacity: 0, scale: 0.5 }}
									animate={{ y: 0, opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, ease: "easeOut" }}
									exit={{ opacity: 0, scale: 0.1 }}>
									<Link target="_blank" href={`https://res.cloudinary.com/amircloud/video/upload/marc/${currentProduct?.slugfr?.current.replace(/-mob/g, "")}${currentLang}-mob.mp4`}>
										<div className="h-[100px] w-[100px] overflow-hidden">
											<Image
												className="h-full bg-gradient-to-r from-gray-200 to-gray-500 w-full object-contain hover:scale-105 transition-all duration-1000"
												src={urlFor(currentProduct?.image)?.url()}
												alt="Image produit"
												width="100"
												height="100"
												loader={imageLoader}
												placeholder={<ImgLoader />}
											/>
										</div>
									</Link>
								</motion.div>
							)}
							{related.map(
								(product, index) =>
									product.slugfr.current !== currentProduct?.slugfr?.current && (
										<motion.div
											key={index}
											initial={{ y: "50%", opacity: 0, scale: 0.5 }}
											animate={{ y: 0, opacity: 1, scale: 1 }}
											transition={{ duration: 0.5, ease: "easeOut" }}
											exit={{ opacity: 0, scale: 0.1 }}>
											<Link target="_blank" href={`https://res.cloudinary.com/amircloud/video/upload/marc/${product.slugfr.current.replace(/-mob/g, "")}${currentLang}-mob.mp4`}>
												<div className="h-[100px] w-[100px] overflow-hidden">
													<Image
														className="h-full bg-gradient-to-r from-gray-200 to-gray-500 w-full object-contain hover:scale-105 transition-all duration-1000"
														src={urlFor(product.image).url()}
														alt="Image produit"
														width="100"
														height="100"
														loader={imageLoader}
														placeholder={<ImgLoader />}
													/>
												</div>
											</Link>
										</motion.div>
									)
							)}
						</div>
					</motion.div>
				)}
			</div>
			<div className="hidden md:block">
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.25 }}
					className="absolute top-0 w-full h-full z-20 flex justify-center items-center bg-layout">
					<div className="w-fit h-fit p-12 bg-layout">
						<div>
							<div className="flex flex-col justify-center items-center">
								<h1 className="mb-0 pb-0 text-[2rem] text-gray-200 pt-6 px-6 font-bodoni tracking-wide">Galerie Marc Maison</h1>
								<h2 className="font-splash text-[#c49d50] text-[1.3rem] tracking-wide pb-4 text-gold">- 19ème -</h2>
								<Link href="/creations" onClick={() => setEnded(false)} className="absolute right-[50px] top-0">
									<AiOutlineCloseCircle className="text-white text-3xl cursor-pointer mt-12 mb-4" />
								</Link>
							</div>
						</div>
						<p className="text-white font-thin mb-4 text-center">{texts.formLang[lang]}</p>

						<div className="flex flex-wrap justify-center items-center gap-4 mb-4">
							{relatedLangs.map((lang, index) => (
								<Image
									key={index}
									onClick={() => {
										setIsOpen((prev) => !prev)
										getVidLang(lang.tag)
									}}
									className="hover:cursor-pointer"
									src={lang.pic}
									alt={lang.name}
									width="60"
									height="60"
								/>
							))}
						</div>
						<div className="flex flex-col justify-center items-center gap-4">
							<Link href="/contact">
								<input
									className="hover:bg-[#111111] text-white text-sm px-8 py-4 cursor-pointer shadow hover:shadow-none transition-all duration-300 border-black border-2"
									type="button"
									value={texts.infos[lang]}
								/>
							</Link>
							<div className="relative flex justify-center items-center">
								<Image src={logo} alt="Logo Marc Maison" />
								<IoMdRefreshCircle
									className="bg-white rounded-full text-[#a87e2d] absolute text-gold text-8xl cursor-pointer opacity-90"
									onClick={() => {
										setEnded(false)
										setReplay(Math.random() * (10 - 1) + 1)
									}}
								/>
							</div>
							<Link href="mailto:marcmaison@gmail.com?subject=Report condition">
								<input
									className="hover:bg-[#111111] text-white text-sm px-8 py-4 cursor-pointer shadow hover:shadow-none transition-all duration-300 border-black border-2"
									type="button"
									value={texts.report[lang]}
								/>
							</Link>
						</div>
						<div className="flex justify-center items-center mt-12 gap-12">
							<div className="flex flex-col items-center">
								<Image src={cnes} alt="expert CNES" width="80" height="80" />
								<p className="text-white text-center">Expert auprès du CNES</p>
							</div>
							<div className="flex flex-col items-center">
								<Image src={cefa} alt="expert CEFA" width="60" height="60" />
								<p className="text-white text-center">Expert auprès du CNES</p>
							</div>
						</div>
						<div className="flex justify-center">
							<hr className="w-3/4 mt-6 mb-2" />
						</div>
						<div className="flex justify-between gap-4 mt-4  text-gray-300">
							<div className="flex flex-col justify-center items-center">
								<div className="text-xs text-center font-bold">Boutique des cheminées</div>
								<p className="text-xs text-center">120, rue des Rosiers, 93400 Saint Ouen</p>
							</div>
							<div className="flex flex-col justify-center items-center">
								<div className="text-xs text-center font-bold">Galerie Marché Cambo</div>
								<p className="text-xs text-center">75, rue des Rosiers, 93400 Saint Ouen sur Seine</p>
							</div>
							<div className="flex flex-col justify-center items-center">
								<div className="text-xs text-center font-bold">Marché Paul Bert</div>
								<p className="text-xs text-center">Allée 6 Stand 83, 93400 Saint Ouen sur Seine</p>
							</div>
							<div className="flex flex-col justify-center items-center">
								<div className="text-xs text-center font-bold">Marché Cambo La Roseraie</div>
								<p className="text-xs text-center">73, rue des Rosiers, 93400 Saint Ouen sur Seine</p>
							</div>
						</div>
					</div>
				</motion.div>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.25 }}
						className="absolute top-0 w-full h-full z-30 flex flex-col justify-center items-center bg-black bg-opacity-50">
						<AiOutlineCloseCircle className="text-white text-3xl cursor-pointer mb-4" onClick={() => setIsOpen(false)} />

						<div className="flex flex-wrap justify-center items-center gap-10">
							{currentProduct && (
								<motion.div
									initial={{ y: "50%", opacity: 0, scale: 0.5 }}
									animate={{ y: 0, opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, ease: "easeOut" }}
									exit={{ opacity: 0, scale: 0.1 }}
									className="mb-8">
									<Link target="_blank" href={`https://res.cloudinary.com/amircloud/video/upload/marc/${currentProduct.slugfr.current}${currentLang}.mp4`}>
										<div className="h-[200px] w-[200px] overflow-hidden">
											<Image
												className="h-full bg-gradient-to-r from-gray-200 to-gray-500 w-full object-contain hover:scale-105 transition-all duration-1000"
												src={urlFor(currentProduct.image).url()}
												alt="Image produit"
												width="100"
												height="100"
												loader={imageLoader}
												placeholder={<ImgLoader />}
											/>
											<div className="absolute w-[200px] bg-black bg-opacity-50 p-[10px] shadow ellipse2 px-4 font-thin">
												<h2 className="ellipse2 text-center text-white px-4 font-thin ">{currentProduct.title[lang] || currentProduct.title.en}</h2>
											</div>
										</div>
									</Link>
								</motion.div>
							)}
							{related.map(
								(product, index) =>
									product.slugfr.current != currentProduct?.slugfr?.current && (
										<motion.div
											key={index}
											initial={{ y: "50%", opacity: 0, scale: 0.5 }}
											animate={{ y: 0, opacity: 1, scale: 1 }}
											transition={{ duration: 0.5, ease: "easeOut" }}
											exit={{ opacity: 0, scale: 0.1 }}
											className="mb-8">
											<Link target="_blank" href={`https://res.cloudinary.com/amircloud/video/upload/marc/${product.slugfr.current}${currentLang}.mp4`}>
												<div className="h-[200px] w-[200px] overflow-hidden">
													<Image
														className="h-full bg-gradient-to-r from-gray-200 to-gray-500 w-full object-contain hover:scale-105 transition-all duration-1000"
														src={urlFor(product.image).url()}
														alt="Image produit"
														width="100"
														height="100"
														loader={imageLoader}
														placeholder={<ImgLoader />}
													/>
													<div className="absolute w-[200px] bg-black bg-opacity-50 p-[10px] shadow ellipse2 px-4 font-thin">
														<h2 className="ellipse2 text-center text-white px-4 font-thin ">{product.title[lang] || product.title.en}</h2>
													</div>
												</div>
											</Link>
										</motion.div>
									)
							)}
						</div>
					</motion.div>
				)}
			</div>
		</>
	)
}

export default EndCard
