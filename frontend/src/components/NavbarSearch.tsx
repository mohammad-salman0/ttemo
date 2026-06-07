"use client"

import {
 useEffect,
 useState,
} from "react"

import {
 useRouter,
} from "next/navigation"

import api
 from "@/services/api"


type Stock = {

 symbol: string

 companyName: string

 halalStatus: string

}


export default function
NavbarSearch() {

 const router =
  useRouter()

 const [query,
  setQuery] =

  useState("")

 const [stocks,
  setStocks] =

  useState<Stock[]>([])

 const [results,
  setResults] =

  useState<Stock[]>([])

 const [focused,
  setFocused] =

  useState(false)


 /*
   FETCH STOCKS
 */
 useEffect(() => {

  fetchStocks()

 }, [])


 const fetchStocks =
  async () => {

   try {

    const response =
     await api.get(
      "/stocks"
     )

    setStocks(
     response.data
    )

   } catch (error) {

    console.log(error)

   }

  }


 /*
   FILTER SEARCH
 */
 useEffect(() => {

  if (!query.trim()) {

   setResults([])

   return

  }


  const filtered =
   stocks.filter((stock) =>

    stock.symbol
     .toLowerCase()

     .includes(
      query.toLowerCase()
     )

    ||

    stock.companyName
     .toLowerCase()

     .includes(
      query.toLowerCase()
     )

   )


  setResults(
   filtered.slice(0, 6)
  )

 }, [query, stocks])


 return (

  <div
   className="
    relative
    w-full
    max-w-md
   "
  >

   <input

    type="text"

    placeholder="
     Search stocks...
    "

    value={query}

    onChange={(e) =>
     setQuery(
      e.target.value
     )
    }

    onFocus={() =>
     setFocused(true)
    }

    onBlur={() => {

     setTimeout(() => {

      setFocused(false)

     }, 200)

    }}

    className="
     w-full
     bg-gray-100
     border
     border-gray-200
     rounded-2xl
     px-5
     py-3
     outline-none
     focus:border-black
     transition
    "

   />


   {/* RESULTS */}

   {
    focused &&
    results.length > 0 && (

     <div
      className="
       absolute
       top-full
       mt-3
       w-full
       bg-white
       border
       rounded-2xl
       shadow-xl
       overflow-hidden
       z-50
      "
     >

      {
       results.map((stock) => (

        <button

         key={stock.symbol}

         onClick={() => {

          router.push(

           `/stocks/${stock.symbol}`

          )

          setQuery("")

          setResults([])

         }}

         className="
          w-full
          px-5
          py-4
          text-left
          hover:bg-gray-50
          transition
          border-b
          last:border-b-0
         "
        >

         <div
          className="
           flex
           items-center
           justify-between
          "
         >

          <div>

           <h3
            className="
             font-semibold
            "
           >

            {stock.symbol}

           </h3>


           <p
            className="
             text-sm
             text-gray-500
             mt-1
            "
           >

            {stock.companyName}

           </p>

          </div>


          <span
           className={`
            text-xs
            px-3
            py-1
            rounded-full

            ${
             stock.halalStatus
              === "Halal"

              ? "bg-emerald-100 text-emerald-700"

              : "bg-red-100 text-red-700"
            }
           `}
          >

           {stock.halalStatus}

          </span>

         </div>

        </button>

       ))
      }

     </div>

    )
   }

  </div>

 )
}