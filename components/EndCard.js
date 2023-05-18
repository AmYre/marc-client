import React, { useState, useEffect } from "react"
import { useGlobalContext } from "../components/GlobalContext"
import { sanityClient } from "../lib/sanityClient"

import imageUrlBuilder from "@sanity/image-url"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

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
	const { lang, setLang, texts, setTexts, ended, setEnded } = useGlobalContext()

	const [isOpen, setIsOpen] = useState(false)
	const [products, setProducts] = useState()
	const [related, setRelated] = useState()
	const [current, setCurrent] = useState()

	let relatedLangs = [
		{ name: "netherland", pic: flagpb, tag: "pb", mobtag: "mob-pb" },
		{ name: "polish", pic: flagpo, tag: "po", mobtag: "mob-po" },
		{ name: "korean", pic: flagkr, tag: "kr", mobtag: "mob-kr" },
		{ name: "arabic", pic: flagar, tag: "ar", mobtag: "mob-ar" },
		{ name: "japanese", pic: flagjp, tag: "jp", mobtag: "mob-jp" },
		{ name: "italian", pic: flagit, tag: "it", mobtag: "mob-it" },
		{ name: "turkish", pic: flagtu, tag: "tu", mobtag: "mob-tu" },
		{ name: "russian", pic: flagru, tag: "ru", mobtag: "mob-ru" },
	]

	const getVids = async () => {
		setProducts(await sanityClient.fetch(`*[_type == "products"]`))
	}

	const getVidLang = async (lang) => {
		setCurrent(lang)
		console.log(products.filter((product) => product.variants && product.variants.includes(lang)))
		setRelated(products.filter((product) => product.variants && product.variants.includes(lang)))
	}

	useEffect(() => {
		getVids()
	}, [])

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" })

	const urlFor = (source) => {
		return imageBuilder.image(source)
	}

	return (
		<>
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.25 }}
				className="absolute top-0 w-full h-full z-20 flex justify-center items-center bg-layout">
				<div className="w-fit h-fit p-12 bg-layout">
					<div className="flex justify-end">
						<AiOutlineCloseCircle className="text-white text-3xl cursor-pointer mb-4" onClick={() => setEnded(false)} />
					</div>
					<p className="text-white font-thin mb-4 text-center">{texts.formLang[lang]}</p>
					<div className="md:hidden">
						<div className="flex flex-wrap justify-center items-center gap-4 mb-4">
							{relatedLangs.map((lang) => (
								<Image
									onClick={() => {
										setIsOpen((prev) => !prev)
										getVidLang(lang.mobtag)
									}}
									className="hover:cursor-pointer"
									src={lang.pic}
									alt={lang.name}
									width="60"
									height="60"
								/>
							))}
						</div>
					</div>
					<div className="hidden md:block">
						<div className="flex flex-wrap justify-center items-center gap-4 mb-4">
							{relatedLangs.map((lang) => (
								<Image
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
							<IoMdRefreshCircle className="bg-white rounded-full text-[#a87e2d] absolute text-gold text-8xl cursor-pointer opacity-90" onClick={() => setEnded(false)} />
						</div>
						<Link href="mailto:marcmaison@gmail.com?subject=Report condition">
							<input
								className="hover:bg-[#111111] text-white text-sm px-8 py-4 cursor-pointer shadow hover:shadow-none transition-all duration-300 border-black border-2"
								type="button"
								value={texts.report[lang]}
							/>
						</Link>
					</div>
					<>
						<div className="flex justify-center items-center mt-12 gap-12">
							<div className="flex flex-col items-center">
								<Image src={cnes} alt="expert CNES" width="80" height="80" />
								<p className="text-white">Expert auprès du CNES</p>
							</div>
							<div className="flex flex-col items-center">
								<Image src={cefa} alt="expert CEFA" width="60" height="60" />
								<p className="text-white">Expert auprès du CNES</p>
							</div>
						</div>
					</>
				</div>
			</motion.div>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.25 }}
					className="absolute top-0 w-full h-full z-30 flex justify-center items-center bg-black bg-opacity-50">
					<div className="flex justify-end">
						<AiOutlineCloseCircle className="text-white text-3xl cursor-pointer mb-4" onClick={() => setIsOpen(false)} />
					</div>
					{related.map((product, index) => (
						<motion.div
							key={index}
							initial={{ y: "50%", opacity: 0, scale: 0.5 }}
							animate={{ y: 0, opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							exit={{ opacity: 0, scale: 0.1 }}>
							<Link key={index} href={`https://res.cloudinary.com/amircloud/video/upload/marc/${product.slugfr.current}-${current}.mp4`}>
								<div className="w-full overflow-hidden ">
									<figure className="mb-8 bg-gradient-to-r from-gray-200 to-gray-500">
										<Image className="hover:scale-105 transition-all duration-1000" src={urlFor(product.image).url()} alt="Image produit" width="300" height="300" />
										<figcaption className="w-full bg-black bg-opacity-50 py-[10px] shadow ellipse2 px-4 font-thin ">
											<h2 className="ellipse2 px-4 font-thin text-white" key={product.title.en}>
												{product.title[lang] ? product.title[lang] : product.title.en}
											</h2>
										</figcaption>
									</figure>
								</div>
							</Link>
						</motion.div>
					))}
				</motion.div>
			)}
		</>
	)
}

export default EndCard
