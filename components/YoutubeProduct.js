import React from "react";
import { useGlobalContext } from "../components/GlobalContext";
import NavBar from "./NavBar";
import Nav from "./Nav";
import YouTube from "react-youtube";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";

const YoutubeProduct = ({ localProduct }) => {
	const { lang, setLang, isOpen, setIsOpen } = useGlobalContext();

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

	const imageBuilder = imageUrlBuilder({
		projectId: "r1wp5yv2",
		dataset: "production",
	});

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

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
					videoId={"NPD5YlFjPWc"}
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
							controls: 0,
							rel: 0,
							showinfo: 0,
							mute: 1,
							loop: 1,
						},
					}}
					onReady={(event) => event.target.unMute()}
				/>
				<div className=" p-12 pt-28 md:pt-12">
					<div className="flex flex-row">
						<div son>son</div>
						<div langue>langue</div>
						<div prix>prix</div>
					</div>
					<div className="flex flex-row justify-between">
						<div>
							<div titre>{localProduct.title[lang] ? localProduct.title[lang] : localProduct.title.en}</div>
							<div description>{localProduct ? toPlainText(localProduct.description[lang]) : router?.query?.slug}</div>
							<div className="flex flex-row justify-between">
								<button>button</button>
								<div className="flex flex-row">
									<div expert1>cnes</div>
									<div expert2>cefa</div>
								</div>
							</div>
						</div>
						<Image
							className="hover:scale-105 transition-all duration-1000"
							src={urlFor(localProduct.image).url()}
							alt={localProduct.title[lang] ? localProduct.title[lang] : localProduct.title.en}
							width="300"
							height="300"
							style={{
								backgroundColor: "black",
							}}
						/>
					</div>
				</div>
				<div footer>footer</div>
			</section>
		</div>
	);
};

export default YoutubeProduct;
