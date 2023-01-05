import { useGlobalContext } from './GlobalContext';
import Image from 'next/image';
import Link from 'next/link';
import { BsYoutube } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import { ImFacebook2 } from 'react-icons/im';
import locales from '../lang/locales.js';
import flagFR from '../public/fr.png';
import flagEN from '../public/en.png';
import flagRU from '../public/ru.png';
import flagCN from '../public/cn.png';

const Nav = () => {
	const { nav, setNav, lang, setLang } = useGlobalContext();

	return (
		<>
			<div className='w-[320px] text-center'>
				<Link href='/'>
					<h1 className='mb-0 pb-0 text-[2.5rem] text-gray-200 pt-6 px-6 font-splash'>Marc Maison</h1>
					<h2 className='font-splash text-[#c49d50] text-[1.3rem] tracking-wide pb-4 text-gold'>- 19ème - </h2>
				</Link>
			</div>
			<div className='z-10 w-full bg-black bg-opacity-80 flex flex-col'>
				<Link href='/creations' className='p-6 font-nunito text-sm  hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-gray-900' onClick={() => setNav('creations')}>
					{locales.menu1[lang]}
				</Link>
				<Link href='/creations' className='p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-gray-900' onClick={() => setNav('artists')}>
					{locales.menu2[lang]}
				</Link>
				<Link href='/creations' className='p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-gray-900' onClick={() => setNav('museum')}>
					{locales.menu3[lang]}
				</Link>
				<Link href='/creations' className='p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-gray-900' onClick={() => setNav('notable')}>
					{locales.menu4[lang]}
				</Link>
				<Link href='/creations' className='p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300tracking-widest font-thin uppercase border-b-[1px] border-gray-900' onClick={() => setNav('gallery')}>
					{locales.menu5[lang]}
				</Link>
				<Link href='/creations' className='p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300tracking-widest font-thin uppercase border-b-[1px] border-gray-900' onClick={() => setNav('creations')}>
					{locales.menu6[lang]}
				</Link>
			</div>
			<div className='text-center pt-6'>
				<div className='flex justify-center items-center gap-6'>
					<Image
						onClick={() => {
							setLang('fr');
						}}
						className='hover:cursor-pointer'
						src={flagFR}
						alt='langue française'
						width='20'
						height='20'
					/>
					<Image
						onClick={() => {
							setLang('en');
						}}
						className='hover:cursor-pointer'
						src={flagEN}
						alt='English'
						width='20'
						height='20'
					/>
					<Image
						onClick={() => {
							setLang('ru');
						}}
						className='hover:cursor-pointer'
						src={flagRU}
						alt='Russian'
						width='20'
						height='20'
					/>
					<Image
						onClick={() => {
							setLang('cn');
						}}
						className='hover:cursor-pointer'
						src={flagCN}
						alt='Chinese'
						width='20'
						height='20'
					/>
				</div>
				<p className=' text-md p-6 font-nunito tracking-widest font-medium'>PARIS</p>
				<div className='flex justify-center items-center gap-6'>
					<Link href='https://www.facebook.com/marcmaisongalerie/' target='_blank'>
						<ImFacebook2 />
					</Link>
					<Link href='https://www.instagram.com/marcmaison_antiques/' target='_blank'>
						<AiFillInstagram className='text-[22px]' />
					</Link>
					<Link href='https://www.youtube.com/@GalerieMarcMaison/featured' target='_blank'>
						<BsYoutube className='text-[22px]' />
					</Link>
				</div>
				<p className=' text-xs p-6 text-gray-400 tracking-widest font-thin'>ALL RIGHTS RESERVED © 2023</p>
			</div>
		</>
	);
};

export default Nav;
