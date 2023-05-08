import React, { createContext, useContext, useState } from "react"
import { sanityClient } from "../lib/sanityClient"
import locales from "../lang/locales"

import useSound from "use-sound"
import { useEffect } from "react"

const GlobalContext = createContext()

const ContextProvider = ({ children }) => {
	useEffect(() => {
		sanityClient.fetch(`*[_type=="texts"]{...}`).then((texts) =>
			setTexts(
				texts.reduce((acc, { title, text }) => {
					acc[title] = text
					return acc
				}, {})
			)
		)
	}, [])

	const [nav, setNav] = useState("creations")
	const [lang, setLang] = useState("fr")
	const [isOpen, setIsOpen] = useState(false)
	const [drawer, setDrawer] = useState(false)
	const [playing, setPlaying] = useState(false)
	const [isStreaming, setIsStreaming] = useState(false)
	const [texts, setTexts] = useState(locales)
	const [ended, setEnded] = useState(false)

	return (
		<GlobalContext.Provider
			value={{
				nav,
				setNav,
				lang,
				setLang,
				isOpen,
				setIsOpen,
				drawer,
				setDrawer,
				playing,
				setPlaying,
				isStreaming,
				setIsStreaming,
				texts,
				setTexts,
				ended,
				setEnded,
			}}>
			{children}
		</GlobalContext.Provider>
	)
}

const useGlobalContext = () => {
	return useContext(GlobalContext)
}

export { ContextProvider, useGlobalContext }
