import React from 'react'
import { useState } from 'react'
import MenuCard from './MenuCard'

const MenuContainer = ({menuItem}) => {
	
    const [menuDetails, setMenuDetails] = useState(menuItem?.card?.card?.itemCards)
 
  return (
	<>
	{ menuDetails.map((item) => <MenuCard item={item}/> )}
	</>
  )}

export default MenuContainer
