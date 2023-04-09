import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetCountLguNgo = () => {
  return useQuery(['countLguNgo'],
    async () => {
      const countLguNgo = await axios.get('/api/monitoring/counts/lgu-ngo')
      return countLguNgo.data
    },
    {
      onError: (error: any) => {
        console.error('ERROR COUNTING LGU/NGO', error.response.data)
      }
    }
  )
}