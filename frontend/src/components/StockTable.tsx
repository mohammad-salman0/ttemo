"use client";

import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";

import { useRouter }
 from "next/navigation";


type Stock = {

 symbol: string;

 companyName: string;

 price: number | null;

 halalStatus: string;

 change: number;

 complianceScore: number;

};


type Props = {

 stocks: Stock[];

};


export default function StockTable({
 stocks,
}: Props) {

 const router =
  useRouter();


 return (

  <div
   className="
    bg-white
    rounded-3xl
    border
    shadow-sm
    overflow-hidden
   "
  >

   <Table>

    <TableHeader>

     <TableRow>

      <TableHead>
       Symbol
      </TableHead>

      <TableHead>
       Company
      </TableHead>

      <TableHead>
       Price
      </TableHead>

      <TableHead>
       Change
      </TableHead>

      <TableHead>
       Compliance
      </TableHead>

      <TableHead>
       Status
      </TableHead>

     </TableRow>

    </TableHeader>


    <TableBody>

     {stocks.map((stock) => (

      <TableRow

       key={stock.symbol}

       onClick={() =>
        router.push(
         `/stocks/${stock.symbol}`
        )
       }

       className="
        cursor-pointer
        transition-all
        hover:bg-gray-50
       "
      >

       {/* SYMBOL */}
       <TableCell
        className="
         font-bold
         text-gray-900
        "
       >

        {stock.symbol}

       </TableCell>


       {/* COMPANY */}
       <TableCell>

        <div>

         <p
          className="
           font-medium
           text-gray-900
          "
         >

          {stock.companyName}

         </p>

        </div>

       </TableCell>


       {/* PRICE */}
       <TableCell>

        {
         stock.price !== null

          ? (

           <span
            className="
             font-semibold
            "
           >

            ₹
            {" "}

            {
             stock.price.toFixed(2)
            }

           </span>

          )

          : "N/A"
        }

       </TableCell>


       {/* CHANGE */}
       <TableCell>

        <span
         className={`

          font-semibold

          ${
           stock.change >= 0

            ? "text-emerald-600"

            : "text-red-600"
          }

         `}
        >

         {
          stock.change >= 0
           ? "+"
           : ""
         }

         {stock.change}%

        </span>

       </TableCell>


       {/* COMPLIANCE */}
       <TableCell>

        <div
         className="
          flex
          items-center
          gap-3
         "
        >

         <div
          className="
           w-24
           h-2
           bg-gray-100
           rounded-full
           overflow-hidden
          "
         >

          <div

           className={`

            h-full
            rounded-full

            ${
             stock.complianceScore >= 85

              ? "bg-emerald-500"

              : stock.complianceScore >= 70

              ? "bg-yellow-500"

              : "bg-red-500"
            }

           `}

           style={{

            width:
             `${stock.complianceScore}%`

           }}

          />

         </div>


         <span
          className="
           text-sm
           font-semibold
           text-blue-600
          "
         >

          {stock.complianceScore}%

         </span>

        </div>

       </TableCell>


       {/* HALAL STATUS */}
       <TableCell>

        <span
         className={`

          px-4
          py-2
          rounded-full
          text-sm
          font-medium

          ${
           stock.halalStatus ===
           "Halal"

            ? "bg-emerald-100 text-emerald-700"

            : stock.halalStatus ===
              "Review Needed"

            ? "bg-yellow-100 text-yellow-700"

            : "bg-red-100 text-red-700"
          }

         `}
        >

         {stock.halalStatus}

        </span>

       </TableCell>

      </TableRow>

     ))}

    </TableBody>

   </Table>

  </div>

 );

}