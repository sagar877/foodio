import React from "react"
import img from "../Images/about-img.png"

const ContactUs =()=>{
    return (
        <>
        <div className=' bg-red-200 h-[500px] p-10 flex-column'>
     <h2 className=' text-4xl font-bold text-center mt-14'>Contact Us</h2>
     <form action="" className="bg-red-400 text-center" >
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" placeholder="Enter your name" required/>
      
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" placeholder="Enter your email" required/>
      
      <label htmlFor="phone">Phone:</label>
      <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required/>
      
      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" placeholder="Enter your message" required></textarea>
      
      <button type="submit">Submit</button>
   </form>
    </div>
    </>
    )

}


export default ContactUs;