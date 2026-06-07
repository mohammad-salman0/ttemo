"use client"

import {

 AreaChart,
 Area,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer,

} from "recharts"


const data = [

 {
  day: "Mon",
  value: 220000,
 },

 {
  day: "Tue",
  value: 224000,
 },

 {
  day: "Wed",
  value: 221500,
 },

 {
  day: "Thu",
  value: 228000,
 },

 {
  day: "Fri",
  value: 232000,
 },

 {
  day: "Sat",
  value: 238000,
 },

 {
  day: "Sun",
  value: 245000,
 },

]


export default function DashboardChart() {

 return (

  <div
   className="
    w-full
    min-h-[350px]
   "
  >

   <ResponsiveContainer
    width="100%"
    height={350}
   >

    <AreaChart
     data={data}
     margin={{

      top: 10,
      right: 20,
      left: -10,
      bottom: 0,

     }}
    >

     <defs>

      <linearGradient
       id="colorValue"
       x1="0"
       y1="0"
       x2="0"
       y2="1"
      >

       <stop
        offset="5%"
        stopColor="#2563EB"
        stopOpacity={0.35}
       />

       <stop
        offset="95%"
        stopColor="#2563EB"
        stopOpacity={0}
       />

      </linearGradient>

     </defs>


     <XAxis

      dataKey="day"

      axisLine={false}

      tickLine={false}

      tick={{
       fill: "#6B7280",
       fontSize: 12,
      }}

     />


     <YAxis

      axisLine={false}

      tickLine={false}

      tick={{
       fill: "#6B7280",
       fontSize: 12,
      }}

      tickFormatter={(value) =>
       `₹${value / 1000}k`
      }

     />


     <Tooltip

      contentStyle={{

       borderRadius: "12px",
       border: "none",
       boxShadow:
        "0 4px 20px rgba(0,0,0,0.08)",

      }}

      formatter={(value: number) => [
       `₹ ${value.toLocaleString()}`,
       "Portfolio",
      ]}

     />


     <Area

      type="monotone"

      dataKey="value"

      stroke="#2563EB"

      strokeWidth={4}

      fillOpacity={1}

      fill="url(#colorValue)"

     />

    </AreaChart>

   </ResponsiveContainer>

  </div>

 )

}