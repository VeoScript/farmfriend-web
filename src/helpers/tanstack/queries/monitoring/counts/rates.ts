import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetCountRates = () => {
  return useQuery(['countRates'],
    async () => {
      const countRates = await axios.get('/api/monitoring/counts/rates')
      return countRates.data
    },
    {
      onError: (error: any) => {
        console.error('ERROR COUNTING RATES', error.response.data)
      }
    }
  )
}