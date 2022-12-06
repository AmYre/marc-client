import React from 'react';
import Image from 'next/image';
const productCard = (props) => {
	console.log('eeeeee', props.data);
	const product = props.data;
	const slug = product.slug.current;
	return (
		<div className='col-lg-4'>
			<div className='card'>
				{product.mainImage && <img src={product.mainImage} />}
				<div className='card-body'>
					<h5 className='card-title'>{product.title}</h5>
					<p className='card-text'>{product.excerpt}</p>
					<a href={slug} className='btn btn-primary'>
						Go somewhere
					</a>
				</div>
			</div>
		</div>
	);
};
export default productCard;
