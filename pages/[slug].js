import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../components/GlobalContext";
import FullScreenProduct from "../components/FullScreenProduct";
import YouTubeProduct from "../components/YouTubeProduct";
import Head from "next/head";
import { sanityClient } from "../lib/sanityClient";
import { useRouter } from "next/router";

const DetailProduct = ({ vignette }) => {
	const { lang, setLang, tagLang, setTagLang, ended, setEnded, replay, setReplay, currentProduct, setCurrentProduct, texts, setTexts } = useGlobalContext();
	const [localProduct, setLocalProduct] = useState();
	const router = useRouter();
	const slug = router.query.slug;

	useEffect(() => {
		sanityClient.fetch(`*[_type=="products" && slugfr.current == "${slug?.replace(/-\w{2}$/, "")}" ]{...}`).then((res) => {
			setLocalProduct(res[0]);
		});
	}, [slug]);

	console.log("currentProduct", currentProduct);
	console.log("localProduct", localProduct);

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

	return (
		<main className="bg-black">
			<Head>
				<title>MarcMaison.Art | {currentProduct ? currentProduct.slugfr.current : router?.query?.slug}</title>
				<meta name="description" content={localProduct ? toPlainText(localProduct.description[lang]) : router?.query?.slug} />
				<meta name="keywords" content={`Marc Maison 19ème, Oeuvres 19ème, ${currentProduct ? currentProduct.slugfr.current : router?.query?.slug}`} />
				<meta name="author" content="Galerie Marc Maison" />
				<link rel="icon" href="/favicon.ico" />
				<meta property="og:title" content={`MarcMaisonArt | ${currentProduct ? currentProduct.slugfr.current : router?.query?.slug}`} />
				<meta property="og:description" content={localProduct ? toPlainText(localProduct.description[lang]) : router?.query?.slug} />
				<meta property="og:image" content="./logo.png" />
			</Head>
			{localProduct?.youtube ? <YouTubeProduct localProduct={localProduct} /> : <FullScreenProduct />}
		</main>
	);
};

// export const getStaticPaths = async () => {
// 	const products = await sanityClient.fetch(`*[_type == "products"]`);
// 	const slugs = await products.map((product) => product.slugfr.current);
// 	return {
// 		paths: slugs.map((slug) => ({ params: { slug } })),
// 		fallback: false,
// 	};
// };

// export const getStaticProps = async () => {
// 	const vignette = await sanityClient.fetch(`*[_type=="walls" && title == 'vignette']{...}`);

// 	return {
// 		props: {
// 			vignette,
// 		},
// 	};
// };

export default DetailProduct;
