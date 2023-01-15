import React from 'react';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../components/GlobalContext';
import Image from 'next/image';
import { sanityClient } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import locales from '../lang/locales.js';
import Nav from '../components/Nav';

const Gallery = () => {
	const { lang, setLang } = useGlobalContext();

	return (
		<div style='text-align:center;'>
			<iframe src='//v.calameo.com/?bkcode=0067283170bd29e1a66c1&mode=mini&view=book&showsharemenu=false&clickto=view&clicktarget=_self' width='100%' height='100%' frameborder='0' scrolling='no' allowtransparency allowfullscreen style='margin:0 auto;'></iframe>
		</div>
	);
};

export default Gallery;
