import React from 'react';
import Image from 'next/image';

import { useGlobalContext } from './GlobalContext';

const Gallery = () => {
	const { nav, setNav, lang, setLang } = useGlobalContext();

	return (
		<>
			{lang == 'fr' && (
				<>
					<div className='hidden md:block h-full w-full'>
						<iframe className='bg-transparent m-auto' src='//v.calameo.com/?bkcode=0067283174fb6e58f9d0b&mode=mini' width='100%' height='100%' allowFullScreen></iframe>
					</div>
					<div className='md:hidden flex flex-col justify-center items-center mt-20'>
						<Image src='/aj-fr/aj-fr-1.jpg' alt='ana judic' width='300' height='600' />
						<Image src='/aj-fr/aj-fr-2.jpg' alt='ana judic' width='300' height='600' />
						<Image src='/aj-fr/aj-fr-3.jpg' alt='ana judic' width='300' height='600' />
						<Image src='/aj-fr/aj-fr-4.jpg' alt='ana judic' width='300' height='600' />
						<Image src='/aj-fr/aj-fr-5.jpg' alt='ana judic' width='300' height='600' />
						<Image src='/aj-fr/aj-fr-6.jpg' alt='ana judic' width='300' height='600' />
						<Image src='/aj-fr/aj-fr-7.jpg' alt='ana judic' width='300' height='600' />
						<Image src='/aj-fr/aj-fr-8.jpg' alt='ana judic' width='300' height='600' />
					</div>
				</>
			)}
			{lang == 'en' && <iframe className='bg-transparent m-auto' src='//v.calameo.com/?bkcode=00672831786ffbd4b8f8e&mode=mini' width='100%' height='100%' allowFullScreen></iframe>}
			{lang == 'ru' && <iframe className='bg-transparent m-auto' src='//v.calameo.com/?bkcode=0067283174fb6e58f9d0b&mode=mini' width='100%' height='100%' allowFullScreen></iframe>}
			{lang == 'cn' && <iframe className='bg-transparent m-auto' src='//v.calameo.com/?bkcode=006728317968097a3c634&mode=mini' width='100%' height='100%' allowFullScreen></iframe>}
		</>
	);
};

export default Gallery;
