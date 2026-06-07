"use client"

import {
 useState,
} from "react"

import api
 from "@/services/api"

import {
 usePortfolio,
} from "@/context/PortfolioContext"


type Props = {

 onClose:
  () => void

}


export default function
AddMoneyModal({

 onClose,

}: Props) {

 const [amount,
  setAmount] =

  useState("")

 const [loading,
  setLoading] =

  useState(false)

 const {

  refreshPortfolio,

 } = usePortfolio()


 const handleAddMoney =
  async () => {

   try {

    setLoading(true)

    await api.post(

     "/wallet/add",

     {

      amount:
       Number(amount),

     }

    )


    await refreshPortfolio()


    alert(
     "Money added successfully"
    )

    onClose()

   } catch (error) {

    console.log(error)

    alert(
     "Failed to add money"
    )

   } finally {

    setLoading(false)

   }

  }


 return (

  <div
   className="
    fixed
    inset-0
    bg-black/40
    flex
    items-center
    justify-center
    z-50
   "
  >

   <div
    className="
     bg-white
     rounded-3xl
     p-8
     w-full
     max-w-md
    "
   >

    <h2
     className="
      text-2xl
      font-bold
      mb-6
     "
    >

     Add Money

    </h2>


    <input

     type="number"

     placeholder="
      Enter amount
     "

     value={amount}

     onChange={(e) =>
      setAmount(
       e.target.value
      )
     }

     className="
      w-full
      border
      rounded-2xl
      px-5
      py-4
      outline-none
      mb-6
     "

    />


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
      "
     >

      Cancel

     </button>


     <button

      onClick={handleAddMoney}

      disabled={loading}

      className="
       flex-1
       bg-emerald-500
       text-white
       rounded-2xl
       py-3
      "
     >

      {
       loading

        ? "Adding..."

        : "Add Money"
      }

     </button>

    </div>

   </div>

  </div>

 )
}