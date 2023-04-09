import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetCountFarmers = () => {
  return useQuery(['countFarmers'],
    async () => {
      const countFarmers = await axios.get('/api/monitoring/counts/farmers')
      return countFarmers.data
    },
    {
      onError: (error: any) => {
        console.error('ERROR COUNTING FARMERS', error.response.data)
      }
    }
  )
}