
import { useNavigate } from 'react-router'
import { FontAwesomeIcon}  from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'

function FoodCard({name,cloudinaryImageId,cuisines,sla,id,avgRating,areaName}) {

    const {lastMileTravelString}=sla
  	const Navigate=useNavigate()
	const details=()=>{
		Navigate("/restaurant/"+id)
	}

    return (
		<div onClick={()=>details()} className="w-fit h-auto cursor-pointer flex-col my-2 bg-white transition-all duration-300 ease-in-out transform hover:scale-95">
			<img className="rounded-xl" src={
				"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/"+
				cloudinaryImageId } 
				alt="dish"/>
			<div className='px-4 py-2'>
				<p className='font-bold text-base line-clamp-2'>{name}</p>
				<div className="flex gap-1 items-center">
					<p className='bg-green-700 w-4 h-4 rounded-full flex justify-center items-center'>
						<FontAwesomeIcon className='fill-white w-2.5 stroke-white text-white' icon={faStar} />
					</p>{avgRating}<span className='font-semibold'>. {sla.slaString}</span>
				</div>
				<p className='flex flex-wrap gap-2 text-sm text-neutral-700 my-1 line-clamp-1'>{cuisines.join(', ')}</p>
				<p >{areaName}</p>
			</div>
		</div> 
    )
  }


    
  
  
  

  

export default FoodCard
