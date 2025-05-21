
import FoodCard from './FoodCard';
import { useEffect, useState, useRef} from 'react';
import { useOnline } from '../utils/useOnline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DishCarousel from './DishCarousel';
import { useSelector } from 'react-redux';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import background from '../Images/background.mp4'
import Login from './Login';

function filterData(text,allrestorant){
   	const filterData=allrestorant.filter((restaurant) =>
    	restaurant.info.name.toUpperCase().indexOf(text.toUpperCase()) > -1
 	);
  	return filterData;
}


function Home() {

	const[text,setText]=useState("")
	const[allrestorant,setAllRestorant]=useState([])
	const[dishes,setDishes]=useState([])
	const[filterrestorant,setFilterRestorant]=useState([])
	const isOnline=useOnline()
	const sectionRef = useRef(null);
	const isLoggedIn = useSelector( store=>store.app.isLoggedIn)

	useEffect(()=>{
		getRestaurantlist();
	},[]);

	const scrollToSection = () => {
		sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

  	async function getRestaurantlist(){
		const response=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&collection=80463");
		const data= await response.json();
		
		setDishes(data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info)
		setAllRestorant(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
		setFilterRestorant(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
  	}

  	if (!allrestorant) return null;

	if(!isOnline){
		return <h1 className='text-center'>🔴Oops,Check The Internet Connection</h1>
	}

  	return allrestorant.length===0 ? <div className='flex flex-1 justify-center items-center h-full text-2xl font-bold'>Just a moment… your cravings are being prepped.</div>:(
		<>
			{ isLoggedIn && <Login/>}
			<div className='bg-gradient-to-t from-black/70 to-white/5 h-screen px-20 max-lg:px-10 flex flex-col' >
				<video class="absolute -z-10 inset-0 object-cover" autoPlay muted loop  playsInline id="myVideo">
					<source src={background} type="video/mp4" />
						Your browser does not support the video tag.
				</video>	
				<div className='font-[merienda] w-[80%] mx-auto flex max-md:flex-col items-center h-full justify-center'>
					<div>
						<div class="w-[50%] max-lg:w-[80%] mx-auto">
							<div className='text-6xl max-xl:text-4xl max-2xl:text-5xl text-center max-md:text-3xl max-lg:text-center font-bold my-auto text-white leading-[75px]'>Order food online from your favourite local restaurants<span className='inline-block w-3 h-3 ms-1 rounded-full bg-orange-500'></span></div>
							<div className='my-4 max-lg:my-3 text-center text-xl max-md:text-base max-md:text-center font-[poppins] text-white font-semibold'>Freshly made food delivered to your door.</div>
							<div className='flex border rounded-full h-11 bg-white'>
								<input 
									type='text' 
									className='border-none mx-2 font-[poppins] w-full rounded-full p-2 focus:bg-white focus:outline-none placeholder:text-sm' 
									value={text} 
									placeholder='Search for restaurant'
									onChange={(e)=>setText(e.target.value)} 
								/>
								<button onClick={() => {
									const data=filterData(text,allrestorant);
									setFilterRestorant(data);
									scrollToSection();
									setText('')}} 
									className='w-[200px] tracking-wide text-sm bg-green-700 font-[poppins] p-1 rounded-full text-white'>
									<FontAwesomeIcon className='me-1' icon={faMagnifyingGlass}/>Search</button>
							</div>
						</div>
					</div>
					
					 {/* <AnimatePresence mode="wait">
						<motion.div
							initial={{ y: 70, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -70, opacity: 0 }}
							transition={{ duration: 0.8 }}
						>
							<div className='relative flex flex-col justify-center'>
								<img src={main} alt='food' className='relative z-10 max-w-[400px] max-h-[400px] my-auto'/>
								<img src={leafImage1} alt='food' className='absolute max-lg:hidden w-[280px] -right-32 -top-10' />
							</div>
						</motion.div>
                	</AnimatePresence> */}
				</div>	
			</div>

			<DishCarousel dishes={dishes}/>
			
			<div ref={sectionRef} className='flex flex-col py-8 mt-4 px-5'>  
				{filterrestorant.length != [] ? 
					<>
						<div className="text-3xl font-bold">Discover Best Restaurants</div> 
						<div className='mt-4 grid gap-x-5 gap-y-2 grid-cols-1 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
							{filterrestorant.map((restaurant)=> <FoodCard  {...restaurant.info} key={restaurant.info.id} />)}
						</div>
					</>:
					<>
						<h2 className='text-2xl font-[gilroy-bold] text-center'>No Restaurants Found</h2>
    					<p className='text-enter mt-1 mx-auto font-[merienda]'>Good food is worth the wait. Try changing your search and let the flavor find you.</p>
					</>
				}
			</div>		
		</>
  	);
  
}

export default Home;