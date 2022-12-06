import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import bg1 from '../public/bg1.jpg';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Marc App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<Image src={bg1} alt='background' className='absolute z-[-1]' />

				<nav className='w-min bg-black bg-opacity-70 p-6'>
					<div>
						<h1 className='text-white text-2xl p-6 font-thin'>Marc Maison</h1>
					</div>
					<div className='z-10 text-white flex flex-col'>
						<Link href='/collection'>Collection</Link>
						<Link href='/artistes'>Artistes</Link>
						<Link href='/musee'>Vente au musée</Link>
						<Link href='/notable'>Vente notable</Link>
						<Link href='/contact'>Contact</Link>
					</div>
				</nav>
			</main>

			<footer></footer>
		</div>
	);
}