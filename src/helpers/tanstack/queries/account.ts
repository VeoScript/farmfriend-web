import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetAccount = () => {
  return useQuery(['account'],
    async () => {
      const account = await axios.get('/api/user')
      return account.data
    },
    {
      onError: (error: any) => {
        console.error('ERROR ACCOUNT', error.response.data)
      }
    }
  )
}