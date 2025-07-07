import Navbar from './components/Navbar';
import { Navigation } from './components/Navigation';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';

const App = () => {

	const location = useLocation()
	const hideFooterOn =['/cart', '/about'];

  	return (
		<>
			<div className="min-h-screen flex flex-col">
				<Navbar />
				<Navigation/>
				{ !hideFooterOn.includes(location.pathname) && <Footer />}
			</div>
		</>
  	)
}

export default App;