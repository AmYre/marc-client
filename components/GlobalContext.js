import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

const ContextProvider = ({ children }) => {
	const [nav, setNav] = useState('home');
	const [lang, setLang] = useState('fr');

	return (
		<GlobalContext.Provider
			value={{
				nav,
				setNav,
				lang,
				setLang,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

const useGlobalContext = () => {
	return useContext(GlobalContext);
};

export { ContextProvider, useGlobalContext };
