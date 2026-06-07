import Sidebar
 from "@/components/Sidebar"

import DashboardNavbar
 from "@/components/DashboardNavbar"


export default function DashboardLayout({
 children,
}: {
 children: React.ReactNode
}) {

 return (

  <div
   className="
    min-h-screen
    bg-[#F8FAFC]
   "
  >

   {/* SIDEBAR */}
   <Sidebar />


   {/* MAIN CONTENT */}
   <div
    className="
     ml-[270px]
     min-h-screen
     flex
     flex-col
    "
   >

    {/* NAVBAR */}
    <div
     className="
      sticky
      top-0
      z-40
      bg-[#F8FAFC]/90
      backdrop-blur
      border-b
      border-gray-200
     "
    >

     <DashboardNavbar />

    </div>


    {/* PAGE CONTENT */}
    <main
     className="
      flex-1
      p-8
     "
    >

     {children}

    </main>

   </div>

  </div>

 )

}