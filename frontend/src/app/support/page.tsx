"use client"

import Navbar from "@/components/Navbar"

import Footer from "@/components/Footer"

export default function Support() {

 return (

  <div>

   <Navbar />

   {/* SUPPORT HERO */}
   <section className="bg-blue-600 text-white py-20 px-6 lg:px-20">

    <div className="max-w-6xl mx-auto">

     <h1 className="text-4xl font-bold mb-6">
      Support Portal
     </h1>

     <p className="mb-6 text-blue-100">

      Search for answers or explore our guides
      to learn more about investing.

     </p>

     <input
      placeholder="Eg: Why is my order getting rejected?"
      className="w-full max-w-xl p-4 rounded-lg text-black"
     />

    </div>

   </section>


   {/* HELP LINKS */}
   <section className="py-20 px-6 lg:px-20">

    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

     {/* LEFT */}
     <div>

      <h2 className="text-2xl font-semibold mb-6">
       Helpful Resources
      </h2>

      <ul className="space-y-4 text-blue-600">

       <li>

        <a
         href="https://www.islamicfinanceguru.com/investing"
         target="_blank"
        >

         Halal Investing Guides

        </a>

       </li>

       <li>

        <a
         href="https://investor.sebi.gov.in/"
         target="_blank"
        >

         SEBI Investor Awareness Portal

        </a>

       </li>

       <li>

        <a
         href="https://aaoifi.com/shariyah-standards/?lang=en"
         target="_blank"
        >

         AAOIFI Shariah Standards

        </a>

       </li>

      </ul>

     </div>


     {/* RIGHT */}
     <div>

      <h2 className="text-2xl font-semibold mb-6">
       Featured Articles
      </h2>

      <ul className="space-y-4 text-blue-600">

       <li>

        <a
         href="https://appreciatewealth.com/blog/the-stock-market-for-beginners"
         target="_blank"
        >

         Stock Market for Beginners

        </a>

       </li>

       <li>

        <a
         href="https://www.bajajfinserv.in/delivery-trading"
         target="_blank"
        >

         What is Delivery Trading

        </a>

       </li>

      </ul>

     </div>

    </div>

   </section>


   {/* CTA */}
   <section className="bg-gray-50 py-16 text-center">

    <h2 className="text-2xl font-bold mb-4">
     Still need help?
    </h2>

    <p className="text-gray-600 mb-6">

     Create a support ticket and our team
     will assist you.

    </p>

    <a href="/support/ticket">

     <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">

      Create Ticket

     </button>

    </a>

   </section>

   <Footer />

  </div>

 )
}