import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetCountReports = () => {
  return useQuery(['countReports'],
    async () => {
      const countReports = await axios.get('/api/monitoring/counts/reports')
      return countReports.data
    },
    {
      onError: (error: any) => {
        console.error('ERROR COUNTING REPORTS', error.response.data)
      }
    }
  )
}