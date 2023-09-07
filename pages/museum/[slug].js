import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGlobalContext } from "../../components/GlobalContext";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import { PortableText } from "@portabletext/react";

import Nav from "../../components/Nav";
import NavBar from "../../components/NavBar";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "../../lib/sanityClient";

const DetailSold = () => {
	const { lang, setLang, isOpen, setIsOpen } = useGlobalContext();
	const [creation, setCreation] = useState();

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" });

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	const router = useRouter();
	const slug = router.query.slug;

	useEffect(() => {
		sanityClient.fetch(`*[ _type == "products" && slugfr.current == "${slug}" ]`).then((res) => setCreation(res[0]));
	}, [slug]);

	return (
		<main>
			<div className={`flex ${isOpen ? "h-screen overflow-hidden" : "min-h-screen"} md:gap-8 bg-bg md:p-12`}>
				<div className="md:hidden">
					<NavBar />
				</div>
				<nav className="hidden md:block h-fit text-white">
					<Nav />
				</nav>

				<main className="w-full bg-layout bg-opacity-90 text-white font-roboto p-12 pt-32 md:pt-12 ">
					<h2 className="text-3xl tracking-widest text-left font-thin font-bodoni mb-4">{creation?.title[lang] || creation?.title.en}</h2>
					<hr className="mb-4 text-white x-full" />
					<div className="md:hidden">
						{creation?.image && (
							<motion.div className="mb-12" initial={{ y: "50%", opacity: 0, scale: 0.5 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
								<Image src={urlFor(creation?.image)?.url()} alt={creation?.title[lang] || creation?.title.en} width="500" height="500" />
							</motion.div>
						)}
					</div>
					<div className="flex gap-4 border-b border-b-white pb-4 mb-12">
						<div className="font-roboto md:w-3/4 porText">{creation?.description && <PortableText className="font-roboto" value={creation?.description[lang]} />}</div>
						<div className="hidden md:block w-1/4">
							{creation?.image && (
								<motion.div className="mb-12" initial={{ y: "50%", opacity: 0, scale: 0.5 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
									<Image src={urlFor(creation?.image)?.url()} alt={creation?.title[lang] || creation?.title.en} width="500" height="500" />
								</motion.div>
							)}
						</div>
					</div>
				</main>
			</div>
		</main>
	);
};

export default DetailSold;
