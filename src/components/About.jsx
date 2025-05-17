import React from 'react'
import img from '../Images/about-img.png'

export default function About() {
  return (
    <div className='bg-red-200 flex flex-1 p-10 items-center'>
      	<img className="w-[700px] mt-22 float-right rounded-full" src={img} alt="about-img"/>
     	<h2 className=' text-4xl font-bold text-center mt-14  '> About Us</h2>
     	<p className='break-all text-lg font-semibold mt-5 '>FoodVilla is an online and mobile food ordering system which we have developed for restaurant owners and food lovers. 
			Through FoodVilla we are helping customers to discover the best restaurants in city. If you are customer you can easily get food 
			through this portal in minimum cost.
     	</p>
    </div>
  )
}
