import { useGetStockQuery } from "../features/api/apiSlice"
import { useParams } from 'react-router-dom'

function SingleStock() {
  const { symbol } = useParams()

  const {
    data: stock,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStockQuery(symbol)

  let content;

  if (isLoading) {
    content = <div>Loading...</div>
  } 
  else if (isSuccess) {
    content = <div>{JSON.stringify(stock)}</div>
  
  }
  else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div>{content}</div>
  )
}

export default SingleStock