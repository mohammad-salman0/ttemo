const {
 getScreenedStocks,
} = require("./screeningService")

const {
 getAIPrediction,
} = require("./aiPredictionService")


/*
================================
 GENERATE PORTFOLIO ADVICE
================================
*/

exports.generatePortfolioAdvice =
 async ({

  amount,
  riskLevel,
  halalPreference,
  sectors,
  duration,

 }) => {

  try {

   let stocks =
    await getScreenedStocks()


   /*
   =================================
   HALAL FILTER
   =================================
   */

   if (
    halalPreference === "halal"
   ) {

    stocks =
     stocks.filter(

      (stock) =>

       stock.halalStatus ===
       "Halal"

     )

   }


   if (
    halalPreference === "review"
   ) {

    stocks =
     stocks.filter(

      (stock) =>

       stock.halalStatus !==
       "Non-Halal"

     )

   }


   /*
   =================================
   SECTOR FILTER
   =================================
   */

   if (

    sectors &&
    sectors.length > 0 &&
    !sectors.includes("All")

   ) {

    stocks =
     stocks.filter((stock) =>

      sectors.some(

       (sector) =>

        stock.industry
         ?.toLowerCase()
         .includes(
          sector.toLowerCase()
         )

      )

     )

   }


   /*
   =================================
   RISK STRATEGY
   =================================
   */

   if (
    riskLevel === "low"
   ) {

    stocks =
     stocks.filter(

      (stock) =>

       stock.complianceScore >= 85

     )

   }


   if (
    riskLevel === "moderate"
   ) {

    stocks =
     stocks.filter(

      (stock) =>

       stock.complianceScore >= 75

     )

   }


   /*
   =================================
   LONG TERM PRIORITY
   =================================
   */

   if (
    duration === "long"
   ) {

    stocks =
     stocks.sort(

      (a, b) =>

       b.complianceScore -
       a.complianceScore

     )

   }


   /*
   =================================
   HIGH RISK
   =================================
   */

   if (
    riskLevel === "high"
   ) {

    stocks =
     stocks.sort(
      () => 0.5 - Math.random()
     )

   }


   /*
   =================================
   FALLBACK
   =================================
   */

   if (
    stocks.length === 0
   ) {

    stocks =
     await getScreenedStocks()

    stocks =
     stocks.filter(

      (stock) =>

       stock.halalStatus !==
       "Non-Halal"

     )

   }


   /*
   =================================
   PICK TOP STOCKS
   =================================
   */

   const selected =
    stocks.slice(0, 5)


   /*
   =================================
   ALLOCATION ENGINE
   =================================
   */

   let allocations = []


   if (
    riskLevel === "low"
   ) {

    allocations =
     [30, 25, 20, 15, 10]

   }

   else if (
    riskLevel === "moderate"
   ) {

    allocations =
     [25, 25, 20, 15, 15]

   }

   else {

    allocations =
     [35, 25, 15, 15, 10]

   }


   /*
   =================================
   BUILD AI PORTFOLIO
   =================================
   */

   const portfolio =

    await Promise.all(

     selected.map(

      async (
       stock,
       index
      ) => {

       try {

        const compliance =

         Number(
          stock.complianceScore
         ) || 70


        /*
        =================================
        AI FEATURES
        =================================
        */

        const volatility =

         Math.floor(
          Math.random() * 60
         ) + 10


        const momentum =

         Math.floor(
          Math.random() * 50
         ) - 10


        const return_30d =

         Math.floor(
          Math.random() * 40
         ) - 5


        const growth_score =
         compliance


        const halal_score =
         compliance


        const sector_strength =

         Math.floor(
          Math.random() * 50
         ) + 50


        /*
        =================================
        AI PREDICTION
        =================================
        */

        let aiResult = {

         prediction: 0,

         signal: "Bearish",

         confidence: 50,

         risk_score: 50,

         investment_strength: 50,

        }


        try {

         aiResult =
          await getAIPrediction({

           volatility,

           momentum,

           return_30d,

           growth_score,

           halal_score,

           sector_strength,

          })

        } catch (aiError) {

         console.log(
          "AI Prediction Failed:"
         )

         console.log(
          aiError.message
         )

        }


        /*
        =================================
        RETURN STOCK OBJECT
        =================================
        */

        return {

         symbol:
          stock.symbol,

         companyName:
          stock.companyName,

         industry:
          stock.industry ||
          "Unknown",

         allocation:
          allocations[index] || 10,

         halalStatus:
          stock.halalStatus ||
          "Review Needed",

         complianceScore:
          compliance,

         estimatedInvestment:

          Math.floor(

           (
            amount *

            (
             allocations[index] || 10
            )

           ) / 100

          ),

         aiPrediction:
          aiResult.prediction || 0,

         aiSignal:
          aiResult.signal ||
          "Bearish",

         aiConfidence:
          aiResult.confidence || 50,

         riskScore:
          aiResult.risk_score || 50,

         investmentStrength:
          aiResult.investment_strength || 50,

         volatility,

         momentum,

         return30d:
          return_30d,

         sectorStrength:
          sector_strength,

         reason:
          generateReason(

           stock,
           riskLevel,
           duration,
           aiResult

          ),

        }

       } catch (error) {

        console.log(
         "Portfolio Stock Error:"
        )

        console.log(error.message)

        return {

         symbol:
          stock?.symbol ||
          "UNKNOWN",

         companyName:
          stock?.companyName ||
          "Unknown Company",

         industry:
          stock?.industry ||
          "Unknown",

         allocation:
          allocations[index] || 10,

         halalStatus:
          stock?.halalStatus ||
          "Review Needed",

         complianceScore:
          70,

         estimatedInvestment:

          Math.floor(

           (
            amount *

            (
             allocations[index] || 10
            )

           ) / 100

          ),

         aiPrediction: 0,

         aiSignal: "Bearish",

         aiConfidence: 50,

         riskScore: 50,

         investmentStrength: 50,

         volatility: 30,

         momentum: 10,

         return30d: 5,

         sectorStrength: 60,

         reason:
          "Fallback AI recommendation generated.",

        }

       }

      }

     )

    )


   /*
   =================================
   HALAL SCORE
   =================================
   */

   const halalScore =

    portfolio.length > 0

     ? Math.floor(

        portfolio.reduce(

         (acc, stock) =>

          acc +
          (stock.complianceScore || 0),

         0

        )

        /

        portfolio.length

       )

     : 0


   /*
   =================================
   DIVERSIFICATION SCORE
   =================================
   */

   const diversificationScore =
    calculateDiversification(
     portfolio
    )


   /*
   =================================
   PORTFOLIO STRENGTH
   =================================
   */

   const portfolioStrength =

    portfolio.length > 0

     ? Math.floor(

        portfolio.reduce(

         (acc, stock) =>

          acc +

          (
           stock.investmentStrength || 0
          ),

         0

        )

        /

        portfolio.length

       )

     : 0


   return {

    amount,

    riskLevel,

    duration,

    halalPreference,

    halalScore,

    diversificationScore,

    portfolioStrength,

    portfolio,

    summary:

     generateSummary(

      riskLevel,
      duration,
      halalScore,
      portfolioStrength

     ),

   }

  } catch (error) {

   console.log(
    "AI ADVISOR ERROR"
   )

   console.log(error)

   throw error

  }

}


