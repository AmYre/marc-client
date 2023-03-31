import React, { useRef } from "react"
import emailjs from "@emailjs/browser"
import TextField from "@mui/material/TextField"

const Contact = () => {
	const form = useRef()

	const sendEmail = (e) => {
		e.preventDefault()

		emailjs.sendForm("service_kk36che", "template_6ni5c8k", form.current, "1GPC0RyVbDqEHASyZ").then(
			(result) => {
				console.log(result.text)
			},
			(error) => {
				console.log(error.text)
			}
		)
	}

	return (
		<div className="p-12 pt-28 md:pt-12">
			<h2 className="text-3xl tracking-widest font-thin font-bodoni mb-12">Contact</h2>
			<div className="overflow-hidden w-full h-[400px]">
				<img src="https://res.cloudinary.com/amircloud/image/upload/v1679314588/marc/contact.jpg" className="anim -z-10 object-cover h-screen w-screen" alt="bg" width="2500" height="2500" />
			</div>
			<form ref={form} onSubmit={sendEmail} className="flex flex-col mt-12 mb-12 md:px-16 gap-12">
				<div className="flex gap-12">
					<TextField className="w-full max-w-[400px]" name="user" id="standard-basic" label="Nom" variant="standard" required />
					<TextField className="w-full max-w-[400px]" name="lastname" id="standard-basic" label="Prénom" variant="standard" required />
				</div>
				<div className="flex gap-12">
					<TextField className="w-full max-w-[400px]" name="mail" id="standard-basic" label="Email" variant="standard" required />
					<TextField className="w-full max-w-[400px]" name="phone" id="standard-basic" label="Téléphone" variant="standard" />
				</div>
				<TextField className="w-full max-w-[800px]" name="message" id="standard-textarea" label="Message" multiline variant="standard" />
				<input className="bg-[#a87e2d] w-[200px] text-white px-8 py-4 rounded shadow hover:shadow-none transition-all duration-300" type="submit" value="Send">
					Envoyer
				</input>
			</form>
		</div>
	)
}

export default Contact
