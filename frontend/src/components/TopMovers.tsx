"use client"

import Link
 from "next/link"

const stocks = [

 {
  symbol: "INFY",
  company: "Infosys",
  change: "+3.2%",
 },

 {
  symbol: "TCS",
  company: "Tata Consultancy",
  change: "+2.7%",
 },

 {
  symbol: "RELIANCE",
  company: "Reliance Industries",
  change: "+1.9%",
 },

 {
  symbol: "WIPRO",
  company: "Wipro",
  change: "+1.4%",
 },

]


export default function
TopMovers() {

 return (

  <div
   className="
    bg-white
    rounded-3xl
    border
    p-8
    shadow-sm
   "
  >

   <div
    className="
     flex
     items-center
     justify-between
     mb-8
    "
   >

    <h2
     className="
      text-2xl
      font-bold
      text-gray-900
     "
    >

     Top Movers

    </h2>

   </div>


   <div className="space-y-5">

    {
     stocks.map((stock) => (

      <Link
       key={stock.symbol}
       href={`/stocks/${stock.symbol}`}
      >

       <div
        className="
         flex
         items-center
         justify-between
         p-5
         rounded-2xl
         hover:bg-gray-50
         transition
         cursor-pointer
        "
       >

        <div>

         <h3
          className="
           font-semibold
           text-lg
          "
         >

          {stock.symbol}

         </h3>


         <p
          className="
           text-gray-500
           text-sm
           mt-1
          "
         >

          {stock.company}

         </p>

        </div>


        <div
         className="
          text-emerald-600
          font-semibold
          text-lg
         "
        >

         {stock.change}

        </div>

       </div>

      </Link>

     ))
    }

   </div>

  </div>

 )

}