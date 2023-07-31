import React, { useRef, useEffect, useMemo, useState } from "react";
import { useGlobalContext } from "../components/GlobalContext";

import { motion } from "framer-motion";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";

import Head from "next/head";
import Nav from "../components/Nav";
import NavBar from "../components/NavBar";
import { CloudinaryContext } from "cloudinary-react";

export default function Home() {
	const { lang, texts } = useGlobalContext();
	const [playing, setPlaying] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const vRefHome = useRef(null);
	const vRefHomeMob = useRef(null);

	const handleSound = () => {
		setPlaying((prev) => !prev);
		vRefHome.current.muted = !vRefHome.current.muted;
	};

	const handleSoundMob = () => {
		setPlaying((prev) => !prev);
		vRefHomeMob.current.muted = !vRefHomeMob.current.muted;
	};

	useEffect(() => {
		const userAgent = window.navigator.userAgent;
		const handleResize = () => {
			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
				setIsMobile(true);
			} else {
				setIsDesktop(true);
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
			if (vRefHome.current) {
				vRefHome.current.load();
			}

			if (vRefHomeMob.current) {
				vRefHomeMob.current.load();
			}
		};
	}, []);

	const videoHome = useMemo(
		() =>
			isDesktop && (
				<video
					ref={vRefHome}
					className="h-screen w-full object-cover"
					autoPlay
					playsInline
					muted
					loop
					onEnded={() => {
						setPlaying(false);
					}}
					onCanPlay={() => setIsLoaded(true)}
					poster={{ startOffset: "0" }}
				>
					<source src={`https://res.cloudinary.com/amircloud/video/upload/f_auto,q_auto/marc/home.mp4`} type="video/mp4" />
				</video>
			),
		[isLoaded, isDesktop]
	);

	const videoHomeMob = useMemo(
		() =>
			isMobile && (
				<video
					ref={vRefHomeMob}
					className="h-screen w-full object-cover"
					autoPlay
					playsInline
					muted
					loop
					onEnded={() => {
						setPlaying(false);
					}}
					onCanPlay={() => setIsLoaded(true)}
					poster={{ startOffset: "0" }}
				>
					<source src={`https://res.cloudinary.com/amircloud/video/upload/f_auto,q_auto/marc/home-mob.mp4`} type="video/mp4" />
					<source src="https://res.cloudinary.com/amircloud/video/upload/f_auto,q_auto/marc/home-mob.mp4" type="video/mp4" />
				</video>
			),
		[isLoaded, isMobile]
	);

	console.log(isDesktop, isMobile);

	return (
		<div>
			<Head>
				<title>MarcMaison.Art | Explorez les merveilles de l&apos;art du 19ème siècle sur notre site vidéo dédié</title>
				<meta
					name="description"
					content="Plongez dans une collection captivante de vidéos présentant des chefs-d'œuvre emblématiques de cette période artistique influente. Découvrez les mouvements artistiques, les techniques et les artistes qui ont façonné cette époque dorée de la créativité."
				/>
				<meta name="keywords" content="Marc Maison 19ème, Oeuvres 19ème, Artistes du 19ème siècle, Theodore Deck" />
				<meta name="author" content="Galerie Marc Maison" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="alternate" href="/" hrefLang="x-default" />
				<link rel="alternate" href="/" hrefLang="fr" />
				<meta property="og:title" content="MarcMaison.Art | Explorez les merveilles de l'art du 19ème siècle" />
				<meta
					property="og:description"
					content="Plongez dans une collection captivante de vidéos présentant des chefs-d'œuvre emblématiques de cette période artistique influente. Découvrez les mouvements artistiques, les techniques et les artistes qui ont façonné cette époque dorée de la créativité."
				/>
				<meta property="og:image" content="./logo.png" />
			</Head>
			<main className="">
				<div className="hidden md:block">
					<CloudinaryContext cloud_name="amircloud" secure={true}>
						{videoHome}
					</CloudinaryContext>
				</div>

				<div className="md:hidden">
					<NavBar />
					<CloudinaryContext cloud_name="amircloud" secure={true}>
						{videoHomeMob}
					</CloudinaryContext>
				</div>
				<nav className="hidden md:block absolute text-white z-10 top-12 left-12">
					<Nav vRefHome={vRefHome} vRefHomeMob={vRefHomeMob} />
				</nav>
				<div className="md:hidden">
					<div className="flex gap-3 absolute bottom-10 right-10 items-center">
						<motion.button
							onClick={() => handleSoundMob()}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							animate={{ scale: playing ? 1 : [1.1, 1] }}
							transition={playing ? { duration: 0.3 } : { duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
						>
							{!playing ? (
								<div className="w-[50px] h-[50px] m-auto bg-yellow rounded-full border-2 border-white p-2 opacity-95 flex items-center justify-center">
									<GiSpeakerOff role="button" aria-label="Sound" className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
								</div>
							) : (
								<div className="w-[50px] h-[50px] m-auto bg-yellow rounded-full border-2 border-white p-2 opacity-95 flex items-center justify-center">
									<GiSpeaker role="button" aria-label="Sound" className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
								</div>
							)}
						</motion.button>
					</div>
				</div>
				<div className="hidden md:block">
					<div className="flex gap-3 absolute bottom-10 right-10 items-center">
						{!playing && (
							<div>
								<svg className="drarrow drastroke absolute bottom-0 right-0 scale-[.6]" version="1.1" x="0px" y="0px" viewBox="0 0 43.1 85.9">
									<path strokeLinecap="round" strokeLinejoin="round" className="st0 draw-arrow" d="M11.3,2.5c-5.8,5-8.7,12.7-9,20.3s2,15.1,5.3,22c6.7,14,18,25.8,31.7,33.1" />
									<path strokeLinecap="round" strokeLinejoin="round" className="draw-arrow tail-1" d="M40.6,78.1C39,71.3,37.2,64.6,35.2,58" />
									<path strokeLinecap="round" strokeLinejoin="round" className="draw-arrow tail-2" d="M39.8,78.5c-7.2,1.7-14.3,3.3-21.5,4.9" />
								</svg>
								<svg className="drarrow absolute bottom-0 right-0 scale-[.6]" version="1.1" x="0px" y="0px" viewBox="0 0 43.1 85.9">
									<path strokeLinecap="round" strokeLinejoin="round" className="st0 draw-arrow" d="M11.3,2.5c-5.8,5-8.7,12.7-9,20.3s2,15.1,5.3,22c6.7,14,18,25.8,31.7,33.1" />
									<path strokeLinecap="round" strokeLinejoin="round" className="draw-arrow tail-1" d="M40.6,78.1C39,71.3,37.2,64.6,35.2,58" />
									<path strokeLinecap="round" strokeLinejoin="round" className="draw-arrow tail-2" d="M39.8,78.5c-7.2,1.7-14.3,3.3-21.5,4.9" />
								</svg>
							</div>
						)}
						<motion.button
							onClick={() => handleSound()}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							animate={{ scale: playing ? 1 : [1.1, 1] }}
							transition={playing ? { duration: 0.3 } : { duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
						>
							{!playing ? (
								<div role="button" aria-label="Sound" className="w-[50px] h-[50px] m-auto bg-yellow rounded-full border-2 border-white p-2 opacity-95 flex items-center justify-center">
									<GiSpeakerOff className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
								</div>
							) : (
								<div role="button" aria-label="Sound" className="w-[50px] h-[50px] m-auto bg-yellow rounded-full border-2 border-white p-2 opacity-95 flex items-center justify-center">
									<GiSpeaker className="text-2xl text-white hover:scale-110 transition-all duration-300 cursor-pointer" />
								</div>
							)}
						</motion.button>
					</div>
				</div>
			</main>
		</div>
	);
}
