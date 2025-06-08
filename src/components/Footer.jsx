import React from 'react'

function Footer() {
  	return (
		<footer>
			<div className="w-full flex-col px-6 pt-20 relative bottom-0 bg-lime-600 bg-opacity-5 lg:flex lg:px-10 xl:px-24">
				<div className="text-zinc-600 cursor-default lg:flex lg:flex-row lg:gap-x-16">
					<div>
						<h2 className="text-2xl text-zinc-800 font-mono font-bold">FoodVilla</h2>
						<ul className="mt-4 text-sm flex flex-col items-start justify-start gap-2">
							<li className="flex flex-row items-start">
								FoodVilla is an online and mobile food ordering system which we have developed for restaurant owners and food lovers. 
								Through FoodVilla we are helping customers to discover the best restaurants in city. If you are customer you can easily get food 
								through this portal in minimum cost.
							</li>
						</ul>
					</div>
					<div className="mt-4 lg:mt-0 flex flex-row flex-wrap lg:flex-nowrap lg:justify-center gap-4 lg:gap-x-24">
						<div className="flex flex-col">
							<h2 className="font-mono font-bold text-zinc-700 text-lg">Contact</h2>
							<ul className="mt-4 grid gap-2 ">
							<li className="flex items-start text-sm">
								<span><svg aria-hidden="true" viewBox="0 0 1024 1024" className="w-4 h-4 mr-1 mt-1 fill-zinc-600" preserveAspectRatio="none"><path fillRule="evenodd" clipRule="evenodd" d="M702.229 505.85l257.369 208.406V297.444zM599.854 588.749c-25.344 20.528-56.423 30.791-87.498 30.791-31.08 0-62.155-10.264-87.513-30.796l-53.778-43.556L65.846 792.386c2.945 22.208 13.831 41.923 29.75 56.193 7.592 6.805 16.341 12.319 25.868 16.329 10.846 4.566 22.712 7.164 35.207 7.164h711.225c15.817 0 30.632-4.139 43.612-11.24 9.122-4.99 17.365-11.399 24.295-19.056 12.221-13.502 20.449-30.628 22.931-49.554l-305.078-247.04-53.802 43.567zM64.969 297.272v417.157l257.529-208.577z"></path><path fillRule="evenodd" clipRule="evenodd" d="M419.633 505.853l43.688 35.383c28.408 23.005 69.652 23.005 98.061 0l43.699-35.386 48.574-39.333 303.38-245.664c-9.591-40.379-45.87-70.543-89.139-70.543H156.671c-43.219 0-79.46 30.093-89.103 70.4l303.497 245.807 48.568 39.336z"></path></svg></span><a
								target="javascript:;" className="text-left text-zinc-600 break-words hover:underline hover:text-zinc-800"
								href="javascript:;">contact@foodvilla.net</a>
							</li>
							</ul>
						</div>
						<div className="flex flex-col">
							<h2 className="font-mono font-bold text-zinc-700 text-lg">Social</h2>
							<ul className="mt-4 flex flex-col gap-2">
							<li className="flex items-start text-sm"><span></span><a target="javascript:;"
								  className="text-left text-zinc-600 break-words hover:underline hover:text-zinc-800"
								href="/services">Twitter</a></li>
							<li className="flex items-start text-sm"><span></span><a target="javascript:;"
								  className="text-left text-zinc-600 break-words hover:underline hover:text-zinc-800"
								href="">Instagram</a></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="w-full mt-10 py-10 border-t border-zinc-200 font-inter text-center text-xs text-zinc-400">Copyright ©
					2025
					FoodVilla Co. All rights reserved.
				</div>
			</div>
		</footer>
  	)
}

export default Footer
