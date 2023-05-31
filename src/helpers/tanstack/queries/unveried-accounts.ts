import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetUnverifiedAccounts = () => {
  return useQuery(['unverifiedAccounts'],
    async () => {
      const unverifiedAccounts = await axios.get('/api/unverified-accounts')
      return unverifiedAccounts.data
    },
    {
      onError: (error: any) => {
        console.error('ERROR UNVERIFIED ACCOUNT', error.response.data)
      }
    }
  )
}