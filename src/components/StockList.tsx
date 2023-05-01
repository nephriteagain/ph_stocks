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

  function priceColor(num: number) {
    if (num < 0) {
      return {
        color: 'red'
      }
    } else {
      return {
        color: 'green'
      }
    }
  }

  const {
    data: stocks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStocksQuery('/', {pollingInterval: 60000}) // force refetch every 60000 sec
  
  let content
  
  if (isLoading) {
    content = <div>Loading...</div>
  } 
  else if (isSuccess) {
    content = <div>
      <div className="flex flex-row">
        <div className="w-[30%] font-bold">
          name
        </div>
        <div className="w-[17.5%] text-right font-bold">
          symbol
        </div>
        <div className="w-[17.5%] text-right font-bold">
          price (PHP)
        </div>
        <div className="w-[17.5%] text-right font-bold">
          change
        </div>
        <div className="w-[17.5%] text-right font-bold">
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
            <div className="w-[30%]">
              {name}
            </div>
            <div className="w-[17.5%] text-right font-semibold">
              {symbol}
            </div>
            <div className="w-[17.5%] text-right">
              {price.amount}
            </div>
            <div className="w-[17.5%] text-right" style={priceColor(percent_change)}>
              {percent_change}
            </div>
            <div className="w-[17.5%] text-right">
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