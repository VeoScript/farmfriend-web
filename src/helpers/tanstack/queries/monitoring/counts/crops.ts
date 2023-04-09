import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetCountCrops = () => {
  return useQuery(['countCrops'],
    async () => {
      const countCrops = await axios.get('/api/monitoring/counts/crops')
      return countCrops.data
    },
    {
      onError: (error: any) => {
        console.error('ERROR COUNTING CROPS', error.response.data)
      }
    }
  )
}