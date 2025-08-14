import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons'
import { img_url } from './Constants'

const RestaurantInfo = ({data}) => {
  return (
    <div className='md:px-10 px-5'>
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
            <img className="object-cover w-full" loading='lazy' src={img_url + data.cloudinaryImageId}
            alt="detail"/>
        </div>
	</div>
  )
}

export default RestaurantInfo
