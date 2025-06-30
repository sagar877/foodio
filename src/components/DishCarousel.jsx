import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router'
import { faCircleChevronLeft , faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
import { img_url } from './Constants'

const DishCarousel = ({dishes}) => {

    const [emblaRef, emblaApi] = useEmblaCarousel()
    const Navigate = useNavigate()

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])
        
    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const getRestaurantDetails = (dishlink) => {
        const parsedUrl = new URL(dishlink);
        const collectionId = parsedUrl.searchParams.get('collection_id');
        Navigate(`/dish/${collectionId}`)
    }

  return (
    <>
        <div className='embla overflow-hidden'>
            <div  className="embla__viewport" ref={emblaRef}>
                <div className='embla__container flex'>
                    {dishes?.map((dish)=>
                        <div key={dish?.id} onClick={() =>getRestaurantDetails(dish.action.link)} className='embla__slide min-w-0 cursor-pointer' style={{flex:"0 0 15%"}}>
                            <img  src={img_url + dish.imageId} alt="dish"/>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center items-center gap-2 mt-2">
                <button className="embla__prev font-bold ms-5 " onClick={scrollPrev}>
                    <FontAwesomeIcon className='w-8 text-gray-400 h-8 transition-all duration-100 ease-in transform hover:scale-110' icon={faCircleChevronLeft} />
                </button>
                <button className="embla__next font-bold" onClick={scrollNext}>
                    <FontAwesomeIcon className='w-8 h-8 text-gray-400 transition-all duration-100 ease-in transform hover:scale-110' icon={faCircleChevronRight} />
                </button>
            </div>
        </div>
    </>
  )
}

export default DishCarousel
