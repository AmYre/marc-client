import React, { memo } from "react"

import { Video, CloudinaryContext } from "cloudinary-react"

const MyVideo = memo(() => {
	return (
		<CloudinaryContext cloud_name="amircloud" secure={true}>
			<Video className="h-screen w-full object-cover" publicId="marc/home" autoPlay playsInline muted loop poster={{ startOffset: "0" }} />
		</CloudinaryContext>
	)
})

export default MyVideo
