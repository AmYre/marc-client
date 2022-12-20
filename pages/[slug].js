import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../components/GlobalContext';

import { sanityClient } from '../lib/sanityClient';

const Creation = () => {
	const { lang, setLang } = useGlobalContext();
	const [slugLang, setSlugLang] = useState();
	const [creation, setCreation] = useState();

	const router = useRouter();
	const slug = router.query.slug;

	useEffect(() => {
		if (lang == 'fr') {
			sanityClient.fetch(`*[ _type == "products" && slugfr.current == "${slug}" ]`).then((res) => setCreation(res[0]));
		} else if (lang == 'en') {
			sanityClient.fetch(`*[ _type == "products" && slugen.current == "${slug}" ]`).then((res) => setCreation(res[0]));
		} else if (lang == 'ru') {
			sanityClient.fetch(`*[ _type == "products" && slugru.current == "${slug}" ]`).then((res) => setCreation(res[0]));
		} else {
			sanityClient.fetch(`*[ _type == "products" && slugcn.current == "${slug}" ]`).then((res) => setCreation(res[0]));
		}
	}, []);

	console.log(creation);

	return <div>Ajouter la fiche pour {creation?.title[lang]} </div>;
};

export default Creation;
