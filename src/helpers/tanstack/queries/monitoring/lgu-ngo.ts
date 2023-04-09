import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetMonitoringLguNgo = () => {
  return useQuery(['lguNgo'],
    async () => {
      const lguNgo = await axios.get('/api/monitoring/lgu-ngo')
      return lguNgo.data
    },
    {
      onError: (error: any) => {
        console.error('ERROR MONITORING LGU/NGO', error.response.data)
      }
    }
  )
}