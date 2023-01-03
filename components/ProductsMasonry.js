import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

import { motion } from 'framer-motion';
import { sanityClient } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const ProductsMasonry = ({ data, filter }) => {
	const imageBuilder = imageUrlBuilder({ projectId: 'r1wp5yv2', dataset: 'production' });

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	return (
		<>
			<Masonry breakpointCols={3} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
				{data.map((el, index) =>
					filter ? (
						el.category?.slug.current == filter && (
							<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
								{el?.slugen && (
									<Link key={index} href={el.slugfr.current} className='relative w-full'>
										<div className='product-frame relative w-full overflow-hidden'>
											<div className='overlay relative'>
												<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(el.image).url()} alt='Image produit' width='300' height='300'></Image>
											</div>
											<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={el.title.fr}>
												{el.title.fr}
											</h2>
										</div>
									</Link>
								)}
							</motion.div>
						)
					) : (
						<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
							{el?.slugen && (
								<Link key={index} href={el.slugfr.current} className='relative w-full'>
									<div className='product-frame relative w-full overflow-hidden'>
										<div className='overlay relative'>
											<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(el.image).url()} alt='Image produit' width='300' height='300'></Image>
										</div>
										<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={el.title.fr}>
											{el.title.fr}
										</h2>
									</div>
								</Link>
							)}
						</motion.div>
					)
				)}
			</Masonry>
		</>
	);
};

export default ProductsMasonry;
