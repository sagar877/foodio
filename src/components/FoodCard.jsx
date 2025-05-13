
import { useNavigate } from 'react-router'
import { FontAwesomeIcon}  from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'

function FoodCard({name,cloudinaryImageId,cuisines,sla,id,avgRating}) {

    const {lastMileTravelString}=sla
  	const Navigate=useNavigate()
	const details=()=>{
		Navigate("/restaurant/"+id)
	}

    return (
		<div onClick={()=>details()} className="w-fit h-auto cursor-pointer flex-col p-4 rounded-lg mt-5 mb-5 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-95">
			<img src={
				"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/"+
				cloudinaryImageId } 
				alt="dish"/>
			<p className='font-bold text-xl'>{name}</p>
			<p className='break-all text-sm text-neutral-700'>{cuisines.join(",")}</p>
			<p className='break-all text-sm text-neutral-700'>Distance:{lastMileTravelString}</p>
			<p className="flex gap-1 items-center">
				<div className='bg-green-700 w-5 h-5 rounded-full flex justify-center items-center'>
					<FontAwesomeIcon className='fill-white w-3 stroke-white text-white' icon={faStar} />
				</div>{avgRating}
			</p>
		</div> 
    )
  }


    
  
  
  

  

export default FoodCard
