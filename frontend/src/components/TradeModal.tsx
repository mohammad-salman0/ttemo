"use client"

import {
 useState,
} from "react"

import api
 from "@/services/api"


type Props = {

 isOpen: boolean

 onClose: () => void

 type:
  | "BUY"
  | "SELL"

 symbol: string

 companyName: string

 price: number

 onSuccess?: () => void

}


export default function
TradeModal({

 isOpen,
 onClose,
 type,
 symbol,
 companyName,
 price,
 onSuccess,

}: Props) {

 const [quantity,
  setQuantity] =

  useState(1)

 const [loading,
  setLoading] =

  useState(false)


 if (!isOpen)
  return null


 const total =
  quantity * price


 const handleTrade =
  async () => {

   try {

    setLoading(true)

    const endpoint =

     type === "BUY"

      ? "/orders/buy"

      : "/orders/sell"


    await api.post(

     endpoint,

     {

      symbol,
      companyName,
      quantity,
      price,

     }

    )


    alert(
     `${type} order executed`
    )


    onClose()


    if (onSuccess) {

     onSuccess()

    }

   } catch (error: any) {

    console.log(error)

    alert(

     error?.response?.data
      ?.message ||

     "Trade failed"

    )

   } finally {

    setLoading(false)

   }

  }


 return (

  <div
   className="
    fixed inset-0
    bg-black/40
    z-50
    flex
    items-center
    justify-center
    p-4
   "
  >

   <div
    className="
     bg-white
     rounded-3xl
     w-full
     max-w-md
     p-8
     shadow-2xl
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

       {type}
       {" "}
       {symbol}

      </h2>


      <p
       className="
        text-gray-500
        mt-2
       "
      >

       {companyName}

      </p>

     </div>


     <button
      onClick={onClose}
      className="
       text-gray-500
       text-2xl
      "
     >

      ×

     </button>

    </div>


    {/* PRICE */}

    <div className="mb-6">

     <p
      className="
       text-sm
       text-gray-500
       mb-2
      "
     >

      Current Price

     </p>

     <h3
      className="
       text-3xl
       font-bold
      "
     >

      ₹ {price}

     </h3>

    </div>


    {/* QUANTITY */}

    <div className="mb-6">

     <label
      className="
       block
       text-sm
       text-gray-500
       mb-2
      "
     >

      Quantity

     </label>

     <input

      type="number"

      min={1}

      value={quantity}

      onChange={(e) =>

       setQuantity(
        Number(
         e.target.value
        )
       )

      }

      className="
       w-full
       border
       rounded-2xl
       px-4
       py-3
       outline-none
      "

     />

    </div>


    {/* TOTAL */}

    <div
     className="
      bg-gray-50
      rounded-2xl
      p-5
      mb-8
     "
    >

     <div
      className="
       flex
       justify-between
      "
     >

      <span
       className="
        text-gray-500
       "
      >

       Total Amount

      </span>


      <span
       className="
        font-bold
        text-xl
       "
      >

       ₹
       {" "}

       {total.toLocaleString()}

      </span>

     </div>

    </div>


    {/* BUTTONS */}

    <div
     className="
      flex
      gap-4
     "
    >

     <button

      onClick={onClose}

      className="
       flex-1
       border
       rounded-2xl
       py-3
       font-medium
      "
     >

      Cancel

     </button>


     <button

      onClick={handleTrade}

      disabled={loading}

      className={`
       flex-1
       rounded-2xl
       py-3
       font-medium
       text-white

       ${
        type === "BUY"

         ? "bg-emerald-500"

         : "bg-red-500"
       }
      `}
     >

      {
       loading

        ? "Processing..."

        : type
      }

     </button>

    </div>

   </div>

  </div>

 )

}