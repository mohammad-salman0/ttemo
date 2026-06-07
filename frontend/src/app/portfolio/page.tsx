"use client"

import Link
 from "next/link"

import DashboardLayout
 from "@/layouts/DashboardLayout"

import ProtectedRoute
 from "@/components/ProtectedRoutes"

import {

 Wallet,
 TrendingUp,
 ArrowUpRight,
 ArrowDownRight,
 PieChart,

} from "lucide-react"

import {

 PieChart as RechartsPieChart,
 Pie,
 Cell,
 Tooltip,
 ResponsiveContainer,

} from "recharts"

import {
 usePortfolio,
} from "@/context/PortfolioContext"


const COLORS = [

 "#3B82F6",
 "#10B981",
 "#F59E0B",
 "#EF4444",
 "#8B5CF6",
 "#06B6D4",

]


export default function
PortfolioPage() {

 const {

  portfolio,
  loading,

 } = usePortfolio()


 /*
 ===================================
 LOADING
 ===================================
 */

 if (loading || !portfolio) {

  return (

   <ProtectedRoute>

    <DashboardLayout>

     <div
      className="
       flex
       items-center
       justify-center
       h-[70vh]
      "
     >

      <p
       className="
        text-gray-500
        text-lg
       "
      >

       Loading Portfolio...

      </p>

     </div>

    </DashboardLayout>

   </ProtectedRoute>

  )

 }


 /*
 ===================================
 PORTFOLIO ALLOCATION
 ===================================
 */

 const allocationData =

  portfolio.holdings.map(

   (holding) => ({

    name:
     holding.symbol,

    value:
     holding.currentValue || 0,

   })

  )


 /*
 ===================================
 HALAL DATA
 ===================================
 */

 const halalData = [

  {
   name: "Halal",
   value: 80,
  },

  {
   name: "Non-Halal",
   value: 10,
  },

  {
   name: "Review",
   value: 10,
  },

 ]


 return (

  <ProtectedRoute>

   <DashboardLayout>

    <div className="space-y-10">

     {/* HEADER */}

     <div>

      <h1
       className="
        text-4xl
        font-bold
        text-gray-900
       "
      >

       Portfolio

      </h1>


      <p
       className="
        text-gray-500
        mt-3
        text-lg
       "
      >

       Track your holdings,
       investments, and profits.

      </p>

     </div>


     {/* STATS */}

     <div
      className="
       grid
       grid-cols-1
       md:grid-cols-2
       xl:grid-cols-4
       gap-6
      "
     >

      {/* WALLET */}

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
        "
       >

        <div>

         <p
          className="
           text-gray-500
           text-sm
          "
         >

          Wallet Balance

         </p>


         <h2
          className="
           text-4xl
           font-bold
           mt-4
          "
         >

          ₹
          {" "}

          {
           portfolio.balance
            .toLocaleString()
          }

         </h2>

        </div>


        <div
         className="
          w-16
          h-16
          rounded-3xl
          bg-emerald-100
          flex
          items-center
          justify-center
          text-emerald-600
         "
        >

         <Wallet size={30} />

        </div>

       </div>

      </div>


      {/* INVESTED */}

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
        "
       >

        <div>

         <p
          className="
           text-gray-500
           text-sm
          "
         >

          Invested Amount

         </p>


         <h2
          className="
           text-4xl
           font-bold
           mt-4
          "
         >

          ₹
          {" "}

          {
           portfolio.totalInvestedValue
            ?.toLocaleString()
          }

         </h2>

        </div>


        <div
         className="
          w-16
          h-16
          rounded-3xl
          bg-blue-100
          flex
          items-center
          justify-center
          text-blue-600
         "
        >

         <PieChart size={30} />

        </div>

       </div>

      </div>


      {/* CURRENT VALUE */}

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
        "
       >

        <div>

         <p
          className="
           text-gray-500
           text-sm
          "
         >

          Current Value

         </p>


         <h2
          className="
           text-4xl
           font-bold
           mt-4
          "
         >

          ₹
          {" "}

          {
           portfolio.currentPortfolioValue
            ?.toLocaleString()
          }

         </h2>

        </div>


        <div
         className="
          w-16
          h-16
          rounded-3xl
          bg-violet-100
          flex
          items-center
          justify-center
          text-violet-600
         "
        >

         <TrendingUp size={30} />

        </div>

       </div>

      </div>


      {/* PROFIT */}

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
        "
       >

        <div>

         <p
          className="
           text-gray-500
           text-sm
          "
         >

          Total Profit

         </p>


         <h2
          className={`
           text-4xl
           font-bold
           mt-4

           ${
            portfolio.totalProfit >= 0

             ? "text-emerald-600"

             : "text-red-500"
           }
          `}
         >

          ₹
          {" "}

          {
           portfolio.totalProfit
            ?.toLocaleString()
          }

         </h2>


         <p
          className={`
           mt-3
           text-sm
           font-medium

           ${
            portfolio.totalReturnPercentage >= 0

             ? "text-emerald-600"

             : "text-red-500"
           }
          `}
         >

          {
           portfolio.totalReturnPercentage >= 0
            ? "+"
            : ""
          }

          {
           portfolio.totalReturnPercentage
          }%

         </p>

        </div>


        <div
         className="
          w-16
          h-16
          rounded-3xl
          bg-green-100
          flex
          items-center
          justify-center
          text-green-600
         "
        >

         <TrendingUp size={30} />

        </div>

       </div>

      </div>

     </div>


     {/* CHARTS */}

     <div
      className="
       grid
       grid-cols-1
       xl:grid-cols-2
       gap-6
      "
     >

      {/* HALAL CHART */}

      <div
       className="
        bg-white
        rounded-3xl
        border
        p-8
        shadow-sm
       "
      >

       <h2
        className="
         text-2xl
         font-bold
         mb-6
        "
       >

        Halal Allocation

       </h2>

       <div className="h-[320px]">

        <ResponsiveContainer
         width="100%"
         height="100%"
        >

         <RechartsPieChart>

          <Pie

           data={halalData}

           dataKey="value"

           nameKey="name"

           outerRadius={120}

           label

          >

           <Cell fill="#10B981" />
           <Cell fill="#EF4444" />
           <Cell fill="#F59E0B" />

          </Pie>

          <Tooltip />

         </RechartsPieChart>

        </ResponsiveContainer>

       </div>

      </div>


      {/* PORTFOLIO ALLOCATION */}

      <div
       className="
        bg-white
        rounded-3xl
        border
        p-8
        shadow-sm
       "
      >

       <h2
        className="
         text-2xl
         font-bold
         mb-6
        "
       >

        Portfolio Allocation

       </h2>

       <div className="h-[320px]">

        <ResponsiveContainer
         width="100%"
         height="100%"
        >

         <RechartsPieChart>

          <Pie

           data={allocationData}

           dataKey="value"

           nameKey="name"

           outerRadius={120}

           label

          >

           {
            allocationData.map(

             (_, index) => (

              <Cell

               key={index}

               fill={
                COLORS[
                 index %
                 COLORS.length
                ]
               }

              />

             )

            )
           }

          </Pie>

          <Tooltip />

         </RechartsPieChart>

        </ResponsiveContainer>

       </div>

      </div>

     </div>


     {/* HOLDINGS */}

     <div
      className="
       bg-white
       rounded-3xl
       border
       shadow-sm
       overflow-hidden
      "
     >

      <div
       className="
        px-8
        py-6
        border-b
        flex
        items-center
        justify-between
       "
      >

       <div>

        <h2
         className="
          text-2xl
          font-bold
         "
        >

         Holdings

        </h2>

        <p
         className="
          text-gray-500
          mt-1
         "
        >

         Live portfolio performance

        </p>

       </div>

      </div>


      {
       portfolio.holdings.length === 0

        ? (

         <div
          className="
           p-10
           text-center
           text-gray-500
          "
         >

          No holdings yet

         </div>

        )

        : (

         <div className="overflow-x-auto">

          <table
           className="
            min-w-[1200px]
            w-full
           "
          >

           <thead
            className="
             bg-gray-50
            "
           >

            <tr>

             <th className="text-left px-8 py-5 text-sm font-semibold whitespace-nowrap">
              Symbol
             </th>

             <th className="text-left px-8 py-5 text-sm font-semibold whitespace-nowrap">
              Quantity
             </th>

             <th className="text-left px-8 py-5 text-sm font-semibold whitespace-nowrap">
              Avg Price
             </th>

             <th className="text-left px-8 py-5 text-sm font-semibold whitespace-nowrap">
              Current Price
             </th>

             <th className="text-left px-8 py-5 text-sm font-semibold whitespace-nowrap">
              Current Value
             </th>

             <th className="text-left px-8 py-5 text-sm font-semibold whitespace-nowrap">
              Return %
             </th>

             <th className="text-left px-8 py-5 text-sm font-semibold whitespace-nowrap">
              P/L
             </th>

             <th className="text-left px-8 py-5 text-sm font-semibold whitespace-nowrap">
              Allocation
             </th>

             <th className="text-left px-8 py-5 text-sm font-semibold whitespace-nowrap">
              Actions
             </th>

            </tr>

           </thead>


           <tbody>

            {
             portfolio.holdings.map(

              (
               holding,
               index
              ) => (

               <tr
                key={index}
                className="border-t"
               >

                <td
                 className="
                  px-8
                  py-5
                  font-semibold
                  whitespace-nowrap
                 "
                >

                 {holding.symbol}

                </td>


                <td className="px-8 py-5 whitespace-nowrap">

                 {holding.quantity}

                </td>


                <td className="px-8 py-5 whitespace-nowrap">

                 ₹
                 {" "}

                 {
                  holding.averagePrice
                   ?.toFixed(2)
                 }

                </td>


                <td className="px-8 py-5 whitespace-nowrap">

                 ₹
                 {" "}

                 {
                  holding.currentPrice
                   ?.toFixed(2)
                 }

                </td>


                <td className="px-8 py-5 font-semibold whitespace-nowrap">

                 ₹
                 {" "}

                 {
                  holding.currentValue
                   ?.toLocaleString()
                 }

                </td>


                <td
                 className={`
                  px-8
                  py-5
                  font-semibold
                  whitespace-nowrap

                  ${
                   holding.returnPercentage >= 0

                    ? "text-emerald-600"

                    : "text-red-500"
                  }
                 `}
                >

                 {
                  holding.returnPercentage >= 0
                   ? "+"
                   : ""
                 }

                 {
                  holding.returnPercentage
                   ?.toFixed(2)
                 }%

                </td>


                <td
                 className={`
                  px-8
                  py-5
                  font-semibold
                  whitespace-nowrap

                  ${
                   holding.profitLoss >= 0

                    ? "text-emerald-600"

                    : "text-red-500"
                  }
                 `}
                >

                 ₹
                 {" "}

                 {
                  holding.profitLoss
                   ?.toLocaleString()
                 }

                </td>


                <td className="px-8 py-5 whitespace-nowrap">

                 {
                  holding.allocationPercentage
                   ?.toFixed(1)
                 }%

                </td>


                <td className="px-8 py-5 whitespace-nowrap">

                 <div className="flex gap-3">

                  <Link
                   href={`/stocks/${holding.symbol}`}
                  >

                   <button
                    className="
                     flex
                     items-center
                     gap-2
                     bg-emerald-500
                     hover:bg-emerald-600
                     text-white
                     px-4
                     py-2
                     rounded-xl
                     text-sm
                     transition
                    "
                   >

                    <ArrowUpRight size={16} />

                    Buy

                   </button>

                  </Link>


                  <Link
                   href={`/stocks/${holding.symbol}`}
                  >

                   <button
                    className="
                     flex
                     items-center
                     gap-2
                     bg-red-500
                     hover:bg-red-600
                     text-white
                     px-4
                     py-2
                     rounded-xl
                     text-sm
                     transition
                    "
                   >

                    <ArrowDownRight size={16} />

                    Sell

                   </button>

                  </Link>

                 </div>

                </td>

               </tr>

              )
             )
            }

           </tbody>

          </table>

         </div>

        )
      }

     </div>

    </div>

   </DashboardLayout>

  </ProtectedRoute>

 )
}