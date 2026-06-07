"use client";

import { useEffect, useState } from "react";

import DashboardLayout
  from "@/layouts/DashboardLayout";

import api
  from "@/services/api";

import socket
  from "@/services/socket";

import StockTable
  from "@/components/StockTable";

import ProtectedRoutes
  from "@/components/ProtectedRoutes";


type Stock = {

  symbol: string;

  companyName: string;

  price: number | null;

  halalStatus: string;

  change: number;

  industry: string;

  complianceScore: number;

};


export default function StocksPage() {

  const [stocks, setStocks] =
    useState<Stock[]>([]);

  const [search, setSearch] =
    useState("");

  const [halalOnly, setHalalOnly] =
    useState(false);

  const [loading, setLoading] =
    useState(true);


  // FETCH INITIAL STOCKS
  useEffect(() => {

    fetchStocks();

  }, []);


  // LIVE SOCKET UPDATES
  useEffect(() => {

    socket.on(

      "stockUpdates",

      (liveUpdates) => {

        setStocks((prevStocks) =>

          prevStocks.map((stock) => {

            const updated =
              liveUpdates.find(

                (live: any) =>

                  live.symbol ===
                  stock.symbol

              );


            if (!updated) {

              return stock;

            }


            return {

              ...stock,

              price:
                updated.price,

              change:
                updated.change,

            };

          })

        );

      }

    );


    return () => {

      socket.off(
        "stockUpdates"
      );

    };

  }, []);


  // FETCH STOCKS
  const fetchStocks =
    async () => {

      try {

        setLoading(true);

        const response =
          await api.get(
            "/stocks"
          );

        setStocks(
          response.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };


  // FILTERING
  const filteredStocks =
    stocks.filter((stock) => {

      const matchesSearch =

        stock.symbol
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        stock.companyName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );


      const matchesHalal =

        halalOnly

          ? stock.halalStatus ===
            "Halal"

          : true;


      return (

        matchesSearch &&
        matchesHalal

      );

    });


  return (

    <ProtectedRoutes>

      <DashboardLayout>

        {/* HEADER */}
        <div className="mb-8">

          <h1
            className="
              text-4xl
              font-bold
              text-gray-900
            "
          >

            Market Stocks

          </h1>


          <p
            className="
              text-gray-500
              mt-3
              text-lg
            "
          >

            Explore NIFTY 500 stocks
            with halal screening,
            compliance scores,
            and live market updates.

          </p>

        </div>


        {/* FILTER BAR */}
        <div
          className="
            flex flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
            mb-8
          "
        >

          {/* SEARCH */}
          <div className="flex-1">

            <input

              type="text"

              placeholder="Search stocks..."

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }

              className="
                w-full
                lg:w-[400px]
                bg-white
                border
                rounded-2xl
                px-5 py-4
                outline-none
                shadow-sm
              "
            />

          </div>


          {/* HALAL FILTER */}
          <button

            onClick={() =>
              setHalalOnly(
                !halalOnly
              )
            }

            className={`
              px-6 py-4
              rounded-2xl
              font-medium
              transition
              shadow-sm

              ${
                halalOnly

                  ? "bg-emerald-500 text-white"

                  : "bg-white border text-gray-700"
              }
            `}
          >

            {
              halalOnly

                ? "Showing Halal"

                : "Halal Filter"
            }

          </button>

        </div>


        {/* STATS */}
        <div
          className="
            flex flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-4
            mb-6
          "
        >

          <p
            className="
              text-sm
              text-gray-500
            "
          >

            Showing
            {" "}
            {filteredStocks.length}
            {" "}
            stocks

          </p>


          <div
            className="
              flex items-center
              gap-4
            "
          >

            <div
              className="
                bg-white
                border
                rounded-xl
                px-4 py-2
                text-sm
                shadow-sm
              "
            >

              Halal:
              {" "}

              <span
                className="
                  text-emerald-600
                  font-semibold
                "
              >

                {
                  stocks.filter(

                    (s) =>
                      s.halalStatus ===
                      "Halal"

                  ).length
                }

              </span>

            </div>


            <div
              className="
                bg-white
                border
                rounded-xl
                px-4 py-2
                text-sm
                shadow-sm
              "
            >

              Non-Halal:
              {" "}

              <span
                className="
                  text-red-600
                  font-semibold
                "
              >

                {
                  stocks.filter(

                    (s) =>
                      s.halalStatus ===
                      "Non-Halal"

                  ).length
                }

              </span>

            </div>

          </div>

        </div>


        {/* LOADING */}
        {
          loading

            ? (

              <div
                className="
                  bg-white
                  rounded-2xl
                  border
                  p-10
                  text-center
                "
              >

                <p
                  className="
                    text-gray-500
                    text-lg
                  "
                >

                  Loading NIFTY 500 stocks...

                </p>

              </div>

            )

            : (

              <StockTable
                stocks={
                  filteredStocks
                }
              />

            )
        }

      </DashboardLayout>

    </ProtectedRoutes>

  );

}