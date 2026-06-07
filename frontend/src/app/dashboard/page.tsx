"use client"

import {
 useEffect,
 useState,
} from "react"

import Link from "next/link"

import DashboardLayout
 from "@/layouts/DashboardLayout"

import ProtectedRoute
 from "@/components/ProtectedRoutes"

import DashboardChart
 from "@/components/DashboardChart"

import TopMovers
 from "@/components/TopMovers"

import AddMoneyModal
 from "@/components/AddMoneyModal"

import {

 ArrowUpRight,
 TrendingUp,
 Wallet,
 Brain,
 Star,
 ShieldCheck,
 Activity,

} from "lucide-react"

import {
 usePortfolio,
} from "@/context/PortfolioContext"

import api
 from "@/services/api"


export default function DashboardPage() {

 const [showAddMoney,
  setShowAddMoney] =
  useState(false)


 const {

  portfolio,
  orders,
  loading,

 } = usePortfolio()


 /*
 ====================================
 REAL AI INSIGHTS
 ====================================
 */

 const [aiInsights,
  setAiInsights] =

  useState({

   sentiment:
    "Neutral",

   confidence: 50,

   health:
    "Moderate",

   recommendation:
    "Loading AI insights...",

  })


 /*
 ====================================
 FETCH AI INSIGHTS
 ====================================
 */

 const fetchAIInsights =
  async () => {

   try {

    const response =
     await api.get(
      "/ai/insights"
     )

    setAiInsights(
     response.data
    )

   } catch (error) {

    console.log(error)

   }

  }


 /*
 ====================================
 LOAD AI
 ====================================
 */

 useEffect(() => {

  fetchAIInsights()

 }, [])


 /*
 ====================================
 DASHBOARD STATS
 ====================================
 */

 const stats = [

  {
   title:
    "Portfolio Value",

   value:
    `₹ ${
     portfolio?.currentPortfolioValue
      ?.toLocaleString()
      || 0
    }`,

   change:
    `${portfolio?.totalReturnPercentage || 0}%`,

   icon: Wallet,
  },

  {
   title:
    "Total Profit",

   value:
    `₹ ${
     portfolio?.totalProfit
      ?.toLocaleString()
      || 0
    }`,

   change:
    portfolio?.totalProfit >= 0
     ? "Profitable"
     : "Loss",

   icon:
    TrendingUp,
  },

  {
   title:
    "Total Holdings",

   value:
    `${
     portfolio?.holdings
      ?.length || 0
    }`,

   change:
    aiInsights.health,

   icon: Star,
  },

  {
   title:
    "AI Confidence",

   value:
    `${aiInsights.confidence}%`,

   change:
    aiInsights.sentiment,

   icon: Brain,
  },

 ]


 /*
 ====================================
 LOADING
 ====================================
 */

 if (loading) {

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
        text-lg
        text-gray-500
       "
      >

       Loading Dashboard...

      </p>

     </div>

    </DashboardLayout>

   </ProtectedRoute>

  )

 }


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

       Welcome Back 👋

      </h1>


      <p
       className="
        text-gray-500
        mt-3
        text-lg
       "
      >

       AI-powered halal investing
       intelligence dashboard.

      </p>


      {/* ACTIONS */}

      <div
       className="
        flex
        gap-4
        mt-6
       "
      >

       <button

        onClick={() =>
         setShowAddMoney(true)
        }

        className="
         bg-emerald-500
         hover:bg-emerald-600
         text-white
         px-6
         py-3
         rounded-2xl
         font-semibold
         transition
        "

       >

        + Add Money

       </button>


       <Link
        href="/ai-advisor"
       >

        <button
         className="
          bg-black
          hover:bg-gray-900
          text-white
          px-6
          py-3
          rounded-2xl
          font-semibold
          transition
         "
        >

         Open AI Advisor

        </button>

       </Link>

      </div>

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

      {
       stats.map((item) => {

        const Icon =
         item.icon

        return (

         <div

          key={item.title}

          className="
           bg-white
           rounded-3xl
           border
           p-7
           shadow-sm
           hover:shadow-lg
           transition
          "
         >

          <div
           className="
            flex items-center
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

             {item.title}

            </p>


            <h2
             className="
              text-3xl
              font-bold
              mt-3
              text-gray-900
             "
            >

             {item.value}

            </h2>

           </div>


           <div
            className="
             w-14 h-14
             rounded-2xl
             bg-blue-100
             flex items-center
             justify-center
             text-blue-600
            "
           >

            <Icon size={28} />

           </div>

          </div>


          <div
           className={`
            flex items-center
            gap-2
            mt-6
            font-medium

            ${
             item.change
              .toString()
              .includes("-")

              ? "text-red-500"

              : "text-green-600"
            }
           `}
          >

           <ArrowUpRight size={18} />

           <span>

            {item.change}

           </span>

          </div>

         </div>

        )
       })
      }

     </div>


     {/* MARKET + AI */}

     <div
      className="
       grid
       grid-cols-1
       xl:grid-cols-3
       gap-6
      "
     >

      {/* CHART */}

      <div
       className="
        xl:col-span-2
        bg-white
        rounded-3xl
        border
        p-8
        shadow-sm
       "
      >

       <div
        className="
         flex items-center
         justify-between
         mb-8
        "
       >

        <div>

         <h2
          className="
           text-2xl
           font-bold
           text-gray-900
          "
         >

          Market Overview

         </h2>


         <p className="text-gray-500 mt-2">

          Live portfolio analytics
          and performance tracking.

         </p>

        </div>

       </div>


       <DashboardChart />

      </div>


      {/* AI INSIGHTS */}

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
         mb-6
        "
       >

        <h2
         className="
          text-2xl
          font-bold
          text-gray-900
         "
        >

         AI Insights

        </h2>


        <Brain
         className="
          text-blue-600
         "
        />

       </div>


       <div className="space-y-5">

        <div
         className="
          bg-blue-50
          rounded-2xl
          p-5
         "
        >

         <div className="flex items-center gap-3">

          <Activity
           className="
            text-blue-600
           "
          />

          <h3
           className="
            font-semibold
            text-blue-700
           "
          >

           Market Sentiment

          </h3>

         </div>

         <p
          className="
           text-sm
           text-gray-600
           mt-3
           leading-7
          "
         >

          Current AI sentiment:
          {" "}

          <span className="font-semibold">

           {aiInsights.sentiment}

          </span>

         </p>

        </div>


        <div
         className="
          bg-green-50
          rounded-2xl
          p-5
         "
        >

         <div className="flex items-center gap-3">

          <ShieldCheck
           className="
            text-green-600
           "
          />

          <h3
           className="
            font-semibold
            text-green-700
           "
          >

           Portfolio Health

          </h3>

         </div>

         <p
          className="
           text-sm
           text-gray-600
           mt-3
           leading-7
          "
         >

          Diversification level:
          {" "}

          <span className="font-semibold">

           {aiInsights.health}

          </span>

         </p>

        </div>


        <div
         className="
          bg-orange-50
          rounded-2xl
          p-5
         "
        >

         <div className="flex items-center gap-3">

          <Brain
           className="
            text-orange-600
           "
          />

          <h3
           className="
            font-semibold
            text-orange-700
           "
          >

           AI Recommendation

          </h3>

         </div>

         <p
          className="
           text-sm
           text-gray-600
           mt-3
           leading-7
          "
         >

          {aiInsights.recommendation}

         </p>

        </div>

       </div>

      </div>

     </div>


     {/* TOP MOVERS */}

     <TopMovers />


     {/* RECENT ORDERS */}

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
        text-gray-900
        mb-8
       "
      >

       Recent Orders

      </h2>


      <div className="space-y-6">

       {
        orders.length === 0

         ? (

          <p
           className="
            text-gray-500
           "
          >

           No orders yet

          </p>

         )

         : (

          orders
           .slice(0, 5)
           .map((order, index) => (

            <div

             key={index}

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

               {
                order.orderType
               }

               {" "}

               {
                order.symbol
               }

              </h3>


              <p
               className="
                text-gray-500
                text-sm
                mt-1
               "
              >

               Qty:
               {" "}

               {
                order.quantity
               }

               {" "}

               • ₹

               {
                order.price
               }

              </p>

             </div>


             <span
              className={`
               font-medium

               ${
                order.orderType
                 === "BUY"

                  ? "text-emerald-600"

                  : "text-red-500"
               }
              `}
             >

              {
               order.orderType
              }

             </span>

            </div>

           ))
         )
       }

      </div>

     </div>

    </div>


    {/* ADD MONEY MODAL */}

    {
     showAddMoney && (

      <AddMoneyModal

       onClose={() =>
        setShowAddMoney(false)
       }

      />

     )
    }

   </DashboardLayout>

  </ProtectedRoute>

 )
}