import React, { createContext, useContext, useState } from "react"
import { sanityClient } from "../lib/sanityClient"

import locales from "../lang/locales"

import { useEffect } from "react"

const GlobalContext = createContext()

const ContextProvider = ({ children }) => {
	const [nav, setNav] = useState(false)
	const [lang, setLang] = useState("fr")
	const [tagLang, setTagLang] = useState("")
	const [isOpen, setIsOpen] = useState(false)
	const [drawer, setDrawer] = useState(true)
	const [isStreaming, setIsStreaming] = useState(false)
	const [texts, setTexts] = useState(locales)
	const [ended, setEnded] = useState(false)
	const [replay, setReplay] = useState(false)
	const [currentProduct, setCurrentProduct] = useState()

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

	return (
		<GlobalContext.Provider
			value={{
				nav,
				setNav,
				lang,
				setLang,
				tagLang,
				setTagLang,
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
				currentProduct,
				setCurrentProduct,
			}}>
			{children}
		</GlobalContext.Provider>
	)
}

const useGlobalContext = () => {
	return useContext(GlobalContext)
}

export { ContextProvider, useGlobalContext }
