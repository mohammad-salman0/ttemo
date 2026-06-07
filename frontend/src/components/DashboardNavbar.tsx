"use client"

import {
 useEffect,
 useState,
} from "react"

import {
 Search,
 Bell,
 User,
} from "lucide-react"

import {
 useRouter,
} from "next/navigation"

import api
 from "@/services/api"


type Stock = {

 symbol: string

 companyName: string

}


export default function
DashboardNavbar() {

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
   SEARCH FILTER
 */
 useEffect(() => {

  if (!query) {

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
    flex
    items-center
    justify-between
    gap-6
    px-8
    py-5
   "
  >

   {/* SEARCH */}
   <div className="relative w-full max-w-xl">

    <div
     className="
      flex
      items-center
      bg-white
      border
      rounded-2xl
      px-5
      py-3
      shadow-sm
     "
    >

     <Search
      size={20}
      className="
       text-gray-400
       mr-3
      "
     />

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

      className="
       w-full
       outline-none
       text-sm
      "

     />

    </div>


    {/* RESULTS */}
    {
     results.length > 0 && (

      <div
       className="
        absolute
        top-full
        left-0
        w-full
        mt-2
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
           text-left
           px-5
           py-4
           hover:bg-gray-50
           border-b
           transition
          "
         >

          <p
           className="
            font-semibold
           "
          >

           {stock.symbol}

          </p>

          <p
           className="
            text-sm
            text-gray-500
            mt-1
           "
          >

           {stock.companyName}

          </p>

         </button>

        ))
       }

      </div>

     )
    }

   </div>


   {/* RIGHT */}
   <div
    className="
     flex
     items-center
     gap-5
    "
   >

    <button
     className="
      relative
      p-3
      rounded-2xl
      bg-white
      border
      shadow-sm
     "
    >

     <Bell size={20} />

     <span
      className="
       absolute
       top-2
       right-2
       w-2
       h-2
       rounded-full
       bg-red-500
      "
     />

    </button>


    <div
     className="
      w-12
      h-12
      rounded-2xl
      bg-emerald-500
      text-white
      flex
      items-center
      justify-center
      font-bold
      shadow-sm
     "
    >

     <User size={20} />

    </div>

   </div>

  </div>

 )
}