import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { faStar} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuCard from './MenuCard';

function FoodDetails() {

    const { id }=useParams();
    const [data,setData]=useState({});
    const [menu,setMenu]=useState({});
    const[extra,setExtra]=useState({});
    
	useEffect(()=>{
		getDetails()
	},[]);

   	async function getDetails(){
    	const data= await fetch("https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId="+id+"&submitAction=ENTER")
    	const response=await data.json();
	
       	setData(response.data.cards[2].card.card.info)
   		setMenu(response.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.carousel)
  	 	setExtra(response.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.itemCards)
   	}
    
  	return !Object.entries(data).length ? <div className='flex justify-center items-center flex-1 text-2xl font-bold'>Just a moment… your cravings are being prepped.</div>: (
		<>
			<div className='flex flex-col py-5'>
				<div className='px-10'>
					<h1 className='font-bold text-2xl mb-4'>{data.name}</h1>
					<div className='relative h-56 w-full border rounded-xl overflow-hidden'>
						<div className='absolute left-10 top-6 h-44 w-96 p-5 border rounded-lg bg-white border-transparent z-10'>
							<div className='flex gap-2 font-bold items-center'> 
								<div className='bg-green-700 w-5 h-5 rounded-full flex justify-center items-center'>
									<FontAwesomeIcon className='fill-white w-3 stroke-white text-white' icon={faStar} />
								</div>{data.avgRating} .<span>{data.totalRatingsString}</span>.<span>{data.costForTwoMessage}</span>
							</div>
							<div className='font-bold my-3'>{data.cuisines.join(",")}</div>
							<div><span className='font-bold'>Location :</span> {data.locality}({data.areaName})</div>
							<div className='line-clamp-1'>{data?.labels[1]?.message}</div>
						</div>
						<img className="object-cover w-full" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/"+data.cloudinaryImageId}
						alt="detail"/>
					</div>

				</div>
				<div className='px-10 my-5'>
					<h1 className='font-bold my-4 text-lg'>Menu</h1>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
						{extra===undefined? 
							Object.values(menu).map((item)=>{
								return <MenuCard key={item?.dish?.id} item={item} />
							})
							:Object.values(extra).map((item)=>{
								return <MenuCard key={item?.card?.info?.id} item={item} />
						})}
					</div>
				</div>
			</div>
		</>
  	)
}

export default FoodDetails