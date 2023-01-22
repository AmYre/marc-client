import React, { useState } from 'react';
import { useGlobalContext } from './GlobalContext';

import Link from 'next/link';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

import { motion } from 'framer-motion';
import imageUrlBuilder from '@sanity/image-url';

const Products = ({ products }) => {
	const { nav, setNav, lang, setLang } = useGlobalContext();
	const [filter, setFilter] = useState();

	const imageBuilder = imageUrlBuilder({ projectId: 'r1wp5yv2', dataset: 'production' });

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	const filterByCat = (cat) => {
		if (cat == 'all') {
			setFilter('');
		}
		if (cat == 'nouveau') {
			setFilter('nouveau');
		}
		if (cat == 'artisanats') {
			setFilter('artisanats');
		}
	};

	return (
		<div className='p-12 pt-28 md:pt-12'>
			<h2 className='text-3xl tracking-widest font-thin mb-12'>Collection</h2>
			<div className='text-sm p-4 mb-12 font-thin border-t-[1px] border-b-[1px] border-gray-100 flex flex-wrap justify-center gap-8'>
				<button onClick={() => filterByCat('all')} className='cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300'>
					Tout
				</button>
				<button onClick={() => setNav('artists')} className='cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300'>
					Artistes
				</button>
				<button onClick={() => filterByCat('nouveau')} className='cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300'>
					Art-Nouveau
				</button>
				<button onClick={() => filterByCat('artisanats')} className='cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300'>
					Art & Artisanats
				</button>
				<button onClick={() => filterByCat('autre')} className='cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300'>
					Autre
				</button>
			</div>
			{products && (
				<div className=''>
					{lang == 'fr' && (
						<>
							<div className='hidden md:block'>
								<Masonry breakpointCols={3} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
									{products.map((product, index) =>
										filter ? (
											product.category?.slug.current == filter && (
												<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
													{product?.slugen && (
														<Link key={index} href={product.slugfr.current} className='relative w-full'>
															<div className='product-frame relative w-full overflow-hidden'>
																<div className='overlay relative'>
																	<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(product.image).url()} alt='Image produit' width='300' height='300'></Image>
																</div>
																<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={product.title.fr}>
																	{product.title.fr}
																</h2>
															</div>
														</Link>
													)}
												</motion.div>
											)
										) : (
											<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
												{product?.slugen && (
													<Link key={index} href={product.slugfr.current} className='relative w-full'>
														<div className='product-frame relative w-full overflow-hidden'>
															<div className='overlay relative'>
																<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(product.image).url()} alt='Image produit' width='300' height='300'></Image>
															</div>
															<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={product.title.fr}>
																{product.title.fr}
															</h2>
														</div>
													</Link>
												)}
											</motion.div>
										)
									)}
								</Masonry>
							</div>
							<div className='md:hidden'>
								<Masonry breakpointCols={1} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
									{products.map((product, index) =>
										filter ? (
											product.category?.slug.current == filter && (
												<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
													{product?.slugen && (
														<Link key={index} href={product.slugfr.current} className='relative w-full'>
															<div className='product-frame relative w-full overflow-hidden'>
																<div className='overlay relative'>
																	<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(product.image).url()} alt='Image produit' width='300' height='300'></Image>
																</div>
																<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={product.title.fr}>
																	{product.title.fr}
																</h2>
															</div>
														</Link>
													)}
												</motion.div>
											)
										) : (
											<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
												{product?.slugen && (
													<Link key={index} href={product.slugfr.current} className='relative w-full'>
														<div className='product-frame relative w-full overflow-hidden'>
															<div className='overlay relative'>
																<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(product.image).url()} alt='Image produit' width='300' height='300'></Image>
															</div>
															<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={product.title.fr}>
																{product.title.fr}
															</h2>
														</div>
													</Link>
												)}
											</motion.div>
										)
									)}
								</Masonry>
							</div>
						</>
					)}

					{lang == 'en' && (
						<>
							<div className='hidden md:block'>
								<Masonry breakpointCols={3} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
									{products.map((product, index) =>
										filter ? (
											product.category?.slug.current == filter && (
												<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
													{product?.slugen && (
														<Link key={index} href={product.slugen.current} className='relative w-full'>
															<div className='product-frame relative w-full overflow-hidden'>
																<div className='overlay relative'>
																	<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(product.image).url()} alt='Image produit' width='300' height='300'></Image>
																</div>
																<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={product.title.en}>
																	{product.title.en}
																</h2>
															</div>
														</Link>
													)}
												</motion.div>
											)
										) : (
											<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
												{product?.slugen && (
													<Link key={index} href={product.slugen.current} className='relative w-full'>
														<div className='product-frame relative w-full overflow-hidden'>
															<div className='overlay relative'>
																<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(product.image).url()} alt='Image produit' width='300' height='300'></Image>
															</div>
															<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={product.title.en}>
																{product.title.en}
															</h2>
														</div>
													</Link>
												)}
											</motion.div>
										)
									)}
								</Masonry>
							</div>
							<div className='md:hidden'>
								<Masonry breakpointCols={1} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
									{products.map((product, index) =>
										filter ? (
											product.category?.slug.current == filter && (
												<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
													{product?.slugen && (
														<Link key={index} href={product.slugen.current} className='relative w-full'>
															<div className='product-frame relative w-full overflow-hidden'>
																<div className='overlay relative'>
																	<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(product.image).url()} alt='Image produit' width='300' height='300'></Image>
																</div>
																<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={product.title.en}>
																	{product.title.en}
																</h2>
															</div>
														</Link>
													)}
												</motion.div>
											)
										) : (
											<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
												{product?.slugen && (
													<Link key={index} href={product.slugen.current} className='relative w-full'>
														<div className='product-frame relative w-full overflow-hidden'>
															<div className='overlay relative'>
																<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(product.image).url()} alt='Image produit' width='300' height='300'></Image>
															</div>
															<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={product.title.en}>
																{product.title.en}
															</h2>
														</div>
													</Link>
												)}
											</motion.div>
										)
									)}
								</Masonry>
							</div>
						</>
					)}
					{lang == 'ru' && (
						<>
							<div className='hidden md:block'>
								<Masonry breakpointCols={3} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
									{products.map((product, index) =>
										filter ? (
											product.category?.slug.current == filter && (
												<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
													{product?.slugru && (
														<Link key={index} href={product.slugru.current} className='relative w-full'>
															<div className='product-frame relative w-full overflow-hidden'>
																<div className='overlay relative'>
																	<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(product.image).url()} alt='Image produit' width='300' height='300'></Image>
																</div>
																<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={product.title.ru}>
																	{product.title.ru}
																</h2>
															</div>
														</Link>
													)}
												</motion.div>
											)
										) : (
											<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
												{product?.slugru && (
													<Link key={index} href={product.slugru.current} className='relative w-full'>
														<div className='product-frame relative w-full overflow-hidden'>
															<div className='overlay relative'>
																<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(product.image).url()} alt='Image produit' width='300' height='300'></Image>
															</div>
															<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={product.title.ru}>
																{product.title.ru}
															</h2>
														</div>
													</Link>
												)}
											</motion.div>
										)
									)}
								</Masonry>
							</div>
							<div className='md:hidden'>
								<Masonry breakpointCols={1} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
									{products.map((product, index) =>
										filter ? (
											product.category?.slug.current == filter && (
												<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
													{product?.slugru && (
														<Link key={index} href={product.slugru.current} className='relative w-full'>
															<div className='product-frame relative w-full overflow-hidden'>
																<div className='overlay relative'>
																	<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(product.image).url()} alt='Image produit' width='300' height='300'></Image>
																</div>
																<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={product.title.ru}>
																	{product.title.ru}
																</h2>
															</div>
														</Link>
													)}
												</motion.div>
											)
										) : (
											<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
												{product?.slugru && (
													<Link key={index} href={product.slugru.current} className='relative w-full'>
														<div className='product-frame relative w-full overflow-hidden'>
															<div className='overlay relative'>
																<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(product.image).url()} alt='Image produit' width='300' height='300'></Image>
															</div>
															<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={product.title.ru}>
																{product.title.ru}
															</h2>
														</div>
													</Link>
												)}
											</motion.div>
										)
									)}
								</Masonry>
							</div>
						</>
					)}
					{lang == 'cn' && (
						<>
							<div className='hidden md:block'>
								<Masonry breakpointCols={3} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
									{products.map((product, index) =>
										filter ? (
											product.category?.slug.current == filter && (
												<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
													{product?.slugcn && (
														<Link key={index} href={product.slugcn.current} className='relative w-full'>
															<div className='product-frame relative w-full overflow-hidden'>
																<div className='overlay relative'>
																	<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(product.image).url()} alt='Image produit' width='300' height='300'></Image>
																</div>
																<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={product.title.cn}>
																	{product.title.cn}
																</h2>
															</div>
														</Link>
													)}
												</motion.div>
											)
										) : (
											<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
												{product?.slugcn && (
													<Link key={index} href={product.slugcn.current} className='relative w-full'>
														<div className='product-frame relative w-full overflow-hidden'>
															<div className='overlay relative'>
																<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(product.image).url()} alt='Image produit' width='300' height='300'></Image>
															</div>
															<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={product.title.cn}>
																{product.title.cn}
															</h2>
														</div>
													</Link>
												)}
											</motion.div>
										)
									)}
								</Masonry>
							</div>
							<div className='md:hidden'>
								<Masonry breakpointCols={1} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
									{products.map((product, index) =>
										filter ? (
											product.category?.slug.current == filter && (
												<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
													{product?.slugcn && (
														<Link key={index} href={product.slugcn.current} className='relative w-full'>
															<div className='product-frame relative w-full overflow-hidden'>
																<div className='overlay relative'>
																	<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(product.image).url()} alt='Image produit' width='300' height='300'></Image>
																</div>
																<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={product.title.cn}>
																	{product.title.cn}
																</h2>
															</div>
														</Link>
													)}
												</motion.div>
											)
										) : (
											<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
												{product?.slugcn && (
													<Link key={index} href={product.slugcn.current} className='relative w-full'>
														<div className='product-frame relative w-full overflow-hidden'>
															<div className='overlay relative'>
																<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(product.image).url()} alt='Image produit' width='300' height='300'></Image>
															</div>
															<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={product.title.cn}>
																{product.title.cn}
															</h2>
														</div>
													</Link>
												)}
											</motion.div>
										)
									)}
								</Masonry>
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default Products;
