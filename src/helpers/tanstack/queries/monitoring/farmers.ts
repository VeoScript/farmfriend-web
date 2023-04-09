import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetMonitoringFarmers = () => {
  return useQuery(['farmers'],
    async () => {
      const farmers = await axios.get('/api/monitoring/farmers')
      return farmers.data
    },
    {
      onError: (error: any) => {
        console.error('ERROR MONITORING FARMERS', error.response.data)
      }
    }
  )
}