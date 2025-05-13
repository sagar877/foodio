import CartCard from "./CartCard";

function CartDetails(item){
	
    if(item.type==="TopCarousel"){
      	return <CartCard {...item}  />
    }
    
    return <CartCard {...item} />
}
   
export default CartDetails;
