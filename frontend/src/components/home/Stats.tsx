"use client"

export default function Stats() {

 return (

  <section className="w-full py-20 px-6 lg:px-20 bg-gray-50">

   <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}
    <div>

     <h1 className="text-4xl font-bold text-gray-900 mb-8">
      Trust with Confidence
     </h1>

     <div className="space-y-6">

      <div>

       <h3 className="text-xl font-semibold">
        Faith-Driven Finance
       </h3>

       <p className="text-gray-600 mt-2">
        Invest confidently with stocks screened for Shariah compliance.
       </p>

      </div>

      <div>

       <h3 className="text-xl font-semibold">
        Transparency Always
       </h3>

       <p className="text-gray-600 mt-2">
        No hidden charges — just clear halal insights.
       </p>

      </div>

      <div>

       <h3 className="text-xl font-semibold">
        Smarter Halal Investing
       </h3>

       <p className="text-gray-600 mt-2">
        Our AI keeps every investment aligned with your faith.
       </p>

      </div>

      <div>

       <h3 className="text-xl font-semibold">
        Empowering Investors
       </h3>

       <p className="text-gray-600 mt-2">
        We help investors grow with knowledge and integrity.
       </p>

      </div>

     </div>

    </div>


    {/* RIGHT IMAGE */}
    <div className="flex justify-center">

     <img
      src="/media/shakinghands.jpg"
      alt="TwinTrade Ecosystem"
      className="rounded-xl shadow-md border border-gray-200"
      style={{ maxHeight: "420px" }}
     />

    </div>

   </div>

  </section>

 )
}