import { useState , useEffect} from 'react'
import { useParams } from 'react-router';
import FoodCard from './FoodCard';

const RestaurantListByDish = () => {

   	const { collectionId }=useParams();
   	const [data,setData]=useState([]);
	const [dishTitle,setDishTitle]=useState("")
	const [dishDescription,setDishDescription]=useState("") 

    useEffect(()=>{
        getDetails()
    },[]);

    async function getDetails(){
		const response = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&collection=${collectionId}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`);
		const json = await response.json();
		
		setData(json?.data?.cards);
		setDishTitle(json?.data?.cards[0]?.card?.card?.title)
		setDishDescription(json?.data?.cards[0]?.card?.card?.description)
    }

  	return data.length === 0 ? <div className='flex justify-center items-center min-h-[33vh] text-2xl font-bold'>Just a moment… your cravings are being prepped.</div>: (
    	<div className='flex flex-col '>
			<div className='text-4xl mb-1 mt-7 px-10 font-[gilroy-extrabold]'>{dishTitle}</div>	
			<div className='text-lg mb-5 mt-1.5 px-10 font-[gilroy-medium]'>{dishDescription}</div>
			<div className='bg-orange-400 px-5 bg-opacity-10 py-5 grid grid-cols-4 gap-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1'>	
				{
					data.slice(2).map((item) => 
						<FoodCard {...item?.card?.card?.info} key={item?.card?.card?.info?.id}  />	
					)
				}
			</div>
    	</div>
  	)
}

export default RestaurantListByDish
