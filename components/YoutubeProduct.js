import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../components/GlobalContext";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import YouTube from "react-youtube";
import Image from "next/image";
import Link from "next/link";

import { MdEuro } from "react-icons/md";
import NavBar from "./NavBar";
import Nav from "./Nav";
import cnes from "../public/cnes.png";
import cefa from "../public/cefa.png";

import logo from "../public/logo.png";
import flages from "../public/es.png";
import flagpo from "../public/po.png";
import flagkr from "../public/kr.png";
import flagar from "../public/ar.png";
import flagjp from "../public/jp.png";
import flagit from "../public/it.png";
import flagtu from "../public/tu.png";
import flagru from "../public/ru.png";

const YoutubeProduct = ({ localProduct }) => {
	const { lang, setLang, texts, setTexts, isOpen, setIsOpen, currentProduct, setCurrentProduct } = useGlobalContext();
	const [ytlang, setYtLang] = useState(lang || "fr");
	setCurrentProduct(localProduct);

	let flags = [
		{ name: "spanish", pic: flages, lang: "es", tagLang: "-es", mobtag: "-es-mob", ytlang: "es" },
		{ name: "polish", pic: flagpo, lang: "po", tagLang: "-po", mobtag: "-po-mob", ytlang: "po" },
		{ name: "korean", pic: flagkr, lang: "kr", tagLang: "-kr", mobtag: "-kr-mob", ytlang: "kr" },
		{ name: "arabic", pic: flagar, lang: "ar", tagLang: "-ar", mobtag: "-ar-mob", ytlang: "ar" },
		{ name: "japanese", pic: flagjp, lang: "jp", tagLang: "-jp", mobtag: "-jp-mob", ytlang: "jp" },
		{ name: "italian", pic: flagit, lang: "it", tagLang: "-it", mobtag: "-it-mob", ytlang: "it" },
		{ name: "turkish", pic: flagtu, lang: "tu", tagLang: "-tu", mobtag: "-tu-mob", ytlang: "tu" },
		{ name: "russian", pic: flagru, lang: "ru", tagLang: "-ru", mobtag: "-ru-mob", ytlang: "ru" },
	];

	const imageBuilder = imageUrlBuilder({
		projectId: "r1wp5yv2",
		dataset: "production",
	});

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	useEffect(() => {
		if (lang) setYtLang(lang);
	}, [lang]);

	return (
		<div className={`flex ${isOpen ? "h-screen overflow-hidden" : "min-h-screen"} md:gap-8 bg-bg md:p-12`}>
			<div className="md:hidden">
				<NavBar />
			</div>
			<nav className="hidden md:block h-fit text-white">
				<Nav />
			</nav>
			<section className="w-full flex flex-col bg-white">
				<YouTube
					videoId={localProduct?.youtube_id[ytlang] ? localProduct.youtube_id[ytlang] : localProduct.youtube_id.fr}
					className={"string"}
					iframeClassName={"string"}
					style={{}}
					title={"string"}
					loading={"string"}
					opts={{
						height: "485",
						width: "100%",
						playerVars: {
							autoplay: 1,
							rel: 0,
							showinfo: 0,
							mute: 1,
							loop: 1,
						},
					}}
					onReady={(event) => {
						event.target.playVideo();
						event.target.unMute();
					}}
				/>
				<div className="p-12 pt-2 pb-4">
					<div className="flex flex-row gap-3 justify-end">
						{flags.map((flag, index) => (
							<div className="relative flex flex-col justify-center items-center mb-1 mt-1" key={index}>
								<Image
									onClick={() => setYtLang(flag.lang)}
									className="hover:cursor-pointer hover:scale-105 transition-all duration-300"
									src={flag.pic}
									alt={flag.name}
									width="35"
									height="35"
								/>
							</div>
						))}
					</div>
					<div className="flex flex-row justify-between gap-8 pt-2">
						<div className="">
							<div className="font-merri text-2xl font-bold pb-4">{localProduct.title[lang] ? localProduct.title[lang] : localProduct.title.en}</div>
							<PortableText className="text-justify" value={localProduct ? localProduct.description[lang] : router?.query?.slug} />
							<div className="flex flex-col md:flex-row items-center justify-between pt-4">
								<Link
									href="/contact?ask=1"
									className="hover:bg-[#641F43] bg-layout flex flex-row text-white px-4 py-4 cursor-pointer shadow hover:shadow-none transition-all duration-300"
								>
									<MdEuro className="text-2xl" />
									{texts.infos[lang]}
								</Link>
								<div className="flex justify-center items-center gap-4 mt-8 md:mt-0">
									<div className="flex flex-row items-center">
										<Image src={cnes} alt="expert CNES" width="50" height="50" />
										<p className="w-[90px] text-sm text-center ">Expert auprès du CNES</p>
									</div>
									<div className="flex flex-row items-center">
										<Image src={cefa} alt="expert CEFA" width="40" height="40" />
										<p className="w-[90px] text-sm text-center">Expert auprès du CNES</p>
									</div>
								</div>
							</div>
						</div>
						<Image
							className="hover:scale-105 transition-all duration-1000 hidden md:block"
							src={urlFor(localProduct.image).url()}
							alt={localProduct.title[lang] ? localProduct.title[lang] : localProduct.title.en}
							width="200"
							height="200"
							style={{
								height: "200px",
								width: "200px",
								backgroundColor: "black",
							}}
						/>
					</div>
				</div>
				<div className="flex justify-center mt-12">
					<hr className="w-3/4 mt-6 mb-2" />
				</div>
				<div className="flex justify-between gap-4 mt-4 p-12 text-black">
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
			</section>
		</div>
	);
};

export default YoutubeProduct;
