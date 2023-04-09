import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetMonitoringCrops = () => {
  return useQuery(['crops'],
    async () => {
      const crops = await axios.get('/api/monitoring/crops')
      return crops.data
    },
    {
      onError: (error: any) => {
        console.error('ERROR MONITORING CROPS', error.response.data)
      }
    }
  )
}