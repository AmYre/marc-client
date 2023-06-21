import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sling as Hamburger } from "hamburger-react"
import { useGlobalContext } from "./GlobalContext"
import { AnimatePresence } from "framer-motion"

import { motion } from "framer-motion"

import logo from "../public/logo.png"
import MobNav from "../components/MobNav"

const NavBar = () => {
	const { nav, setNav, isOpen, setIsOpen } = useGlobalContext()

	return (
		<>
			<div className={`absolute z-50 h-20 top-0 left-0 right-0 ${!isOpen && "bg-layout bg-opacity-95"} text-white flex ${!isOpen ? "justify-between" : "justify-end"} items-center px-9 py-2`}>
				{!isOpen && (
					<>
						<Link href="/">
							<Image src={logo} className="w-14" alt="logo Marc Maison XIX" />
						</Link>
						<div className="text-center">
							<Link href="/">
								<h1 className="mb-0 pb-0 text-[1.2rem] text-gray-200 pt-6 px-6 font-bodoni text-center">Marc Maison</h1>
								<h2 className="font-splash text-[#c49d50] text-[0.8rem] tracking-wide pb-4 text-gold">- 19ème - </h2>
							</Link>
						</div>
					</>
				)}
				<div className="flex justify-center items-center ">
					<motion.button
						onClick={() => setNav(true)}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						animate={{ scale: isOpen ? 1 : [1.1, 1] }}
						transition={isOpen || nav ? { duration: 0.3 } : { duration: 0.3, repeat: Infinity, repeatType: "reverse" }}>
						<div className="border-2 border-white rounded-full bg-secondary">
							<Hamburger size={24} toggled={isOpen} toggle={setIsOpen} />
						</div>
					</motion.button>
					<p className="absolute bottom-0 text-center font-bold text-xs">Menu</p>
				</div>
			</div>
			<AnimatePresence>{isOpen && <MobNav />}</AnimatePresence>
		</>
	)
}

export default NavBar
