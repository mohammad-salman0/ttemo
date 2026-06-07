const {
 getLivePrice,
} = require(
 "./finnhubService"
)


/*
=====================================
 GET LIVE PRICES
=====================================
*/

exports.getLivePrices =
 async (
  symbols = []
 ) => {

  try {

   /*
   =====================================
   REMOVE DUPLICATES
   =====================================
   */

   const uniqueSymbols =

    [...new Set(symbols)]


   /*
   =====================================
   FETCH ALL IN PARALLEL
   =====================================
   */

   const prices =

    await Promise.all(

     uniqueSymbols.map(
      async (symbol) => {

       try {

        const liveData =
         await getLivePrice(
          symbol
         )


        console.log(
         "LIVE:",
         symbol,
         liveData
        )


        return {

         symbol,

         price:

          liveData?.price != null

           ? Number(
              liveData.price
             )

           : null,


         change:

          liveData?.change != null

           ? Number(
              liveData.change
             )

           : null,

        }

       } catch (error) {

        console.log(
         `Failed: ${symbol}`
        )

        return {

         symbol,

         price: null,

         change: null,

        }

       }

      }
     )

    )


   /*
   =====================================
   RETURN
   =====================================
   */

   return prices

  } catch (error) {

   console.log(error)

   return []

  }

}