import React, { useState, useRef } from "react"
import Image from "next/image"
import { useGlobalContext } from "../components/GlobalContext"
import Link from "next/link"

import { AiOutlineCloseCircle } from "react-icons/ai"
import { IoMdRefreshCircle } from "react-icons/io"

import { MutatingDots } from "react-loader-spinner"
import TextField from "@mui/material/TextField"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"

import contactPic from "../public/contact.jpg"
import cnes from "../public/cnes.png"
import cefa from "../public/cefa.png"
import flagPB from "../public/pb.png"
import flagPO from "../public/po.png"
import flagKR from "../public/kr.png"
import flagAR from "../public/ar.png"
import flagJP from "../public/jp.png"
import flagIT from "../public/it.png"
import flagTU from "../public/tu.png"
import flagRU from "../public/ru.png"
import logo from "../public/logo.png"

const Contact = ({ contact }) => {
	const { lang, setLang, texts, setTexts, ended, setEnded } = useGlobalContext()

	const { isOpen, setIsOpen } = useState(true)

	const [sent, setSent] = useState(false)
	const [delay, setDelay] = useState(false)
	const form = useRef()

	const sendEmail = (e) => {
		setSent(true)
		setDelay(true)
		setTimeout(() => {
			setDelay(false)
		}, 2000)
		e.preventDefault()

		emailjs.sendForm("service_kk36che", "template_6ni5c8k", form.current, "1GPC0RyVbDqEHASyZ").then(
			(result) => {
				console.log("Mail sent : ", result.text)
			},
			(error) => {
				console.log("MAil error : ", error.text)
			}
		)
	}

	return (
		<>
			{contact ? (
				<div className="p-12 pt-28 md:pt-12">
					<h2 className="text-3xl tracking-widest font-thin font-bodoni mb-12">{texts.menu5[lang]}</h2>
					<div className="overflow-hidden w-full h-[400px]">
						<Image src={contactPic} className="anim -z-10 object-cover h-screen w-screen" alt="bg" width="2500" height="2500" />
					</div>

					{!sent ? (
						<form ref={form} onSubmit={sendEmail} className="flex flex-col mt-12 mb-12 md:px-16 gap-12">
							<div className="flex gap-12">
								<TextField className="w-full max-w-[400px]" name="user" id="standard-basic" label={texts.formLastname[lang]} variant="standard" required />
								<TextField className="w-full max-w-[400px]" name="lastname" id="standard-basic" label={texts.formName[lang]} variant="standard" required />
							</div>
							<div className="flex gap-12">
								<TextField className="w-full max-w-[400px]" name="mail" id="standard-basic" label={texts.formMail[lang]} variant="standard" required />
								<TextField className="w-full max-w-[400px]" name="phone" id="standard-basic" label={texts.formPhone[lang]} variant="standard" />
							</div>
							<TextField className="w-full max-w-[800px]" name="message" id="standard-textarea" label={texts.formMessage[lang]} multiline variant="standard" />
							<input className="bg-[#a87e2d] w-[200px] text-white px-8 py-4 rounded shadow hover:shadow-none transition-all duration-300" type="submit" value={texts.formSent[lang]} />
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
							className="mt-8"
							initial={{ y: "50%", opacity: 0, scale: 0.5 }}
							animate={{ y: 0, opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							exit={{ opacity: 0, scale: 0.1 }}>
							{texts.confirm[lang]}
						</motion.div>
					)}
				</div>
			) : (
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
						<div className="flex flex-wrap justify-center items-center gap-4 mb-4">
							<Image
								onClick={() => {
									setLang("fr")
								}}
								className="hover:cursor-pointer"
								src={flagPB}
								alt="lang netherland"
								width="60"
								height="60"
							/>
							<Image
								onClick={() => {
									setLang("fr")
								}}
								className="hover:cursor-pointer"
								src={flagPO}
								alt="lang polish"
								width="60"
								height="60"
							/>
							<Image
								onClick={() => {
									setLang("fr")
								}}
								className="hover:cursor-pointer"
								src={flagKR}
								alt="lang korean"
								width="60"
								height="60"
							/>
							<Image
								onClick={() => {
									setLang("fr")
								}}
								className="hover:cursor-pointer"
								src={flagAR}
								alt="lang arabic"
								width="60"
								height="60"
							/>
							<Image
								onClick={() => {
									setLang("fr")
								}}
								className="hover:cursor-pointer"
								src={flagJP}
								alt="lang japanese"
								width="60"
								height="60"
							/>
							<Image
								onClick={() => {
									setLang("fr")
								}}
								className="hover:cursor-pointer"
								src={flagIT}
								alt="lang italian"
								width="60"
								height="60"
							/>
							<Image
								onClick={() => {
									setLang("fr")
								}}
								className="hover:cursor-pointer"
								src={flagTU}
								alt="lang turkish"
								width="60"
								height="60"
							/>
							<Image
								onClick={() => {
									setLang("fr")
								}}
								className="hover:cursor-pointer"
								src={flagRU}
								alt="langue russe"
								width="60"
								height="60"
							/>
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
			)}
		</>
	)
}

export default Contact
