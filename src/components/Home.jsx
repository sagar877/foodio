
import FoodCard from './FoodCard';
import { useEffect, useState} from 'react';
import { useOnline } from '../utils/useOnline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DishCarousel from './DishCarousel';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import main from '../Images/main-dish.png'
import leafImage1 from '../Images/leaf1.png'
import leafImage2 from '../Images/leaf2.png'

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

	useEffect(()=>{
		getRestaurantlist();
	},[]);

  	async function getRestaurantlist(){
		const response=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&collection=80463");
		const data= await response.json();
		
		setDishes(data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info)
		setAllRestorant(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
		console.log(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
		setFilterRestorant(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
  	}

  	if (!allrestorant) return null;

	if(!isOnline){
		return <h1 className='text-center'>🔴Oops,Check The Internet Connection</h1>
	}

  	return allrestorant.length===0 ? <div className='flex flex-1 justify-center items-center h-full text-2xl font-bold'>Just a moment… your cravings are being prepped.</div>:(
		<>
			<div className='bg-lime-600 bg-opacity-5 h-screen px-20 max-lg:px-10 flex flex-col '>
				<div className='font-[merienda] w-[80%] mx-auto flex max-md:flex-col items-center h-full justify-center'>
					<div>
						<div className='text-5xl max-lg:text-4xl max-md:text-3xl max-lg:text-center font-bold my-auto text-green-700 leading-[60px]'>Order food online<br/>from your favourite<br/>local restaurants<span className='inline-block w-3 h-3 ms-1 rounded-full bg-orange-500'></span></div>
						<div className='my-4 max-lg:my-3 text-lg max-md:text-base max-md:text-center font-[poppins] text-neutral-400 font-semibold'>Freshly made food delivered to your door.</div>
						<div className='flex border rounded-full h-11 bg-white'>
							<input 
								type='text' 
								className='border-none mx-2 font-[poppins] w-full rounded-full p-1 focus:bg-white focus:outline-none placeholder:text-sm' 
								value={text} 
								placeholder='Search for restaurant'
								onChange={(e)=>setText(e.target.value)} 
							/>
							<button onClick={() => {
								const data=filterData(text,allrestorant);
								setFilterRestorant(data)}} 
								className='w-[200px] tracking-wide text-sm bg-green-700 font-[poppins] p-1 rounded-full text-white'>
								<FontAwesomeIcon className='me-1' icon={faMagnifyingGlass}/>Search</button>
						</div>
					</div>
					<div className='relative flex flex-col justify-center'>
						<img src={main} alt='food' className='relative z-10 max-w-[400px] max-h-[400px] my-auto'/>
						<img src={leafImage1} alt='food' className='absolute max-lg:hidden w-[280px] -right-32 -top-10' />
					</div>
				</div>	
				<img src={leafImage2} alt='food' className='absolute max-lg:hidden w-[250px] left-0 top-16' />
			</div>

			<DishCarousel dishes={dishes}/>
			
			<div className='flex flex-col py-8 mt-4 px-5'>  
				<div className="text-3xl font-bold">Discover Best Restaurants</div> 
				<div className='mt-4 grid gap-x-5 gap-y-2 grid-cols-1 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
					{ filterrestorant.map((restaurant)=> <FoodCard  {...restaurant.info} key={restaurant.info.id} />)}	
				</div>
			</div>		
		</>
  	);
  
}

export default Home;