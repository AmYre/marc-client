import React, { createContext, useContext, useState } from "react"
import { sanityClient } from "../lib/sanityClient"
import locales from "../lang/locales"

import useSound from "use-sound"
import { useEffect } from "react"

const GlobalContext = createContext()

const ContextProvider = ({ children }) => {
	const [texts, setTexts] = useState(locales)

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
	const [play, { stop }] = useSound("/quiet.mp3", { interrupt: true, loop: true })
	const [homePlaying, setHomePlaying] = useState(false)
	const [playing, setPlaying] = useState(false)
	const [isStreaming, setIsStreaming] = useState(false)

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
				play,
				stop,
				homePlaying,
				setHomePlaying,
				playing,
				setPlaying,
				isStreaming,
				setIsStreaming,
				texts,
				setTexts,
			}}>
			{children}
		</GlobalContext.Provider>
	)
}

const useGlobalContext = () => {
	return useContext(GlobalContext)
}

export { ContextProvider, useGlobalContext }
