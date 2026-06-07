"use client"

import {

 PieChart,
 Pie,
 Cell,
 Tooltip,
 ResponsiveContainer,

} from "recharts"


type PortfolioItem = {

 symbol: string

 allocation: number

}


type Props = {

 data: PortfolioItem[]

}


export default function
AdvisorPieChart({

 data,

}: Props) {

 /*
 ====================================
 SAFE DATA
 ====================================
 */

 const safeData =

  (data || [])

   .filter(
    (item) => item
   )

   .map((item) => ({

    symbol:
     item.symbol,

    allocation:
     Number(
      item.allocation || 0
     ),

   }))


 /*
 ====================================
 COLORS
 ====================================
 */

 const COLORS = [

  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",

 ]


 /*
 ====================================
 EMPTY STATE
 ====================================
 */

 if (
  safeData.length === 0
 ) {

  return (

   <div
    className="
     w-full
     h-[350px]
     flex
     items-center
     justify-center
     text-gray-400
    "
   >

    No allocation data available

   </div>

  )

 }


 return (

  <div
   className="
    w-full
    h-[350px]
   "
  >

   <ResponsiveContainer
    width="100%"
    height="100%"
   >

    <PieChart>

     <Pie

      data={safeData}

      dataKey="allocation"

      nameKey="symbol"

      cx="50%"

      cy="50%"

      outerRadius={110}

      innerRadius={60}

      paddingAngle={3}

      label

     >

      {
       safeData.map(
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

    </PieChart>

   </ResponsiveContainer>

  </div>

 )
}