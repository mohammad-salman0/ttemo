"use client"

import DashboardLayout
 from "@/layouts/DashboardLayout"

import ProtectedRoute
 from "@/components/ProtectedRoutes"

import {
 usePortfolio,
} from "@/context/PortfolioContext"


export default function
OrdersPage() {

 const {

  orders,
  loading,

 } = usePortfolio()


 /*
   LOADING
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

       Loading Orders...

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

       Orders

      </h1>


      <p
       className="
        text-gray-500
        mt-3
        text-lg
       "
      >

       Complete trading history
       and executed orders.

      </p>

     </div>


     {/* ORDERS TABLE */}
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
       "
      >

       <h2
        className="
         text-2xl
         font-bold
        "
       >

        Order History

       </h2>

      </div>


      {
       orders.length === 0

        ? (

         <div
          className="
           p-10
           text-center
           text-gray-500
          "
         >

          No orders yet

         </div>

        )

        : (

         <div className="overflow-x-auto">

          <table className="w-full">

           <thead
            className="
             bg-gray-50
            "
           >

            <tr>

             <th
              className="
               text-left
               px-8
               py-5
               text-sm
               font-semibold
              "
             >

              Type

             </th>


             <th
              className="
               text-left
               px-8
               py-5
               text-sm
               font-semibold
              "
             >

              Symbol

             </th>


             <th
              className="
               text-left
               px-8
               py-5
               text-sm
               font-semibold
              "
             >

              Quantity

             </th>


             <th
              className="
               text-left
               px-8
               py-5
               text-sm
               font-semibold
              "
             >

              Price

             </th>


             <th
              className="
               text-left
               px-8
               py-5
               text-sm
               font-semibold
              "
             >

              Total

             </th>


             <th
              className="
               text-left
               px-8
               py-5
               text-sm
               font-semibold
              "
             >

              Date

             </th>

            </tr>

           </thead>


           <tbody>

            {
             orders.map(

              (
               order,
               index
              ) => (

               <tr

                key={index}

                className="
                 border-t
                "
               >

                {/* TYPE */}
                <td
                 className="
                  px-8
                  py-5
                 "
                >

                 <span
                  className={`
                   px-4
                   py-2
                   rounded-full
                   text-sm
                   font-semibold

                   ${
                    order.orderType
                     === "BUY"

                      ? "bg-emerald-100 text-emerald-700"

                      : "bg-red-100 text-red-700"
                   }
                  `}
                 >

                  {
                   order.orderType
                  }

                 </span>

                </td>


                {/* SYMBOL */}
                <td
                 className="
                  px-8
                  py-5
                  font-semibold
                 "
                >

                 {
                  order.symbol
                 }

                </td>


                {/* QTY */}
                <td
                 className="
                  px-8
                  py-5
                 "
                >

                 {
                  order.quantity
                 }

                </td>


                {/* PRICE */}
                <td
                 className="
                  px-8
                  py-5
                 "
                >

                 ₹
                 {" "}

                 {
                  order.price
                 }

                </td>


                {/* TOTAL */}
                <td
                 className="
                  px-8
                  py-5
                  font-semibold
                 "
                >

                 ₹
                 {" "}

                 {
                  (
                   order.price *
                   order.quantity
                  ).toLocaleString()
                 }

                </td>


                {/* DATE */}
                <td
                 className="
                  px-8
                  py-5
                  text-gray-500
                 "
                >

                 {
                  new Date(
                   order.createdAt
                  ).toLocaleString()
                 }

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