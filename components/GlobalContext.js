import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

const ContextProvider = ({ children }) => {
	const [nav, setNav] = useState('creations');
	const [lang, setLang] = useState('fr');
	const [isOpen, setIsOpen] = useState(false);

	return (
		<GlobalContext.Provider
			value={{
				nav,
				setNav,
				lang,
				setLang,
				isOpen,
				setIsOpen,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

const useGlobalContext = () => {
	return useContext(GlobalContext);
};

export { ContextProvider, useGlobalContext };
