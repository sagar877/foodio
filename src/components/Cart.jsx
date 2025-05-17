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

  
  	return userSelect.length === 0? (<h2 className="text-center font-bold flex flex-1 justify-center items-center text-2xl mt-4">Cart Is Empty </h2>):(
		<>
			<div className="flex justify-between px-10 mt-5">
				<h1 className="font-bold text-3xl">CartItems</h1>
				<button className="p-1.5 mt-1 bg-red-700 border w-[150px] rounded-lg text-white" onClick={()=>handleClear()}>Clear cart</button>
			</div>
			<div className="grid grid-cols-2 2x:grid-cols-4 gap-5 gap-y-2 px-10 my-3">
				{ userSelect.map((items)=> <CartDetails {...items} /> )}
			</div>
		</>
  	)
}

