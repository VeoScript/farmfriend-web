import { useMutation, useQueryClient } from '@tanstack/react-query'
import Router from 'next/router'
import toast from 'react-hot-toast'
import axios from 'axios'

export const useChangePasswordMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { old_password: string, new_password: string }) =>
    axios.put('/api/change-password', _args),
    {
      onError: (error: any) => {
        console.error('ERROR CHANGE PASSWORD', error.response.data)
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['account'])
        toast.success('Password updated successfully!')
        Router.push('/')
      }
    }
  )
}