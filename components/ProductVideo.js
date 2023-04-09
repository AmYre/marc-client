import React, { memo } from "react"
import { Video, CloudinaryContext } from "cloudinary-react"

const ProductVideo = memo(({ publicId }) => {
	return (
		<CloudinaryContext cloud_name="amircloud" secure={true}>
			<Video className="h-screen w-full object-cover" publicId={publicId} autoPlay playsInline muted loop poster={{ startOffset: "0" }}>
				<source src="https://res.cloudinary.com/amircloud/video/upload/v1673634198/marc/home.mp4" type="video/mp4" />
			</Video>
		</CloudinaryContext>
	)
})

export default ProductVideo
