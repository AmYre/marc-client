import { useGlobalContext } from "./GlobalContext";
import Image from "next/image";
import Link from "next/link";
import { BsYoutube } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { ImFacebook2 } from "react-icons/im";
import locales from "../lang/locales.js";
import flagFR from "../public/fr.png";
import flagEN from "../public/en.png";
import flagRU from "../public/ru.png";
import flagCN from "../public/cn.png";
import { motion } from "framer-motion";

const MobNav = () => {
	const { nav, setNav, lang, setLang, isOpen, setIsOpen } = useGlobalContext();

	return (
		<div className="absolute z-10 h-screen w-screen inset-0 flex flex-col justify-around bg-black bg-opacity-90 text-white">
			<motion.div initial={{ y: "50%", opacity: 0, scale: 0.5 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} exit={{ opacity: 0, scale: 0.1 }}>
				<div className="text-center">
					<Link href="/">
						<h1 className="mb-0 pb-0 text-[2rem] text-gray-200 pt-6 px-6 font-bodoni tracking-wide text-center">Marc Maison</h1>
						<h2 className="font-splash text-[#c49d50] text-[1.3rem] tracking-wide pb-4 text-gold">- 19ème - </h2>
					</Link>
				</div>
				<div className="z-10 w-full bg-black bg-opacity-80 flex flex-col text-center">
					<Link
						href="/creations"
						className="p-6 font-nunito text-sm  hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-gray-900"
						onClick={() => setIsOpen(false)}
					>
						{locales.menu1[lang]}
					</Link>
					<Link
						href="/artists"
						className="p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-gray-900"
						onClick={() => setIsOpen(false)}
					>
						{locales.menu2[lang]}
					</Link>
					<Link
						href="/museum"
						className="p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-gray-900"
						onClick={() => setIsOpen(false)}
					>
						{locales.menu3[lang]}
					</Link>
					<Link
						href="/gallery"
						className="p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300tracking-widest font-thin uppercase border-b-[1px] border-gray-900"
						onClick={() => setIsOpen(false)}
					>
						{locales.menu5[lang]}
					</Link>
					<Link
						href="/contact"
						className="p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300tracking-widest font-thin uppercase border-b-[1px] border-gray-900"
						onClick={() => setIsOpen(false)}
					>
						{locales.menu6[lang]}
					</Link>
				</div>
				<div className="text-center pt-6">
					<div className="flex justify-center items-center gap-6">
						<Image
							onClick={() => {
								setLang("fr");
							}}
							className="hover:cursor-pointer"
							src={flagFR}
							alt="langue française"
							width="20"
							height="20"
						/>
						<Image
							onClick={() => {
								setLang("en");
							}}
							className="hover:cursor-pointer"
							src={flagEN}
							alt="English"
							width="20"
							height="20"
						/>
						<Image
							onClick={() => {
								setLang("ru");
							}}
							className="hover:cursor-pointer"
							src={flagRU}
							alt="Russian"
							width="20"
							height="20"
						/>
						<Image
							onClick={() => {
								setLang("cn");
							}}
							className="hover:cursor-pointer"
							src={flagCN}
							alt="Chinese"
							width="20"
							height="20"
						/>
					</div>
					<p className=" text-md p-6 font-nunito tracking-widest font-medium">PARIS</p>
					<div className="flex justify-center items-center gap-6">
						<Link href="https://www.facebook.com/marcmaisongalerie/" target="_blank">
							<ImFacebook2 />
						</Link>
						<Link href="https://www.instagram.com/marcmaison_antiques/" target="_blank">
							<AiFillInstagram className="text-[22px]" />
						</Link>
						<Link href="https://www.youtube.com/@GalerieMarcMaison/featured" target="_blank">
							<BsYoutube className="text-[22px]" />
						</Link>
					</div>
					<p className=" text-xs p-6 text-gray-400 tracking-widest font-thin">ALL RIGHTS RESERVED © 2023</p>
				</div>
			</motion.div>
		</div>
	);
};

export default MobNav;
