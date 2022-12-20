import '../styles/globals.css';
import '../styles/custom.css';
import { ContextProvider } from '../components/GlobalContext';

function MyApp({ Component, pageProps }) {
	return (
		<ContextProvider>
			<Component {...pageProps} />
		</ContextProvider>
	);
}

export default MyApp;
