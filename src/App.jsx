import 	Home from './components/Home';
import  About from './components/About';
import  Error from './components/Error';
import {Routes,Route} from "react-router-dom"
import FoodDetails from './components/FoodDetails';
import Navbar from './components/Navbar';
import ContactUs from './components/ContactUs'
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import Store from './utils/Store';
import {Cart} from './components/Cart';
import { useLocation } from 'react-router-dom';
import RestaurantListByDish from './components/RestaurantListByDish';


function App(){

	const location = useLocation()
	const hideFooterOn =['/cart', '/about'];

  	return (
		<>
			<div className="min-h-screen flex flex-col">
				<Provider store={Store}>
					<Navbar />
					<Routes> 
						<Route
							path='/'
							element={<Home/>}/>
						<Route 
							path="/restaurant/:id"
							element={< FoodDetails/>}/>
						<Route 
							path="/dish/:collectionId"
							element={< RestaurantListByDish/>}/>
						<Route 
							path="/Cart"
							element={<Cart/>}/>
						<Route 
							path='*'
							element={<Error/>}/>
					</Routes>
				</Provider>
				{ !hideFooterOn.includes(location.pathname) && <Footer />}
			</div>
		</>
  	)
}

export default App;