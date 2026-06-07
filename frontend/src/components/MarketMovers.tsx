type Stock = {
  _id: string;
  symbol: string;
  price: number;
  change: number;
};

type Props = {
  title: string;
  stocks: Stock[];
};

export default function MarketMovers({
  title,
  stocks,
}: Props) {

  return (
    <div
      className="
        bg-white rounded-2xl
        border shadow-sm
        p-5
      "
    >

      <h2 className="text-xl font-bold mb-5">
        {title}
      </h2>

      <div className="space-y-4">

        {stocks.map((stock) => {

          const isPositive =
            stock.change >= 0;

          return (
            <div
              key={stock._id}
              className="
                flex items-center
                justify-between
              "
            >

              <div>

                <h3 className="font-bold">
                  {stock.symbol}
                </h3>

                <p className="text-sm text-gray-500">
                  ₹ {stock.price.toFixed(2)}
                </p>

              </div>

              <div
                className={`
                  font-semibold
                  ${
                    isPositive
                      ? "text-emerald-600"
                      : "text-red-600"
                  }
                `}
              >
                {isPositive ? "+" : ""}
                {stock.change.toFixed(2)}
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}