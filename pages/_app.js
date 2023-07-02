import "../styles/globals.css"
import "../styles/custom.css"
import { ContextProvider } from "../components/GlobalContext"
import { Analytics } from "@vercel/analytics/react"
import NextNProgress from "nextjs-progressbar"

function MyApp({ Component, pageProps }) {
	return (
		<ContextProvider>
			<NextNProgress color="#6A2147" />
			<Component {...pageProps} />
			<Analytics />
		</ContextProvider>
	)
}

export default MyApp
