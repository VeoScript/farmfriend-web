import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetMonitoringReports = () => {
  return useQuery(['reports'],
    async () => {
      const reports = await axios.get('/api/monitoring/reports')
      return reports.data
    },
    {
      onError: (error: any) => {
        console.error('ERROR MONITORING REPORTS', error.response.data)
      }
    }
  )
}