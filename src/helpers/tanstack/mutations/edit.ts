import { useMutation, useQueryClient } from '@tanstack/react-query'
import Router from 'next/router'
import toast from 'react-hot-toast'
import axios from 'axios'

export const useEditAccountMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { first_name: string, last_name: string, address: string, contact_num: string, email: string }) =>
    axios.put('/api/edit', _args),
    {
      onError: (error: any) => {
        console.error('ERROR EDIT ACCOUNT', error.response.data)
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['account'])
        toast.success('Account updated successfully!')
        Router.push('/')
      }
    }
  )
}