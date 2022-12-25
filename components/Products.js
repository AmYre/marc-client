import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

import { motion, AnimatePresence, useCycle } from 'framer-motion';
import { sanityClient } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const Products = ({ products }) => {
	const imageBuilder = imageUrlBuilder({ projectId: 'r1wp5yv2', dataset: 'production' });

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	const [isVisible, onCycle] = useCycle(true, false);

	return (
		<>
			<AnimatePresence>
				{isVisible && (
					<motion.div key='child' initial={{ opacity: 0 }} animate={{ opacity: 2 }} transition={{ duration: 1 }} exit={{ opacity: 0 }}>
						<Masonry breakpointCols={3} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
							{products.map(
								(product, index) =>
									product?.slugen && (
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
									)
							)}
						</Masonry>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Products;
