"use client"

import Link
 from "next/link"

import {
 motion,
 AnimatePresence,
} from "framer-motion"

import {
 useEffect,
 useState,
} from "react"


export default function Hero() {

 /*
 ===================================
 IMAGES
 ===================================
 */

 const images = [

  "/media/Screenshot 2026-06-07 200826.png",

  "/media/Screenshot 2026-06-07 200713.png",

  "/media/Screenshot 2026-06-07 200907.png",

  "/media/Screenshot 2026-06-07 183922.png",

 ]


 /*
 ===================================
 STATE
 ===================================
 */

 const [currentImage,
  setCurrentImage] =
   useState(0)


 /*
 ===================================
 AUTO SLIDER
 ===================================
 */

 useEffect(() => {

  const interval =
   setInterval(() => {

    setCurrentImage(

     (prev) =>

      (prev + 1) %
      images.length

    )

   }, 5500)

  return () =>
   clearInterval(interval)

 }, [])


 return (

  <section
   className="
    relative
    overflow-hidden
    w-full
    py-28
    px-6
    lg:px-20

    bg-gradient-to-b
    from-blue-50
    via-white
    to-white
   "
  >

   {/* FLOATING BACKGROUND */}

   <motion.div

    animate={{

     y: [0, -20, 0],

    }}

    transition={{

     duration: 8,
     repeat: Infinity,

    }}

    className="
     absolute
     top-[-120px]
     right-[-120px]

     w-[350px]
     h-[350px]

     bg-blue-200/40

     rounded-full
     blur-3xl
    "
   />


   <motion.div

    animate={{

     y: [0, 20, 0],

    }}

    transition={{

     duration: 10,
     repeat: Infinity,

    }}

    className="
     absolute
     bottom-[-120px]
     left-[-120px]

     w-[300px]
     h-[300px]

     bg-cyan-100/40

     rounded-full
     blur-3xl
    "
   />


   <div
    className="
     max-w-7xl
     mx-auto

     grid
     md:grid-cols-2

     gap-16
     items-center

     relative
     z-10
    "
   >

    {/* LEFT CONTENT */}

    <motion.div

     initial={{
      opacity: 0,
      y: 40,
     }}

     animate={{
      opacity: 1,
      y: 0,
     }}

     transition={{
      duration: 0.8,
     }}
    >

     {/* BADGE */}

     <motion.div

      initial={{
       opacity: 0,
       y: 20,
      }}

      animate={{
       opacity: 1,
       y: 0,
      }}

      transition={{
       delay: 0.2,
      }}

      className="
       inline-flex
       items-center
       gap-2

       px-5
       py-2

       rounded-full

       bg-blue-100
       text-blue-700

       font-medium
       text-sm

       mb-6
      "
     >

      AI Powered Halal Investing

     </motion.div>


     {/* HEADING */}

     <motion.h1

      initial={{
       opacity: 0,
       y: 30,
      }}

      animate={{
       opacity: 1,
       y: 0,
      }}

      transition={{
       delay: 0.3,
      }}

      className="
       text-6xl
       lg:text-7xl

       font-bold

       leading-tight
       tracking-tight

       text-gray-900
      "
     >

      Investing made

      <span
       className="
        text-blue-600
       "
      >

       {" "}
       Ethical

      </span>

     </motion.h1>


     {/* DESCRIPTION */}

     <motion.p

      initial={{
       opacity: 0,
       y: 30,
      }}

      animate={{
       opacity: 1,
       y: 0,
      }}

      transition={{
       delay: 0.5,
      }}

      className="
       mt-8
       text-xl
       leading-10

       text-gray-600
       max-w-2xl
      "
     >

      TwinTrade empowers investors
      to trade confidently with
      halal-compliant screening,
      AI insights, and transparent
      financial tools built for
      modern ethical investing.

     </motion.p>


     {/* BUTTONS */}

     <motion.div

      initial={{
       opacity: 0,
       y: 20,
      }}

      animate={{
       opacity: 1,
       y: 0,
      }}

      transition={{
       delay: 0.7,
      }}

      className="
       flex
       gap-5
       mt-10
      "
     >

      <Link href="/signup">

       <motion.button

        whileHover={{
         scale: 1.05,
        }}

        whileTap={{
         scale: 0.98,
        }}

        className="
         px-8
         py-4

         bg-blue-600
         hover:bg-blue-700

         text-white

         rounded-2xl

         transition

         text-lg
         font-medium

         shadow-lg
         shadow-blue-200
        "
       >

        Start Investing

       </motion.button>

      </Link>


      <Link href="/about">

       <motion.button

        whileHover={{
         scale: 1.05,
        }}

        whileTap={{
         scale: 0.98,
        }}

        className="
         px-8
         py-4

         border
         border-gray-300

         rounded-2xl

         hover:bg-gray-100

         transition

         text-lg
         font-medium
        "
       >

        Learn More

       </motion.button>

      </Link>

     </motion.div>


     {/* FEATURES */}

     <motion.div

      initial={{
       opacity: 0,
       y: 20,
      }}

      animate={{
       opacity: 1,
       y: 0,
      }}

      transition={{
       delay: 0.9,
      }}

      className="
       flex
       flex-wrap

       gap-8
       mt-12

       text-sm
       text-gray-500
       font-medium
      "
     >

      <motion.p
       whileHover={{
        y: -2,
       }}
      >

       ✔ Halal Stock Screening

      </motion.p>


      <motion.p
       whileHover={{
        y: -2,
       }}
      >

       ✔ AI Portfolio Insights

      </motion.p>


      <motion.p
       whileHover={{
        y: -2,
       }}
      >

       ✔ Zero Advisory Fees

      </motion.p>

     </motion.div>

    </motion.div>


    {/* RIGHT VISUALS */}

    <motion.div

     initial={{
      opacity: 0,
      scale: 0.9,
     }}

     animate={{
      opacity: 1,
      scale: 1,
     }}

     transition={{
      duration: 0.8,
      delay: 0.4,
     }}

     className="
      relative
      flex
      items-center
      justify-center
     "
    >

     {/* GLOW */}

     <div
      className="
       absolute

       w-[650px]
       h-[650px]

       bg-blue-200/30

       rounded-full

       blur-3xl

       z-0
      "
     />


     {/* WINDOW */}

     <div
      className="
       relative

       z-20

       w-full
       max-w-4xl

       rounded-[32px]

       bg-white/70
       backdrop-blur-xl

       border
       border-white

       shadow-2xl

       overflow-hidden
      "
     >

      {/* TOP BAR */}

      <div
       className="
        flex
        items-center
        gap-2

        px-6
        py-4

        border-b
        bg-white/80
       "
      >

       <div
        className="
         w-3
         h-3
         rounded-full
         bg-red-400
        "
       />

       <div
        className="
         w-3
         h-3
         rounded-full
         bg-yellow-400
        "
       />

       <div
        className="
         w-3
         h-3
         rounded-full
         bg-green-400
        "
       />

      </div>


      {/* IMAGE */}

      <div
       className="
        relative
        w-full
        h-[420px]
        lg:h-[480px]
        overflow-hidden
        bg-white
       "
      >

       <AnimatePresence
        mode="wait"
       >

        <motion.img

         key={currentImage}

         initial={{
          opacity: 0,
          scale: 1.02,
         }}

         animate={{
          opacity: 1,
          scale: 1,
         }}

         exit={{
          opacity: 0,
          scale: 0.99,
         }}

         transition={{

          duration: 1.2,

          ease: "easeInOut",

         }}

         src={images[currentImage]}

         alt="TwinTrade Dashboard"

         className="
          absolute
          inset-0

          w-full
          h-full

          object-contain
          object-center

          p-4
          bg-white
         "
        />

       </AnimatePresence>

      </div>


      {/* DOTS */}

      <div
       className="
        absolute
        bottom-5
        left-1/2
        -translate-x-1/2

        flex
        gap-3
       "
      >

       {
        images.map((_, index) => (

         <button

          key={index}

          onClick={() =>
           setCurrentImage(index)
          }

          className={`
           h-3
           rounded-full
           transition-all
           duration-300

           ${
            currentImage === index

             ? "bg-blue-600 w-8"

             : "bg-white/70 w-3"
           }
          `}
         />

        ))
       }

      </div>

     </div>

    </motion.div>

   </div>

  </section>

 )

}