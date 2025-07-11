import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import MenuContainer from './MenuContainer';
import Login from './Login';
import Register from './Register'
import RestaurantInfo from './RestaurantInfo'

const FoodDetails = () => {

    const { id }= useParams();
    const [ data, setData ]= useState({});
    const [ menu, setMenu ]= useState({});
	const [ activeTab, setActiveTab ] = useState(0);
	
	const isLoggedInModal = useSelector(store => store.app.isLoggedInModal)
	const isRegisteredModal = useSelector( store=>store.app.isRegisteredModal)
	
    
	useEffect(()=>{
		getDetails()
	},[]);

   	async function getDetails(){
    	const data= await fetch("https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId="+id+"&submitAction=ENTER")
    	const response=await data.json();
	
       	setData(response.data.cards[2].card.card.info)
   		setMenu(response.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards)
   	}
    
  	return !Object.entries(data).length ? <div className='flex justify-center items-center flex-1 text-2xl font-bold'>Just a moment… your cravings are being prepped.</div>: (
		<>
		{ isRegisteredModal && <Register/>}
		{isLoggedInModal && <Login/>}
			<div className='flex flex-col py-5'>
				<RestaurantInfo data={data}/>
				<div className='px-10 my-5 max-md:px-5'>
					<h1 className='font-bold my-4 text-lg'>Menu</h1>
					<div className='flex gap-x-3 max-sm:gap-x-2'>
						{
							menu.filter((item)=> {
								return item?.card?.card?.['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
							}).map((item , index) => index < 5 ? ( 
								<div className='flex flex-col relative'>
										<div className={`cursor-pointer px-3 py-1.5 text-center border border-white rounded-full max-sm:text-sm ${activeTab == index ? 'bg-gray-100' : 'bg-white'}`} onClick={() => setActiveTab(index)}>{item?.card?.card?.title} ({item?.card?.card?.itemCards?.length}) </div>
								</div>) : null
							)
						}
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
						{
							menu.filter((item)=> {
								return item?.card?.card?.['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
							}).map((menuItem, index) => (
								index < 8 && activeTab == index ? (
									<MenuContainer key={index} menuItem={menuItem} />
								): null
							))
						}
					</div>
				</div>
			</div>
		</>
  	)
}

export default FoodDetails