"use client"

import Navbar from "@/components/Navbar"

import Footer from "@/components/Footer"

export default function CreateTicket() {

 return (

  <div>

   <Navbar />

   <div className="min-h-screen bg-[#F8FAFC] py-20 px-6">

    <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl border shadow-sm">

     <h1 className="text-4xl font-bold mb-6">
      Create Support Ticket
     </h1>

     <p className="text-gray-500 mb-8">

      Describe your issue and our support
      team will get back to you.

     </p>


     {/* SUBJECT */}
     <div className="mb-6">

      <label className="block mb-2 font-medium">
       Subject
      </label>

      <input
       type="text"
       placeholder="Enter issue subject"
       className="w-full border rounded-xl px-4 py-3 outline-none"
      />

     </div>


     {/* MESSAGE */}
     <div className="mb-8">

      <label className="block mb-2 font-medium">
       Message
      </label>

      <textarea
       rows={7}
       placeholder="Describe your issue..."
       className="w-full border rounded-xl px-4 py-3 outline-none"
      />

     </div>


     {/* BUTTON */}
     <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition">

      Submit Ticket

     </button>

    </div>

   </div>

   <Footer />

  </div>

 )
}