import { useNavigate } from 'react-router-dom'
import { useGetStocksQuery } from "../features/api/apiSlice"

interface price {
  currency: string,
  amount: number
}

interface stockItem {
  name: string,
  percent_change: number,
  price: price,
  symbol: string,
  volume: number
}


function StockList() {
  const navigate = useNavigate()

  const {
    data: stocks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStocksQuery()
  
  let content
  
  if (isLoading) {
    content = <div>Loading...</div>
  } 
  else if (isSuccess) {
    content = <div>
      <div className="flex flex-row">
        <div className="w-[20%] font-bold">
          name
        </div>
        <div className="w-[20%] text-right font-bold">
          symbol
        </div>
        <div className="w-[20%] text-right font-bold">
          price
        </div>
        <div className="w-[20%] text-right font-bold">
          change
        </div>
        <div className="w-[20%] text-right font-bold">
          volume
        </div>
      </div>
      {stocks.stock.map(stockItem => {
        const {name, percent_change, price, symbol, volume} = stockItem
        return (
          <div key={symbol}
            className="flex flex-row cursor-pointer hover:bg-slate-300"
            onClick={() => navigate(`/stocks/${symbol}`)}
          >
            <div className="w-[20%]">
              {name}
            </div>
            <div className="w-[20%] text-right font-semibold">
              {symbol}
            </div>
            <div className="w-[20%] text-right">
              <span>{price.currency} </span><span>{price.amount}</span>
            </div>
            <div className="w-[20%] text-right">
              {percent_change}
            </div>
            <div className="w-[20%] text-right">
              {volume}
            </div>
          </div>
        )
      })}
    </div>
  }
  else if (isError) {
    content = <div>{error.toString()}</div>
  }



  return (
    <div>{content}</div>
  )
}

export default StockList