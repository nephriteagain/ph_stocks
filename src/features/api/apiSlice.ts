import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: "http://phisix-api.appspot.com"}),
  endpoints: builder => ({
    getStocks: builder.query({
      query: () => '/stocks.json'
    }),
    getStock: builder.query({
      query: stockSymbol => `stocks/${stockSymbol}.json`
    })
  })
})


export const { useGetStocksQuery, useGetStockQuery } = apiSlice