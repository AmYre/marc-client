import React, { useState, useEffect, useMemo, useRef } from "react";
import { useGlobalContext } from "../components/GlobalContext";
import { CloudinaryContext } from "cloudinary-react";
import Image from "next/image";
import Head from "next/head";
import { sanityClient } from "../lib/sanityClient";
import { PortableText } from "@portabletext/react";

import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { MdEuro } from "react-icons/md";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { BsTranslate } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";

import Nav from "../components/Nav";
import NavBar from "../components/NavBar";
import EndCard from "../components/EndCard";
import { MutatingDots } from "react-loader-spinner";

import logo from "../public/logo.png";
import flagfr from "../public/fr.png";
import flagen from "../public/en.png";
import flagcn from "../public/cn.png";
import flages from "../public/es.png";
import flagpo from "../public/po.png";
import flagkr from "../public/kr.png";
import flagar from "../public/ar.png";
import flagjp from "../public/jp.png";
import flagit from "../public/it.png";
import flagtu from "../public/tu.png";
import flagru from "../public/ru.png";

const DetailProduct = () => {
	const { lang, setLang, tagLang, setTagLang, ended, setEnded, replay, setReplay, currentProduct, setCurrentProduct, texts, setTexts } = useGlobalContext();
	const [playing, setPlaying] = useState(false);
	const [translate, setTranslate] = useState(false);
	const [isOnce, setIsOnce] = useState(false);
	const vRefDesk = useRef(null);
	const vRefMob = useRef(null);

	const [isLoaded, setIsLoaded] = useState(false);
	const [mobLoaded, setMobLoaded] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [isApple, setIsApple] = useState(false);
	const [localProduct, setLocalProduct] = useState();

	const router = useRouter();
	const slug = router.query.slug;

	const handleSound = () => {
		setPlaying((prev) => !prev);
		vRefDesk.current.muted = !vRefDesk.current.muted;
	};
	const handleMobSound = () => {
		setPlaying((prev) => !prev);
		vRefMob.current.muted = !vRefMob.current.muted;
	};

	const pausePrevVideo = () => {
		if (isDesktop) {
			vRefDesk.current.pause();
		}

		if (isMobile) {
			vRefMob.current.pause();
		}
	};

	const toPlainText = (blocks) => {
		if (blocks) {
			return blocks.map((block) => {
				if (block._type !== "block" || !block.children) {
					return "";
				}
				return block.children.map((child) => child.text).join("");
			});
		}
	};

	useEffect(() => {
		const userAgent = window?.navigator.userAgent;
		if (userAgent.match(/Macintosh|Mac OS X/i)) {
			setIsApple(true);
		} else if (userAgent.match(/iPhone|iPad/i)) {
			setIsApple(true);
		}

		const handleResize = () => {
			setIsDesktop(window.innerWidth >= 1024);
			setIsMobile(window.innerWidth < 1024);
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			if (vRefDesk.current) {
				vRefDesk.current.load();
			}

			if (vRefMob.current) {
				vRefMob.current.load();
			}
		};
	}, []);

	useEffect(() => {
		sanityClient.fetch(`*[_type=="products" && slugfr.current == "${slug?.replace(/-\w{2}$/, "")}" ]{...}`).then((res) => {
			setLocalProduct(res[0]);
		});
	}, [slug]);

	let flags = [
		{ name: "français", pic: flagfr, lang: "fr", tagLang: "", mobtag: "-mob" },
		{ name: "english", pic: flagen, lang: "en", tagLang: "-en", mobtag: "-en-mob" },
		{ name: "chinese", pic: flagcn, lang: "cn", tagLang: "-cn", mobtag: "-cn-mob" },
		{ name: "spanish", pic: flages, lang: "es", tagLang: "-es", mobtag: "-es-mob" },
		{ name: "polish", pic: flagpo, lang: "po", tagLang: "-po", mobtag: "-po-mob" },
		{ name: "korean", pic: flagkr, lang: "kr", tagLang: "-kr", mobtag: "-kr-mob" },
		{ name: "arabic", pic: flagar, lang: "ar", tagLang: "-ar", mobtag: "-ar-mob" },
		{ name: "japanese", pic: flagjp, lang: "jp", tagLang: "-jp", mobtag: "-jp-mob" },
		{ name: "italian", pic: flagit, lang: "it", tagLang: "-it", mobtag: "-it-mob" },
		{ name: "turkish", pic: flagtu, lang: "tu", tagLang: "-tu", mobtag: "-tu-mob" },
		{ name: "russian", pic: flagru, lang: "ru", tagLang: "-ru", mobtag: "-ru-mob" },
	];

	const videoDesktop = useMemo(
		() =>
			slug &&
			isDesktop && (
				<video
					key={replay}
					ref={vRefDesk}
					className="h-screen w-full"
					autoPlay
					preload="auto"
					playsInline
					muted
					onEnded={() => {
						setEnded(true);
						setPlaying(false);
					}}
					onCanPlay={() => setIsLoaded(true)}
					poster={{ startOffset: "0" }}
				>
					<source src={`https://res.cloudinary.com/amircloud/video/upload/f_auto,q_auto/marc/${slug}.mp4`} type="video/mp4" />
					<source src={`https://res.cloudinary.com/amircloud/video/upload/f_auto,q_auto:low/marc/${slug}.webm`} type="video/webm" />
				</video>
			),
		[lang, slug, replay, isDesktop]
	);

	const videoMobile = useMemo(
		() =>
			slug &&
			isMobile && (
				<video
					key={replay}
					ref={vRefMob}
					className="h-screen w-full"
					autoPlay
					preload="auto"
					playsInline
					muted
					onEnded={() => {
						setEnded(true);
						setPlaying(false);
					}}
					onCanPlayThrough={() => {
						setMobLoaded(true);
						console.log("first");
					}}
					onCanPlay={() => {
						console.log("second");
						setMobLoaded(true);
					}}
					poster={{ startOffset: "0" }}
				>
					<source src={`https://res.cloudinary.com/amircloud/video/upload/f_auto:video,q_auto/marc/${slug}-mob.mp4`} type="video/mp4" />
					<source src={`https://res.cloudinary.com/amircloud/video/upload/f_auto:video,q_auto:low/marc/${slug}-mob.webm`} type="video/webm" />
				</video>
			),
		[lang, slug, replay, isMobile]
	);

	return (
		<main className="bg-black">
			<Head>
				<title>MarcMaison.Art | {currentProduct ? currentProduct.slugfr.current : router?.query?.slug}</title>
				<meta name="description" content={localProduct ? toPlainText(localProduct.description[lang]) : router?.query?.slug} />
				<meta name="keywords" content={`Marc Maison 19ème, Oeuvres 19ème, ${currentProduct ? currentProduct.slugfr.current : router?.query?.slug}`} />
				<meta name="author" content="Galerie Marc Maison" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="canonical" href={router?.query?.slug} hrefLang="fr" />
				<meta property="og:title" content={`MarcMaisonArt | ${currentProduct ? currentProduct.slugfr.current : router?.query?.slug}`} />
				<meta property="og:description" content={localProduct ? toPlainText(localProduct.description[lang]) : router?.query?.slug} />
				<meta property="og:image" content="./logo.png" />
			</Head>
			<div className="lg:hidden">
				<NavBar />
			</div>

			<div className="absolute -z-20 text-xs">
				<PortableText value={localProduct?.description[lang]} />
			</div>

			<div key={slug} className="lg:hidden">
				{!mobLoaded && (
					<div className="h-screen w-full bg-layout text-white flex justify-center items-center">
						<div className="flex flex-col justify-center items-center">
							<Image src={logo} alt="Logo Marc Maison" className="w-[20vh]" width="150" height="150" />
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
							<p>Your video is loading...</p>
						</div>
					</div>
				)}

				<CloudinaryContext cloud_name="amircloud" secure={true}>
					{videoMobile}
				</CloudinaryContext>

				<AnimatePresence>{ended && <EndCard />}</AnimatePresence>
			</div>
			<nav className="hidden lg:block absolute text-white z-10 top-12 left-12 ">
				<Nav isProduct />
			</nav>

			<div key={slug + slug} className="hidden lg:block">
				{!isLoaded && (
					<div className="h-screen w-full bg-layout text-white flex justify-center items-center">
						<div className="flex flex-col justify-center items-center">
							<Image src={logo} alt="Logo Marc Maison" className="w-[20vh]" width="150" height="150" />
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
							<p>Your video is loading...</p>
						</div>
					</div>
				)}

				<CloudinaryContext cloud_name="amircloud" secure={true}>
					{videoDesktop}
				</CloudinaryContext>
				<AnimatePresence>{ended && <EndCard />}</AnimatePresence>
			</div>
			<div className="lg:hidden flex flex-col gap-3 absolute bottom-10 right-10 items-center">
				{!translate && !isOnce && <p className="absolute top-[-25px] text-white text-center text-xl font-bodoni">{texts.btnLang[lang]}</p>}
				<div
					className="w-[50px] h-[50px] m-auto bg-yellow rounded-full border-2 p-2 opacity-95 flex items-center justify-center"
					onClick={() => {
						setTranslate((prev) => !prev);
						setIsOnce(true);
					}}
				>
					<BsTranslate className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
				</div>
				<div className="w-[50px] h-[50px] m-auto bg-white rounded-full border-2 border-amber-500 p-2 opacity-95 flex items-center justify-center">
					<MdEuro
						onClick={() => {
							setEnded(true);
							setPlaying(false);
							isDesktop ? (vRefDesk.current.muted = true) : (vRefMob.current.muted = true);
						}}
						className="text-2xl text-amber-700 hover:scale-110 transition-all duration-300 cursor-pointer"
					/>
				</div>
				<motion.button
					onClick={() => mobLoaded && handleMobSound()}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					animate={{ scale: playing ? 1 : [1.1, 1] }}
					transition={playing ? { duration: 0.3 } : { duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
				>
					{!playing ? (
						<div className="w-[60px] h-[60px] m-auto bg-yellow rounded-full border-2 border-white p-2 opacity-95 flex items-center justify-center">
							<GiSpeakerOff role="button" aria-label="Sound" className="text-3xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
						</div>
					) : (
						<div className="w-[60px] h-[60px] m-auto bg-yellow rounded-full border-2 border-white p-2 opacity-95 flex items-center justify-center">
							<GiSpeaker role="button" aria-label="Sound" className="text-3xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
						</div>
					)}
				</motion.button>
				{!playing && <p className="absolute bottom-[-20px] text-white text-center text-xl font-bodoni">{texts.btnSound[lang]}</p>}
				{isApple ? (
					<AnimatePresence>
						{translate && (
							<motion.div
								className="absolute w-[60vw] right-[80px] bottom-0 top-0 p-3 flex flex-wrap justify-center items-center gap-3 bg-layout bg-opacity-70"
								initial={{ x: "10px", opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ duration: 0.5, ease: "easeOut" }}
								exit={{ x: "10px", opacity: 0 }}
							>
								{flags.map((flag, index) => (
									<div className="relative flex flex-col justify-center items-center mb-1 mt-1" key={index}>
										<Image
											onClick={() => {
												setTagLang(flag.tagLang);
												router.push(
													`https://res.cloudinary.com/amircloud/video/upload/f_auto:video,q_auto/marc/${
														currentProduct ? currentProduct.slugfr.current : router?.query?.slug?.replace(/-\w{2}$/, "") + flag.mobtag
													}.mp4`
												);
											}}
											className="hover:cursor-pointer transition-all duration-300"
											src={flag.pic}
											alt={flag.name}
											width="35"
											height="35"
										/>
										{tagLang == flag.tagLang && (
											<motion.div
												initial={{ y: "50%", opacity: 0, scale: 0.5 }}
												animate={{ y: 0, opacity: 1, scale: 1 }}
												transition={{ duration: 0.5, ease: "easeOut" }}
												exit={{ opacity: 0, scale: 0.1 }}
												className="absolute top-[30px] w-[8px] h-[8px] bg-white rounded-full"
											></motion.div>
										)}
									</div>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				) : (
					<AnimatePresence>
						{translate && (
							<motion.div
								className="absolute w-[60vw] right-[80px] bottom-0 top-0 p-3 flex flex-wrap justify-center items-center gap-3 bg-layout bg-opacity-70"
								initial={{ x: "10px", opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ duration: 0.5, ease: "easeOut" }}
								exit={{ x: "10px", opacity: 0 }}
							>
								{flags.map((flag, index) => (
									<div className="relative flex flex-col justify-center items-center mb-1 mt-1" key={index}>
										<Image
											onClick={() => {
												setTagLang(flag.tagLang);
												setPlaying(false);
												setMobLoaded(false);
												pausePrevVideo();
												router.push(currentProduct ? currentProduct.slugfr.current : router?.query?.slug?.replace(/-\w{2}$/, "") + flag.tagLang);
											}}
											className="hover:cursor-pointer transition-all duration-300"
											src={flag.pic}
											alt={flag.name}
											width="35"
											height="35"
										/>
										{tagLang == flag.tagLang && (
											<motion.div
												initial={{ y: "50%", opacity: 0, scale: 0.5 }}
												animate={{ y: 0, opacity: 1, scale: 1 }}
												transition={{ duration: 0.5, ease: "easeOut" }}
												exit={{ opacity: 0, scale: 0.1 }}
												className="absolute top-[30px] w-[8px] h-[8px] bg-white rounded-full"
											></motion.div>
										)}
									</div>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				)}
			</div>
			<div className="hidden lg:block">
				<div className="flex gap-3 absolute bottom-10 right-10 items-center">
					{!playing && (
						<motion.button animate={{ scale: [1, 1.01, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} className="absolute bottom-0 right-0">
							<p className="absolute right-[220px] bottom-[160px] text-white text-center text-xl font-bodoni">{texts.btnSound[lang]}</p>

							<svg className="drarrow drastroke absolute bottom-0 right-32 scale-[.6]" version="1.1" x="0px" y="0px" viewBox="0 0 43.1 85.9">
								<path strokeLinecap="round" strokeLinejoin="round" className="st0 draw-arrow" d="M11.3,2.5c-5.8,5-8.7,12.7-9,20.3s2,15.1,5.3,22c6.7,14,18,25.8,31.7,33.1" />
								<path strokeLinecap="round" strokeLinejoin="round" className="draw-arrow tail-1" d="M40.6,78.1C39,71.3,37.2,64.6,35.2,58" />
								<path strokeLinecap="round" strokeLinejoin="round" className="draw-arrow tail-2" d="M39.8,78.5c-7.2,1.7-14.3,3.3-21.5,4.9" />
							</svg>
							<svg className="drarrow absolute bottom-0 right-32  scale-[.6]" version="1.1" x="0px" y="0px" viewBox="0 0 43.1 85.9">
								<path strokeLinecap="round" strokeLinejoin="round" className="st0 draw-arrow" d="M11.3,2.5c-5.8,5-8.7,12.7-9,20.3s2,15.1,5.3,22c6.7,14,18,25.8,31.7,33.1" />
								<path strokeLinecap="round" strokeLinejoin="round" className="draw-arrow tail-1" d="M40.6,78.1C39,71.3,37.2,64.6,35.2,58" />
								<path strokeLinecap="round" strokeLinejoin="round" className="draw-arrow tail-2" d="M39.8,78.5c-7.2,1.7-14.3,3.3-21.5,4.9" />
							</svg>
						</motion.button>
					)}
					<div className="flex flex-col">
						<motion.button
							onClick={() => isLoaded && handleSound()}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							animate={{ scale: playing ? 1 : [1.1, 1] }}
							transition={playing ? { duration: 0.3 } : { duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
						>
							{!playing ? (
								<div className="w-[60px] h-[60px] m-auto bg-yellow rounded-full border-2 border-white p-2 opacity-95 flex items-center justify-center">
									<GiSpeakerOff role="button" aria-label="Sound" className="text-3xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
								</div>
							) : (
								<div className="w-[60px] h-[60px] m-auto bg-yellow rounded-full border-2 border-white p-2 opacity-95 flex items-center justify-center">
									<GiSpeaker role="button" aria-label="Sound" className="text-3xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
								</div>
							)}
						</motion.button>
					</div>
					<div className="flex flex-col">
						<div className="w-[50px] h-[50px] m-auto bg-white rounded-full border-2 border-amber-500 p-2 opacity-95 flex flex-col items-center justify-center">
							<MdEuro
								onClick={() => {
									setEnded(true);
									setPlaying(false);
									isDesktop ? (vRefDesk.current.muted = true) : (vRefMob.current.muted = true);
								}}
								className="text-2xl text-amber-600 hover:scale-110 transition-all duration-300 cursor-pointer"
							/>
						</div>
					</div>
					<div className="flex flex-col">
						{!translate && !isOnce && (
							<motion.div animate={{ scale: [1, 1.01, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} className="absolute bottom-0 right-0">
								<div className="absolute bottom-[145px] right-[30px] text-white text-center text-xl font-bodoni">{texts.btnLang[lang]}</div>

								<svg className="drarrow drastroke absolute bottom-0 right-[-40px] scale-[.4]" version="1.1" x="0px" y="0px" viewBox="0 0 43.1 85.9">
									<path strokeLinecap="round" strokeLinejoin="round" className="st0 draw-arrow" d="M11.3,2.5c-5.8,5-8.7,12.7-9,20.3s2,15.1,5.3,22c6.7,14,18,25.8,31.7,33.1" />
									<path strokeLinecap="round" strokeLinejoin="round" className="draw-arrow tail-1" d="M40.6,78.1C39,71.3,37.2,64.6,35.2,58" />
									<path strokeLinecap="round" strokeLinejoin="round" className="draw-arrow tail-2" d="M39.8,78.5c-7.2,1.7-14.3,3.3-21.5,4.9" />
								</svg>
								<svg className="drarrow absolute bottom-0 right-[-40px] scale-[.4]" version="1.1" x="0px" y="0px" viewBox="0 0 43.1 85.9">
									<path strokeLinecap="round" strokeLinejoin="round" className="st0 draw-arrow" d="M11.3,2.5c-5.8,5-8.7,12.7-9,20.3s2,15.1,5.3,22c6.7,14,18,25.8,31.7,33.1" />
									<path strokeLinecap="round" strokeLinejoin="round" className="draw-arrow tail-1" d="M40.6,78.1C39,71.3,37.2,64.6,35.2,58" />
									<path strokeLinecap="round" strokeLinejoin="round" className="draw-arrow tail-2" d="M39.8,78.5c-7.2,1.7-14.3,3.3-21.5,4.9" />
								</svg>
							</motion.div>
						)}
						<div
							className="w-[50px] h-[50px] m-auto bg-yellow rounded-full border-2 p-2 opacity-95 flex items-center justify-center"
							onClick={() => {
								setTranslate((prev) => !prev);
								setIsOnce(true);
							}}
						>
							<BsTranslate className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
						</div>
					</div>
					<AnimatePresence>
						{translate && (
							<motion.div
								className="absolute left-0 bottom-[80px] p-4 flex flex-wrap justify-center items-center gap-3 bg-layout bg-opacity-70"
								initial={{ x: "10px", opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ duration: 0.5, ease: "easeOut" }}
								exit={{ x: "10px", opacity: 0 }}
							>
								{flags.map((flag, index) => (
									<div className="relative flex flex-col justify-center items-center mb-2 mt-2" key={index}>
										<Image
											onClick={() => {
												setTagLang(flag.tagLang);
												setPlaying(false);
												setIsLoaded(false);
												pausePrevVideo();
												router.push(currentProduct ? currentProduct.slugfr.current : router?.query?.slug?.replace(/-\w{2}$/, "") + flag.tagLang);
											}}
											className="hover:cursor-pointer transition-all duration-300"
											src={flag.pic}
											alt={flag.name}
											width="30"
											height="30"
										/>
										{tagLang == flag.tagLang && (
											<motion.div
												initial={{ y: "50%", opacity: 0, scale: 0.5 }}
												animate={{ y: 0, opacity: 1, scale: 1 }}
												transition={{ duration: 0.5, ease: "easeOut" }}
												exit={{ opacity: 0, scale: 0.1 }}
												className="absolute top-[30px] w-[8px] h-[8px] bg-white rounded-full"
											></motion.div>
										)}
									</div>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</main>
	);
};

export default DetailProduct;
