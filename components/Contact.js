import React, { useState, useRef } from "react"
import { useGlobalContext } from "../components/GlobalContext"
import imageUrlBuilder from "@sanity/image-url"

import { MutatingDots } from "react-loader-spinner"
import TextField from "@mui/material/TextField"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"

const Contact = ({ contactPic }) => {
	const { lang, setLang, texts, setTexts } = useGlobalContext()

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" })

	const urlFor = (source) => {
		return imageBuilder.image(source)
	}
	const header = urlFor(contactPic[0].image).url()

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
		<div className="p-12 pt-28 md:pt-12">
			<h2 className="text-3xl tracking-widest font-thin font-bodoni mb-12">{texts.menu5[lang]}</h2>
			<div className="overflow-hidden w-full h-[400px]">
				<img src={header} className="anim -z-10 object-cover h-screen w-screen" alt="bg" width="2500" height="2500" />
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
					<MutatingDots height="100" width="100" color="white" secondaryColor="#a87e2d" radius="12.5" ariaLabel="mutating-dots-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
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
	)
}

export default Contact
