import { useSelector } from "react-redux";
import CartDetails from "./CartDetails";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/CartSlice";


export const Cart=()=>{

    const userSelect=useSelector(Store=>Store.cart.items)
   
    const dispatch=useDispatch()
	
    const handleClear=()=>{
      dispatch(clearCart())
    }

  
  	return userSelect.length === 0? (<h2 className="text-center font-bold h-full text-2xl mt-4">Cart Is Empty </h2>):(
		<>
			<div className="flex justify-between mt-5 px-10">
				<h1 className="font-bold text-3xl font-[gilroy-extrabold]">CartItems</h1>
				<button className="p-1.5 mt-1 bg-red-700 border w-[150px] rounded-lg text-white" onClick={()=>handleClear()}>Clear cart</button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-10">
				{ userSelect.map((items)=> <CartDetails {...items} /> )}
			</div>
		</>
  	)
}

