import Navbar from './components/Navbar';
import { Navigation } from './components/Navigation';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import Store from './utils/Store';
import { useLocation } from 'react-router-dom';

const App = () => {

	const location = useLocation()
	const hideFooterOn =['/cart', '/about'];

  	return (
		<>
			<div className="min-h-screen flex flex-col">
				<Provider store={Store}>
					<Navbar />
					<Navigation/>
				</Provider>
				{ !hideFooterOn.includes(location.pathname) && <Footer />}
			</div>
		</>
  	)
}

export default App;