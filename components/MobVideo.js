import React, { memo } from "react"
import { Video, CloudinaryContext } from "cloudinary-react"
import { useGlobalContext } from "../components/GlobalContext"

const MobVideo = memo(({ publicId }) => {
	const { lang, setLang } = useGlobalContext()

	return (
		<CloudinaryContext cloud_name="amircloud" secure={true}>
			<Video
				className="h-screen w-full object-cover"
				publicId={lang == "fr" ? publicId : lang == "en" ? `${publicId}-en` : lang == "cn" && `${publicId}-cn`}
				autoPlay
				playsInline
				muted
				loop
				poster={{ startOffset: "0" }}>
				<source src={`https://res.cloudinary.com/amircloud/video/upload/${publicId}.mp4`} type="video/mp4" />
				<source src="https://res.cloudinary.com/amircloud/video/upload/v1673634198/marc/home.mp4" type="video/mp4" />
			</Video>
		</CloudinaryContext>
	)
})

MobVideo.displayName = "MobVideo"

export default MobVideo
