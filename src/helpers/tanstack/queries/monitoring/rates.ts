import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetMonitoringRates = () => {
  return useQuery(['rates'],
    async () => {
      const rates = await axios.get('/api/monitoring/rates')
      return rates.data
    },
    {
      onError: (error: any) => {
        console.error('ERROR MONITORING RATES', error.response.data)
      }
    }
  )
}