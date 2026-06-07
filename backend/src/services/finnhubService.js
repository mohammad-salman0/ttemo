/*
=====================================
 MOCK LIVE PRICE SERVICE
=====================================
*/

exports.getLivePrice =
 async (symbol) => {

  try {

   /*
   =====================================
   GENERATE REALISTIC MOCK PRICE
   =====================================
   */

   const basePrice =

    (
     symbol.length * 250
    )

    +

    Math.floor(
     Math.random() * 500
    )


   /*
   =====================================
   RANDOM CHANGE %
   =====================================
   */

   const change =

    Number(

     (
      (Math.random() * 6) - 3
     ).toFixed(2)

    )


   return {

    price: basePrice,

    change,

   }

  } catch (error) {

   console.log(error)

   return {

    price: 1000,

    change: 0,

   }

  }

}