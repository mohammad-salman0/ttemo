"use client"

import {
 useState,
} from "react"

import Link
 from "next/link"

import DashboardLayout
 from "@/layouts/DashboardLayout"

import ProtectedRoute
 from "@/components/ProtectedRoutes"

import AdvisorPieChart
 from "@/components/AdvisorPieChart"

import api
 from "@/services/api"

import {

 Brain,
 ShieldCheck,
 TrendingUp,
 PieChart,
 Sparkles,

} from "lucide-react"


export default function
AIAdvisorPage() {

 const [amount,
  setAmount] =
   useState("10000")

 const [riskLevel,
  setRiskLevel] =
   useState("moderate")

 const [duration,
  setDuration] =
   useState("long")

 const [halalPreference,
  setHalalPreference] =
   useState("halal")

 const [sector,
  setSector] =
   useState("All")

 const [loading,
  setLoading] =
   useState(false)

 const [result,
  setResult] =
   useState<any>(null)


 /*
 ====================================
 GENERATE AI ADVICE
 ====================================
 */

 const generateAdvice =
  async () => {

   try {

    setLoading(true)

    const response =
     await api.post(

      "/ai-advisor/generate",

      {

       amount:
        Number(amount),

       riskLevel,

       duration,

       halalPreference,

       sectors: [sector],

      }

     )

    setResult(
     response.data
    )

   } catch (error) {

    console.log(error)

   } finally {

    setLoading(false)

   }

  }


 return (

  <ProtectedRoute>

   <DashboardLayout>

    <div className="space-y-10">

     {/* HEADER */}
     <div>

      <h1
       className="
        text-5xl
        font-bold
        text-gray-900
       "
      >

       AI Investment Advisor

      </h1>

      <p
       className="
        text-gray-500
        mt-4
        text-lg
        max-w-3xl
        leading-8
       "
      >

       Generate intelligent halal
       investment portfolios powered
       by AI-based diversification,
       risk analysis, and compliance scoring.

      </p>

     </div>


     {/* FORM */}
     <div
      className="
       bg-white
       rounded-3xl
       border
       shadow-sm
       p-8
       grid
       grid-cols-1
       md:grid-cols-2
       gap-6
      "
     >

      {/* AMOUNT */}
      <div>

       <label
        className="
         text-sm
         font-medium
         text-gray-700
        "
       >

        Investment Amount

       </label>

       <input

        type="number"

        value={amount}

        onChange={(e) =>
         setAmount(
          e.target.value
         )
        }

        className="
         w-full
         mt-2
         border
         rounded-2xl
         px-5
         py-4
         outline-none
        "
       />

      </div>


      {/* RISK */}
      <div>

       <label
        className="
         text-sm
         font-medium
         text-gray-700
        "
       >

        Risk Level

       </label>

       <select

        value={riskLevel}

        onChange={(e) =>
         setRiskLevel(
          e.target.value
         )
        }

        className="
         w-full
         mt-2
         border
         rounded-2xl
         px-5
         py-4
         outline-none
        "
       >

        <option value="low">
         Low
        </option>

        <option value="moderate">
         Moderate
        </option>

        <option value="high">
         High
        </option>

       </select>

      </div>


      {/* DURATION */}
      <div>

       <label
        className="
         text-sm
         font-medium
         text-gray-700
        "
       >

        Investment Duration

       </label>

       <select

        value={duration}

        onChange={(e) =>
         setDuration(
          e.target.value
         )
        }

        className="
         w-full
         mt-2
         border
         rounded-2xl
         px-5
         py-4
         outline-none
        "
       >

        <option value="short">
         Short Term
        </option>

        <option value="medium">
         Medium Term
        </option>

        <option value="long">
         Long Term
        </option>

       </select>

      </div>


      {/* HALAL */}
      <div>

       <label
        className="
         text-sm
         font-medium
         text-gray-700
        "
       >

        Halal Preference

       </label>

       <select

        value={halalPreference}

        onChange={(e) =>
         setHalalPreference(
          e.target.value
         )
        }

        className="
         w-full
         mt-2
         border
         rounded-2xl
         px-5
         py-4
         outline-none
        "
       >

        <option value="halal">
         Halal Only
        </option>

        <option value="review">
         Include Review Needed
        </option>

        <option value="all">
         Include All
        </option>

       </select>

      </div>


      {/* SECTOR */}
      <div>

       <label
        className="
         text-sm
         font-medium
         text-gray-700
        "
       >

        Preferred Sector

       </label>

       <select

        value={sector}

        onChange={(e) =>
         setSector(
          e.target.value
         )
        }

        className="
         w-full
         mt-2
         border
         rounded-2xl
         px-5
         py-4
         outline-none
        "
       >

        <option>
         All
        </option>

        <option>
         Technology
        </option>

        <option>
         Healthcare
        </option>

        <option>
         FMCG
        </option>

        <option>
         Energy
        </option>

        <option>
         Automobile
        </option>

       </select>

      </div>


      {/* BUTTON */}
      <div
       className="
        flex
        items-end
       "
      >

       <button

        onClick={
         generateAdvice
        }

        className="
         w-full
         bg-black
         hover:bg-gray-900
         text-white
         rounded-2xl
         py-4
         font-semibold
         transition
        "
       >

        {
         loading

          ? "Generating..."

          : "Generate AI Portfolio"
        }

       </button>

      </div>

     </div>


     {/* RESULTS */}
     {
      result && (

       <div className="space-y-8">

        {/* SCORE CARDS */}
        <div
         className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
         "
        >

         <div
          className="
           bg-white
           rounded-3xl
           border
           p-7
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

            <p className="text-gray-500 text-sm">

             Halal Score

            </p>

            <h2
             className="
              text-4xl
              font-bold
              mt-4
              text-emerald-600
             "
            >

             {result.halalScore}%

            </h2>

           </div>

           <ShieldCheck
            size={34}
            className="text-emerald-500"
           />

          </div>

         </div>


         <div
          className="
           bg-white
           rounded-3xl
           border
           p-7
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

            <p className="text-gray-500 text-sm">

             Risk Profile

            </p>

            <h2
             className="
              text-3xl
              font-bold
              mt-4
             "
            >

             {result.riskLevel}

            </h2>

           </div>

           <TrendingUp
            size={34}
            className="text-blue-500"
           />

          </div>

         </div>


         <div
          className="
           bg-white
           rounded-3xl
           border
           p-7
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

            <p className="text-gray-500 text-sm">

             Diversification

            </p>

            <h2
             className="
              text-4xl
              font-bold
              mt-4
             "
            >

             {
              result.diversificationScore
             }/10

            </h2>

           </div>

           <PieChart
            size={34}
            className="text-orange-500"
           />

          </div>

         </div>


         <div
          className="
           bg-white
           rounded-3xl
           border
           p-7
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

            <p className="text-gray-500 text-sm">

             AI Confidence

            </p>

            <h2
             className="
              text-4xl
              font-bold
              mt-4
              text-purple-600
             "
            >

             92%

            </h2>

           </div>

           <Brain
            size={34}
            className="text-purple-500"
           />

          </div>

         </div>

        </div>


        {/* PIE CHART */}
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

          <div>

           <h2
            className="
             text-3xl
             font-bold
            "
           >

            Portfolio Allocation

           </h2>

           <p
            className="
             text-gray-500
             mt-2
            "
           >

            AI-generated portfolio diversification.

           </p>

          </div>

         </div>


         <AdvisorPieChart
          data={result.portfolio}
         />

        </div>


        {/* STOCKS */}
        <div
         className="
          bg-white
          rounded-3xl
          border
          shadow-sm
          p-8
          space-y-6
         "
        >

         <div>

          <h2
           className="
            text-3xl
            font-bold
           "
          >

           Recommended Portfolio

          </h2>

         </div>


         {
          result.portfolio.map(
           (
            stock: any,
            index: number
           ) => (

            <Link

             href={`/stocks/${stock.symbol}`}

             key={index}

             className="block"

            >

             <div

              className="
               border
               rounded-3xl
               p-7
               flex
               flex-col
               lg:flex-row
               lg:justify-between
               gap-6
               hover:shadow-2xl
               hover:border-black
               transition-all
               duration-300
               cursor-pointer
               bg-white
              "
             >

              <div>

               <div
                className="
                 flex
                 items-center
                 gap-3
                "
               >

                <h3
                 className="
                  text-2xl
                  font-bold
                 "
                >

                 {stock.symbol}

                </h3>


                <span
                 className={`
                  px-4
                  py-2
                  rounded-xl
                  text-sm
                  font-medium

                  ${
                   stock.aiPrediction === 1

                    ? "bg-green-100 text-green-700"

                    : "bg-red-100 text-red-700"
                  }
                 `}
                >

                 {
                  stock.aiPrediction === 1

                   ? "Bullish AI"

                   : "Bearish AI"
                 }

                </span>

               </div>


               <p
                className="
                 text-gray-500
                 mt-2
                "
               >

                {stock.companyName}

               </p>


               <div
                className="
                 flex
                 gap-3
                 mt-4
                 flex-wrap
                "
               >

                <span
                 className="
                  bg-gray-100
                  px-4
                  py-2
                  rounded-xl
                  text-sm
                 "
                >

                 {stock.industry}

                </span>


                <span
                 className={`
                  px-4
                  py-2
                  rounded-xl
                  text-sm

                  ${
                   stock.halalStatus ===
                   "Halal"

                    ? "bg-emerald-100 text-emerald-700"

                    : "bg-yellow-100 text-yellow-700"
                  }
                 `}
                >

                 {stock.halalStatus}

                </span>


                <span
                 className="
                  bg-purple-100
                  text-purple-700
                  px-4
                  py-2
                  rounded-xl
                  text-sm
                  font-medium
                 "
                >

                 AI Confidence:
                 {" "}

                 {stock.aiConfidence}%

                </span>

               </div>


               <p
                className="
                 text-gray-600
                 mt-6
                 leading-8
                "
               >

                {stock.reason}

               </p>


               {/* AI BAR */}
               <div className="mt-6">

                <div
                 className="
                  flex
                  items-center
                  justify-between
                  mb-2
                 "
                >

                 <span
                  className="
                   text-sm
                   text-gray-500
                  "
                 >

                  AI Confidence

                 </span>

                 <span
                  className="
                   text-sm
                   font-semibold
                   text-purple-600
                  "
                 >

                  {stock.aiConfidence}%

                 </span>

                </div>


                <div
                 className="
                  w-full
                  h-3
                  bg-gray-100
                  rounded-full
                  overflow-hidden
                 "
                >

                 <div

                  className="
                   h-full
                   bg-purple-500
                   rounded-full
                   transition-all
                  "

                  style={{

                   width:
                    `${stock.aiConfidence}%`

                  }}

                 />

                </div>

               </div>

              </div>


              <div
               className="
                lg:text-right
               "
              >

               <h2
                className="
                 text-5xl
                 font-bold
                "
               >

                {stock.allocation}%

               </h2>

               <p
                className="
                 text-gray-500
                 mt-3
                "
               >

                Allocation

               </p>


               <div className="mt-8">

                <h3
                 className="
                  text-3xl
                  font-bold
                  text-emerald-600
                 "
                >

                 ₹
                 {
                  stock.estimatedInvestment
                 }

                </h3>

                <p
                 className="
                  text-gray-500
                  mt-2
                 "
                >

                 Suggested Investment

                </p>

               </div>

              </div>

             </div>

            </Link>

           )
          )
         }

        </div>


        {/* AI SUMMARY */}
        <div
         className="
          bg-gradient-to-r
          from-black
          to-gray-800
          rounded-3xl
          p-8
          text-white
         "
        >

         <div
          className="
           flex
           items-center
           gap-3
           mb-5
          "
         >

          <Sparkles
           className="
            text-yellow-400
           "
          />

          <h2
           className="
            text-3xl
            font-bold
           "
          >

           AI Summary

          </h2>

         </div>

         <p
          className="
           text-lg
           text-gray-200
           leading-9
          "
         >

          {result.summary}

         </p>

        </div>

       </div>

      )
     }

    </div>

   </DashboardLayout>

  </ProtectedRoute>

 )
}