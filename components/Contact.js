import React, { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

import Image from "next/image";
import { useGlobalContext } from "../components/GlobalContext";
import imageUrlBuilder from "@sanity/image-url";
import { MutatingDots } from "react-loader-spinner";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import contactPic from "../public/contact.png";

const Contact = () => {
	const { lang, setLang, texts, setTexts, currentProduct, setCurrentProduct } = useGlobalContext();

	const [sent, setSent] = useState(false);
	const [delay, setDelay] = useState(false);
	const form = useRef();

	const params = useSearchParams();
	const onDemand = params.get("ask");

	const sendEmail = (e) => {
		setSent(true);
		setDelay(true);
		setTimeout(() => {
			setDelay(false);
		}, 2000);
		e.preventDefault();

		emailjs.sendForm("service_kmun1ds", "template_kzoezx5", form.current, "mI6zt6KbO8qA65ye9").then(
			(result) => {
				console.log("Mail sent : ", result.text);
			},
			(error) => {
				console.log("Mail error : ", error.text);
			}
		);
	};

	const imageBuilder = imageUrlBuilder({ projectId: "r1wp5yv2", dataset: "production" });

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	return (
		<div className="p-12 pt-28 md:pt-12">
			<h2 className="text-3xl tracking-widest font-thin font-bodoni mb-2">{onDemand ? texts?.contactTitle[lang] : texts?.menu5[lang]}</h2>
			{onDemand && <h3 className="text-xl tracking-widest font-thin font-bodoni mb-12">{currentProduct?.title[lang]}</h3>}
			<div className={`overflow-hidden w-full flex justify-center items-center ${onDemand && "h-52"}`}>
				<Image
					src={onDemand ? urlFor(currentProduct?.image)?.url() : contactPic}
					className={`${onDemand ? "object-contain h-52" : "object-cover"}`}
					alt="bg"
					width={`${onDemand ? "500" : "2500"}`}
					height={`${onDemand ? "200" : "2500"}`}
				/>
			</div>
			<div className="flex flex-col items-center justify-center mb-12">
				<p className="text-xl tracking-widest font-thin font-bodoni mt-4">Contact</p>
				<p className="text-sm font-thin mb-3">- Daisy Delloue Maison -</p>
				<hr className="w-[200px]" />
			</div>
			{!sent ? (
				<form ref={form} onSubmit={sendEmail} className="flex flex-col mt-12 mb-12 md:px-16 gap-12">
					<div className="flex gap-12">
						<TextField className="w-full max-w-[400px]" name="user" id="standard-basic" label={texts.formLastname[lang]} variant="standard" required />
						<TextField className="w-full max-w-[400px]" name="lastname" id="standard-basic" label={texts.formName[lang]} variant="standard" required />
					</div>
					<div className="flex gap-12">
						<TextField className="w-full max-w-[400px]" name="mail" type="email" id="standard-basic" label={texts.formMail[lang]} variant="standard" required />
						<TextField className="w-full max-w-[400px]" name="phone" type="tel" id="standard-basic" label={texts.formPhone[lang]} variant="standard" />
					</div>
					<TextField className="w-full max-w-[800px]" name="message" id="standard-textarea" label={texts.formMessage[lang]} multiline variant="standard" />
					<input className="hidden" type="hidden" name="ref" value={currentProduct?.title[lang] || currentProduct?.title.en} />
					<input className="hidden" type="hidden" name="pic" value={onDemand ? urlFor(currentProduct?.image)?.url() : "nopic"} />
					<input
						className="bg-secondary w-[200px] hover:cursor-pointer hover:scale-[1.02] hover:shadow-md text-white px-8 py-4 rounded transition-all duration-300"
						type="submit"
						value={texts.formSent[lang]}
					/>
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
					exit={{ opacity: 0, scale: 0.1 }}
				>
					{texts.confirm[lang]}
				</motion.div>
			)}
		</div>
	);
};

export default Contact;
