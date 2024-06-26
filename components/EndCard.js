import React, { useRef, useState, useEffect } from "react";
import { useGlobalContext } from "../components/GlobalContext";
import { sanityClient } from "../lib/sanityClient";
import { useRouter } from "next/router";
import imageUrlBuilder from "@sanity/image-url";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";
import { MutatingDots } from "react-loader-spinner";
import TextField from "@mui/material/TextField";
import emailjs from "@emailjs/browser";

import ImgLoader from "./ImgLoader";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { TiRefresh } from "react-icons/ti";
import { TiArrowBack } from "react-icons/ti";

import cnes from "../public/cnes.png";
import cefa from "../public/cefa.png";
import flages from "../public/es.png";
import flagpo from "../public/po.png";
import flagkr from "../public/kr.png";
import flagar from "../public/ar.png";
import flagjp from "../public/jp.png";
import flagit from "../public/it.png";
import flagtu from "../public/tu.png";
import flagru from "../public/ru.png";
import logo from "../public/logo.png";

const EndCard = () => {
	const { lang, setLang, texts, setTexts, ended, setEnded, replay, setReplay, currentProduct, setCurrentProduct } = useGlobalContext();

	const [isOpen, setIsOpen] = useState(false);
	const [products, setProducts] = useState();
	const [related, setRelated] = useState();
	const [currentLang, setCurrentLang] = useState();
	const [sent, setSent] = useState();
	const [dialog, setDialog] = useState(false);
	const [delay, setDelay] = useState(false);
	const form = useRef();
	const myDialog = useRef();
	const myMobDialog = useRef();

	const router = useRouter();
	const url = router.query.slug;

	const imageLoader = ({ src, width, quality }) => {
		return `${src}?w=${width}&q=${quality || 75}`;
	};

	let relatedLangs = [
		{ name: "spanish", pic: flages, tag: "-es" },
		{ name: "polish", pic: flagpo, tag: "-po" },
		{ name: "korean", pic: flagkr, tag: "-kr" },
		{ name: "arabic", pic: flagar, tag: "-ar" },
		{ name: "japanese", pic: flagjp, tag: "-jp" },
		{ name: "italian", pic: flagit, tag: "-it" },
		{ name: "turkish", pic: flagtu, tag: "-tu" },
		{ name: "russian", pic: flagru, tag: "-ru" },
	];

	const getVids = async () => {
		const products = await sanityClient.fetch(`*[_type == "products"]`);
		setProducts(products);
		return products;
	};

	const getVidLang = async (lang) => {
		setCurrentLang(lang);
		setRelated(products.filter((product) => product.variants && product.variants.includes(lang)));
	};

	useEffect(() => {
		getVids().then((products) => {
			setCurrentProduct(products.filter((product) => product.slugfr.current == url?.replace(/-\w{2}$/, ""))[0]);
		});
	}, []);

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" });

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	const sendEmail = (e) => {
		setSent(true);
		setDelay(true);
		setTimeout(() => {
			setDelay(false);
		}, 2000);
		e.preventDefault();

		emailjs.sendForm("service_kmun1ds", "template_kzoezx5", form.current, "mI6zt6KbO8qA65ye9").then(
			(result) => {
				console.log("Mail sent : ", result.text);
			},
			(error) => {
				console.log("Mail error : ", error.text);
			}
		);
	};

	return (
		<>
			<div className="md:hidden">
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.25 }}
					className="absolute top-0 w-full h-full z-20 flex justify-around items-center bg-bg"
				>
					<div className="w-screen h-screen flex flex-col justify-around items-center p-12 bg-layout">
						<p className="text-white font-bold mt-6 text-center">{texts.formLang[lang]}</p>
						<div className="flex flex-wrap justify-center items-center gap-4 mb-4">
							{relatedLangs.map((lang, index) => (
								<Image
									key={index}
									onClick={() => {
										myMobDialog.current.showModal();
										getVidLang(lang.tag);
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
							<Link href="/contact?ask=1">
								<input
									className="hover:bg-[#e2b250] bg-secondary text-white px-8 py-3 cursor-pointer shadow hover:shadow-none transition-all duration-300 border-white border-2"
									type="button"
									value={texts.infos[lang]}
								/>
							</Link>
							<div className="relative flex justify-center items-center">
								<Image src={logo} alt="Logo Marc Maison" className="w-[20vh]" width="50" height="50" />
								{ended ? (
									<TiRefresh
										className="bg-white rounded-full text-secondary hover:text-[#e2b250] transition-all duration-300 absolute text-gold text-[10vh] cursor-pointer opacity-90"
										onClick={() => {
											router.reload();
										}}
									/>
								) : (
									<TiArrowBack
										className="bg-white rounded-full text-secondary hover:text-[#e2b250] transition-all duration-300 absolute text-gold text-[5vh] cursor-pointer opacity-90"
										onClick={() => {
											setEnded(false);
										}}
									/>
								)}
							</div>
							<div
								onClick={() => setDialog(true)}
								className="hover:bg-[#e2b250] bg-secondary text-white px-8 py-3 cursor-pointer shadow hover:shadow-none transition-all duration-300 border-white border-2"
							>
								{texts.report[lang]}
							</div>
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
				<dialog ref={myMobDialog} className="bg-layout">
					<AiOutlineCloseCircle onClick={() => myMobDialog.current.close()} className="text-white text-3xl cursor-pointer mt-4 mb-4" />
					<Masonry breakpointCols={1} className="my-masonry-grid pt-8" columnClassName="my-masonry-grid_column">
						{currentProduct && (
							<motion.div
								initial={{ y: "50%", opacity: 0, scale: 0.5 }}
								animate={{ y: 0, opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, ease: "easeOut" }}
								exit={{ opacity: 0, scale: 0.1 }}
							>
								<Link
									target="_blank"
									href={`https://res.cloudinary.com/amircloud/video/upload/f_auto,q_auto/marc/${currentProduct?.slugfr?.current.replace(/-mob/g, "")}${currentLang}-mob.mp4`}
								>
									<div className="overflow-hidden">
										<img
											className="h-full bg-gradient-to-r from-gray-200 to-gray-500 w-full object-contain hover:scale-105 transition-all duration-1000"
											src={urlFor(currentProduct?.image)?.url()}
											alt="Image produit"
											loader={imageLoader}
											placeholder={<ImgLoader />}
										/>
									</div>
								</Link>
							</motion.div>
						)}
						{related?.map(
							(product, index) =>
								product.slugfr.current !== currentProduct?.slugfr?.current && (
									<motion.div
										key={index}
										initial={{ y: "50%", opacity: 0, scale: 0.5 }}
										animate={{ y: 0, opacity: 1, scale: 1 }}
										transition={{ duration: 0.5, ease: "easeOut" }}
										exit={{ opacity: 0, scale: 0.1 }}
									>
										<Link
											target="_blank"
											href={`https://res.cloudinary.com/amircloud/video/upload/f_auto,q_auto/marc/${product.slugfr.current.replace(/-mob/g, "")}${currentLang}-mob.mp4`}
										>
											<div className="overflow-hidden">
												<img
													className="h-full bg-gradient-to-r from-gray-200 to-gray-500 w-full object-contain hover:scale-105 transition-all duration-1000"
													src={urlFor(product.image).url()}
													alt="Image produit"
													loader={imageLoader}
													placeholder={<ImgLoader />}
												/>
											</div>
										</Link>
									</motion.div>
								)
						)}
					</Masonry>
				</dialog>

				{dialog && (
					<motion.dialog
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.25 }}
						className="absolute top-0 w-full h-full z-30 flex justify-center items-center bg-layout"
					>
						<div onClick={() => setDialog(false)} className="absolute top-[10vh]">
							<AiOutlineCloseCircle className="text-white text-3xl cursor-pointer mt-12 mb-4" />
						</div>
						{!sent ? (
							<form ref={form} onSubmit={sendEmail} className="flex flex-col mt-12 mb-12 md:px-16 gap-12">
								<div className="flex gap-12">
									<TextField className="w-full max-w-[400px]" name="user" id="standard-basic" label={texts.formLastname[lang]} variant="standard" required />
								</div>
								<div className="flex gap-12">
									<TextField className="w-full max-w-[400px]" name="mail" id="standard-basic" label={texts.formMail[lang]} variant="standard" required />
								</div>
								<input
									className="bg-secondary w-[200px] hover:cursor-pointer hover:scale-[1.02] hover:shadow-md text-white px-8 py-4 rounded transition-all duration-300"
									type="hidden"
									name="ref"
									value={currentProduct?.title[lang] || currentProduct?.title.en}
								/>
								<TextField className="w-full max-w-[800px]" name="message" id="standard-textarea" label={texts.formMessage[lang]} multiline variant="standard" />
								<input
									className="bg-secondary w-[200px] hover:cursor-pointer hover:scale-[1.02] hover:shadow-md text-white px-8 py-4 rounded transition-all duration-300"
									type="submit"
									value={texts.formSent[lang]}
								/>
							</form>
						) : delay ? (
							<div className="flex justify-center items-center">
								<MutatingDots
									height="100"
									width="100"
									color="white"
									secondaryColor="#a87e2d"
									radius="12.5"
									ariaLabel="mutating-dots-loading"
									wrapperStyle={{}}
									wrapperClass=""
									visible={true}
								/>
							</div>
						) : (
							<motion.div
								className="mt-8 text-white"
								initial={{ y: "50%", opacity: 0, scale: 0.5 }}
								animate={{ y: 0, opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, ease: "easeOut" }}
								exit={{ opacity: 0, scale: 0.1 }}
							>
								{texts.confirm[lang]}
							</motion.div>
						)}
					</motion.dialog>
				)}
			</div>
			<div className="hidden md:block">
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.25 }}
					className="absolute top-0 w-full h-full z-20 flex justify-center items-center bg-layout"
				>
					<div className="w-full h-fit p-12 bg-layout">
						<div>
							<div className="flex flex-col justify-center items-center">
								<h1 className="mb-0 pb-0 text-[2rem] text-gray-200 pt-6 px-6 font-bodoni tracking-wide">Galerie Marc Maison</h1>
								<h2 className="font-splash text-[#c49d50] text-[1.3rem] tracking-wide pb-4 text-gold">- 19ème -</h2>
								<div
									onClick={() => {
										setEnded(false);
									}}
									className="absolute right-[50px] top-0"
								>
									<AiOutlineCloseCircle className="text-white text-3xl cursor-pointer mt-12 mb-4 bg-secondary rounded-full" />
								</div>
							</div>
						</div>
						<p className="text-white text-xl font-thin mb-4 text-center">{texts.formLang[lang]}</p>

						<div className="flex flex-wrap justify-center items-center gap-4 mb-4">
							{relatedLangs.map((lang, index) => (
								<Image
									key={index}
									onClick={() => {
										myDialog.current.showModal();
										getVidLang(lang.tag);
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
							<Link href="/contact?ask=1">
								<input
									className="hover:bg-[#e2b250] bg-secondary text-white px-8 py-4 cursor-pointer shadow hover:shadow-none transition-all duration-300 border-white border-2"
									type="button"
									value={texts.infos[lang]}
								/>
							</Link>
							<div className="relative flex justify-center items-center">
								<Image src={logo} alt="Logo Marc Maison" />
								<Image src={logo} alt="Logo Marc Maison" className="w-[20vh]" width="50" height="50" />
								{ended ? (
									<TiRefresh
										className="bg-white rounded-full text-secondary hover:text-[#e2b250] transition-all duration-300 absolute text-[15vh] cursor-pointer opacity-90"
										onClick={() => {
											router.reload();
										}}
									/>
								) : (
									<TiArrowBack
										className="bg-white rounded-full text-secondary hover:text-[#e2b250] transition-all duration-300 absolute text-gold text-8xl cursor-pointer opacity-90"
										onClick={() => {
											setEnded(false);
										}}
									/>
								)}
							</div>
							<div
								onClick={() => setDialog(true)}
								className="hover:bg-[#e2b250] bg-secondary text-white px-8 py-4 cursor-pointer shadow hover:shadow-none transition-all duration-300 border-white border-2"
							>
								{texts.report[lang]}
							</div>
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

				<dialog ref={myDialog} className="bg-layout">
					<AiOutlineCloseCircle onClick={() => myDialog.current.close()} className="text-white text-3xl cursor-pointer mt-4 mb-4" />
					<Masonry breakpointCols={4} className="my-masonry-grid pt-8" columnClassName="my-masonry-grid_column">
						{currentProduct && (
							<motion.div
								initial={{ y: "50%", opacity: 0, scale: 0.5 }}
								animate={{ y: 0, opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, ease: "easeOut" }}
								exit={{ opacity: 0, scale: 0.1 }}
							>
								<Link target="_blank" href={`https://res.cloudinary.com/amircloud/video/upload/f_auto,q_auto/marc/${currentProduct?.slugfr.current}${currentLang}.mp4`}>
									<div className="overflow-hidden mb-8">
										<img
											className="h-full bg-gradient-to-r from-gray-200 to-gray-500 w-full object-contain hover:scale-105 transition-all duration-1000"
											src={urlFor(currentProduct?.image).url()}
											alt="Image produit"
											loader={imageLoader}
											placeholder={<ImgLoader />}
										/>
										<div className="absolute w-full bg-black bg-opacity-50 p-[10px] shadow ellipse2 font-thin">
											<h2 className="ellipse2 text-center text-white font-thin text-xs">{currentProduct?.title[lang] || currentProduct?.title.en}</h2>
										</div>
									</div>
								</Link>
								<div className="h-6"></div>
							</motion.div>
						)}
						{related?.map(
							(product, index) =>
								product.slugfr.current != currentProduct?.slugfr?.current && (
									<motion.div
										key={index}
										initial={{ y: "50%", opacity: 0, scale: 0.5 }}
										animate={{ y: 0, opacity: 1, scale: 1 }}
										transition={{ duration: 0.5, ease: "easeOut" }}
										exit={{ opacity: 0, scale: 0.1 }}
										className="mb-8"
									>
										<Link target="_blank" href={`https://res.cloudinary.com/amircloud/video/upload/f_auto,q_auto/marc/${product.slugfr.current}${currentLang}.mp4`}>
											<div className="overflow-hidden mb-8">
												<img
													className="h-full bg-gradient-to-r from-gray-200 to-gray-500 w-full object-contain hover:scale-105 transition-all duration-1000"
													src={urlFor(product.image).url()}
													alt="Image produit"
													loader={imageLoader}
													placeholder={<ImgLoader />}
												/>
												<div className="absolute w-full bg-black bg-opacity-50 p-[10px] shadow ellipse2 font-thin">
													<h2 className="ellipse2 text-center text-xs text-white font-thin ">{product?.title[lang] || product.title.en}</h2>
												</div>
											</div>
										</Link>
										<div className="h-[1px]"></div>
									</motion.div>
								)
						)}
					</Masonry>
				</dialog>

				{dialog && (
					<motion.dialog
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.25 }}
						className="absolute top-0 w-full h-full z-30 flex justify-center items-center bg-layout"
					>
						<div onClick={() => setDialog(false)} className="absolute right-[50px] top-0">
							<AiOutlineCloseCircle className="text-white text-3xl cursor-pointer mt-12 mb-4" />
						</div>
						{!sent ? (
							<form ref={form} onSubmit={sendEmail} className="flex flex-col mt-12 mb-12 md:px-16 gap-12">
								<div className="flex gap-12">
									<TextField className="w-full max-w-[400px]" name="user" id="standard-basic" label={texts.formLastname[lang]} variant="standard" required />
								</div>
								<div className="flex gap-12">
									<TextField className="w-full max-w-[400px]" name="mail" id="standard-basic" label={texts.formMail[lang]} variant="standard" required />
								</div>
								<input
									className="bg-secondary w-[200px] hover:cursor-pointer hover:scale-[1.02] hover:shadow-md text-white px-8 py-4 rounded transition-all duration-300"
									type="hidden"
									name="ref"
									value={currentProduct?.title[lang] || currentProduct?.title.en}
								/>
								<TextField className="w-full max-w-[800px]" name="message" id="standard-textarea" label={texts.formMessage[lang]} multiline variant="standard" />
								<input
									className="bg-secondary w-[200px] hover:cursor-pointer hover:scale-[1.02] hover:shadow-md text-white px-8 py-4 rounded transition-all duration-300"
									type="submit"
									value={texts.formSent[lang]}
								/>
							</form>
						) : delay ? (
							<div className="flex justify-center items-center">
								<MutatingDots
									height="100"
									width="100"
									color="white"
									secondaryColor="#a87e2d"
									radius="12.5"
									ariaLabel="mutating-dots-loading"
									wrapperStyle={{}}
									wrapperClass=""
									visible={true}
								/>
							</div>
						) : (
							<motion.div
								className="mt-8 text-white"
								initial={{ y: "50%", opacity: 0, scale: 0.5 }}
								animate={{ y: 0, opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, ease: "easeOut" }}
								exit={{ opacity: 0, scale: 0.1 }}
							>
								{texts.confirm[lang]}
							</motion.div>
						)}
					</motion.dialog>
				)}
			</div>
		</>
	);
};

export default EndCard;
