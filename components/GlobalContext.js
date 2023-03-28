import React, { createContext, useContext, useState } from "react"
import useSound from "use-sound"

const GlobalContext = createContext()

const ContextProvider = ({ children }) => {
	const [nav, setNav] = useState("creations")
	const [lang, setLang] = useState("fr")
	const [isOpen, setIsOpen] = useState(false)
	const [drawer, setDrawer] = useState(false)
	const [play, { stop }] = useSound("/quiet.mp3", { interrupt: true })
	const [playing, setPlaying] = useState(false)

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
				playing,
				setPlaying,
			}}>
			{children}
		</GlobalContext.Provider>
	)
}

const useGlobalContext = () => {
	return useContext(GlobalContext)
}

export { ContextProvider, useGlobalContext }