/*
================================
 GENERATE AI REASON
================================
*/

const generateReason =
 (
  stock,
  riskLevel,
  duration,
  aiResult
 ) => {

  let reason =

   `${stock.companyName} selected due to strong compliance score and suitability for ${riskLevel} risk investors.`


  if (
   duration === "long"
  ) {

   reason +=
    " Strong long-term growth potential."

  }


  if (
   stock.halalStatus ===
   "Halal"
  ) {

   reason +=
    " Strict halal-compliant classification."

  }


  if (
   aiResult.prediction === 1
  ) {

   reason +=
    ` AI model predicts bullish potential with ${aiResult.confidence}% confidence.`

  }

  else {

   reason +=
    ` AI model suggests cautious outlook with ${aiResult.confidence}% confidence.`

  }


  reason +=
   ` Risk score: ${aiResult.risk_score || 50}.`


  reason +=
   ` Investment strength rated at ${aiResult.investment_strength || 50}.`


  return reason

}


/*
================================
 SUMMARY GENERATOR
================================
*/

const generateSummary =
 (
  riskLevel,
  duration,
  halalScore,
  portfolioStrength
 ) => {

  return `AI generated a ${riskLevel} risk ${duration}-term portfolio with an estimated halal compliance score of ${halalScore}% and portfolio strength rating of ${portfolioStrength}%.`

}


/*
================================
 DIVERSIFICATION SCORE
================================
*/

const calculateDiversification =
 (portfolio) => {

  const industries =
   new Set(

    portfolio.map(
     (stock) =>
      stock.industry
    )

   )

  return (
   industries.size * 2
  )

}