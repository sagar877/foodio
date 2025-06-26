import Navbar from './components/Navbar';
import { Navigation } from './components/Navigation';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import Store from './utils/Store';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';

const App = () => {

	const location = useLocation()
	const hideFooterOn =['/cart', '/about'];

  	return (
		<>
			<div className="min-h-screen flex flex-col">
				<Provider store={Store}>
					<AuthProvider>
						<Navbar />
						<Navigation/>
					</AuthProvider>
				</Provider>
				{ !hideFooterOn.includes(location.pathname) && <Footer />}
			</div>
		</>
  	)
}

export default App;