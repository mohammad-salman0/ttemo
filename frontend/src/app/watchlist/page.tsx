"use client"

import {
 useEffect,
 useState,
} from "react"

import Link
 from "next/link"

import DashboardLayout
 from "@/layouts/DashboardLayout"

import ProtectedRoutes
 from "@/components/ProtectedRoutes"

import api
 from "@/services/api"


type WatchlistStock = {

 symbol: string

 companyName: string

}


export default function
WatchlistPage() {

 const [stocks,
  setStocks] =

  useState<
   WatchlistStock[]
  >([])

 const [loading,
  setLoading] =

  useState(true)


 /*
 ===================================
 FETCH WATCHLIST
 ===================================
 */

 const fetchWatchlist =
  async () => {

   try {

    const response =
     await api.get(
      "/watchlist"
     )

    setStocks(

     response.data.stocks
      || []

    )

   } catch (error) {

    console.log(error)

   } finally {

    setLoading(false)

   }

  }


 /*
 ===================================
 REMOVE STOCK
 ===================================
 */

 const removeStock =
  async (
   symbol: string
  ) => {

   try {

    await api.delete(

     `/watchlist/${symbol}`

    )

    fetchWatchlist()

   } catch (error) {

    console.log(error)

   }

  }


 useEffect(() => {

  fetchWatchlist()

 }, [])


 return (

  <ProtectedRoutes>

   <DashboardLayout>

    <div
     className="
      mb-8
     "
    >

     <h1
      className="
       text-4xl
       font-bold
      "
     >

      Watchlist

     </h1>

     <p
      className="
       text-gray-500
       mt-2
      "
     >

      Track your favorite stocks

     </p>

    </div>


    {
     loading

      ? (

       <div>

        Loading...

       </div>

      )

      : stocks.length === 0

      ? (

       <div
        className="
         bg-white
         border
         rounded-3xl
         p-10
         text-center
        "
       >

        <p
         className="
          text-gray-500
         "
        >

         No stocks in watchlist

        </p>

       </div>

      )

      : (

       <div
        className="
         grid
         gap-4
        "
       >

        {
         stocks.map(
          (stock) => (

           <div

            key={
             stock.symbol
            }

            className="
             bg-white
             border
             rounded-2xl
             p-5

             flex
             items-center
             justify-between
            "
           >

            <div>

             <Link

              href={`/stocks/${stock.symbol}`}

              className="
               text-xl
               font-bold
               hover:text-emerald-600
              "
             >

              {
               stock.symbol
              }

             </Link>

             <p
              className="
               text-gray-500
               mt-1
              "
             >

              {
               stock.companyName
              }

             </p>

            </div>


            <button

             onClick={() =>
              removeStock(
               stock.symbol
              )
             }

             className="
              bg-red-500
              hover:bg-red-600
              text-white
              px-5
              py-2
              rounded-xl
             "
            >

             Remove

            </button>

           </div>

          )
         )
        }

       </div>

      )
    }

   </DashboardLayout>

  </ProtectedRoutes>

 )

}