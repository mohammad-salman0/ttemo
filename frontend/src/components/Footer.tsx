"use client"

export default function Footer(){

 return(

  <footer className="bg-gray-100 mt-20 py-10">

   <div className="container mx-auto text-center text-gray-500">

    <h2 className="text-xl font-semibold mb-2">
     TwinTrade
    </h2>

    <p>
     Ethical investing powered by AI and Shariah compliance
    </p>

    <p className="mt-4 text-sm">
     © {new Date().getFullYear()} TwinTrade
    </p>

   </div>

  </footer>

 )
}