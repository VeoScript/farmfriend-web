import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from 'axios'

export const useVerifyAccountMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { userId: string }) =>
    axios.put('/api/verify-account', _args),
    {
      onError: (error: any) => {
        console.error('ERROR VERIFY ACCOUNT', error.response.data)
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['unverifiedAccounts'])
        toast.success('Verified successfully!')
      }
    }
  )
}