import React from "react";
import { Routes , Route } from "react-router";
import 	Home from './Home';
import  Error from './Error';
import FoodDetails from './FoodDetails';
import { Cart } from './Cart';
import RestaurantListByDish from './RestaurantListByDish';

export const Navigation = () =>{
    return (
        <>
            <Routes> 
		        <Route
					path='/'
				    element={<Home/>}/>
				<Route 
					path="/restaurant/:id"
					element={<FoodDetails/>}/>
				<Route 
					path="/dish/:collectionId"
					element={<RestaurantListByDish/>}/>
				<Route 
					path="/cart"
					element={<Cart/>}/>
				<Route 
					path='*'
					element={<Error/>}/>
			</Routes>
        </>
    )
}