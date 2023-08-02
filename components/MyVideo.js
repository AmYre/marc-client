import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const MyVideo = (props) => {
	const videoRef = React.useRef(null);
	const playerRef = React.useRef(null);
	const { options, onReady } = props;

	React.useEffect(() => {
		// Make sure Video.js player is only initialized once
		if (!playerRef.current) {
			// The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
			const videoElement = document.createElement("video-js");

			videoElement.style.objectFit = "cover";
			videoRef.current.appendChild(videoElement);

			const player = (playerRef.current = videojs(videoElement, options, () => {
				onReady && onReady(player);
			}));

			// You could update an existing player in the `else` block here
			// on prop change, for example:
		} else {
			const player = playerRef.current;

			player.autoplay(options.autoplay);
			player.src(options.sources);
		}
	}, [options, videoRef]);

	// Dispose the Video.js player when the functional component unmounts
	React.useEffect(() => {
		const player = playerRef.current;

		return () => {
			if (player && !player.isDisposed()) {
				player.dispose();
				playerRef.current = null;
			}
		};
	}, [playerRef]);
	window.VIDEOJS_NO_DYNAMIC_STYLE = true;
	return (
		<div data-vjs-player>
			<div className="h-screen w-full object-cover" ref={videoRef} />
		</div>
	);
};

export default MyVideo;
