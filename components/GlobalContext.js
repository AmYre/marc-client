import React, { createContext, useContext, useState } from "react"
import { sanityClient } from "../lib/sanityClient"
import axios from "axios"

import locales from "../lang/locales"

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
	const [isStreaming, setIsStreaming] = useState(false)
	const [texts, setTexts] = useState(locales)
	const [ended, setEnded] = useState(false)
	const [replay, setReplay] = useState(false)

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
				isStreaming,
				setIsStreaming,
				texts,
				setTexts,
				ended,
				setEnded,
				replay,
				setReplay,
			}}>
			{children}
		</GlobalContext.Provider>
	)
}

const useGlobalContext = () => {
	return useContext(GlobalContext)
}

export { ContextProvider, useGlobalContext }
