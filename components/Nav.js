import { useState, useEffect } from "react"
import { useGlobalContext } from "./GlobalContext"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { BsYoutube } from "react-icons/bs"
import { AiFillInstagram } from "react-icons/ai"
import { ImFacebook2 } from "react-icons/im"
import { RxPinLeft, RxPinRight } from "react-icons/rx"
import flagFR from "../public/fr.png"
import flagEN from "../public/en.png"
import flagCN from "../public/cn.png"

const Nav = ({ isProduct }) => {
	const { drawer, setDrawer, lang, setLang, tagLang, setTagLang, texts, setTexts } = useGlobalContext()
	const [localDrawer, setLocalDrawer] = useState(drawer)

	useEffect(() => {
		isProduct && setLocalDrawer(false)
	}, [])

	return (
		<>
			<AnimatePresence>
				{localDrawer && (
					<motion.div
						className="bg-layout bg-opacity-70 w-[320px]"
						initial={{ x: "-50%", opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						exit={{ x: "-50%", opacity: 0 }}>
						<div className="w-[320px] text-center">
							<Link href="/">
								<h1 className="mb-0 pb-0 text-[2rem] text-gray-200 pt-6 px-6 font-bodoni tracking-wide">Marc Maison</h1>
								<h2 className="font-splash text-[#c49d50] text-[1.3rem] tracking-wide pb-4 text-gold">- 19ème - </h2>
							</Link>
						</div>
						<div className="z-10 w-full bg-layout bg-opacity-80 flex flex-col">
							<Link
								href="/creations"
								className="p-6 font-nunito text-sm  hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-bg">
								{texts.menu1[lang]}
							</Link>
							<Link
								href="/artists"
								className="p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-bg">
								{texts.menu2[lang]}
							</Link>
							<Link
								href="/museum"
								className="p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-bg">
								{texts.menu3[lang]}
							</Link>
							<Link
								href="/gallery"
								className="p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300tracking-widest font-thin uppercase border-b-[1px] border-bg">
								{texts.menu4[lang]}
							</Link>
							<Link
								href="/contact"
								className="p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300tracking-widest font-thin uppercase border-b-[1px] border-bg">
								{texts.menu5[lang]}
							</Link>
						</div>
						<div className="text-center mt-6">
							<div className="flex justify-center items-center gap-6">
								<Image
									onClick={() => {
										setLang("fr")
									}}
									className="hover:cursor-pointer"
									src={flagFR}
									alt="langue française"
									width="30"
									height="30"
								/>
								<Image
									onClick={() => {
										setLang("en")
										setTagLang("-en")
									}}
									className="hover:cursor-pointer"
									src={flagEN}
									alt="English"
									width="30"
									height="30"
								/>
								<Image
									onClick={() => {
										setLang("cn")
										setTagLang("-cn")
									}}
									className="hover:cursor-pointer"
									src={flagCN}
									alt="Chinese"
									width="30"
									height="30"
								/>
							</div>
							<p className="text-md mt-6 mb-6 font-nunito tracking-widest ">PARIS</p>

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
							<p className="text-xs mt-3 text-gray-400 tracking-widest font-thin">ALL RIGHTS RESERVED © 2023</p>
						</div>
						<div>
							<div
								onClick={() => setLocalDrawer(false)}
								className="relative bottom-[-50px] w-[50px] h-[50px] flex justify-center items-center m-auto bg-yellow rounded-full p-4 opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer border-white border-2">
								<RxPinLeft className="text-[#6A2147]" />
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{!localDrawer && (
				<motion.div
					className="visible bottom-[730px]"
					initial={{ y: "0", opacity: 0, scale: 0.5 }}
					animate={{ y: "0", opacity: 1, scale: 1 }}
					transition={{ duration: 1.5, ease: "easeOut" }}
					exit={{ y: "0", opacity: 0, scale: 0.5 }}>
					<div
						onClick={() => {
							setLocalDrawer(true)
						}}
						className="w-[50px] h-[50px] bg-yellow rounded-full flex justify-center items-center opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer border-white border-2">
						<RxPinRight className="text-[#6A2147]" />
					</div>
				</motion.div>
			)}
		</>
	)
}

export default Nav
