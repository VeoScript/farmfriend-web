import { useMutation, useQueryClient } from '@tanstack/react-query'
import Router from 'next/router'
import axios from 'axios'

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { email: string, password: string }) =>
    axios.post('/api/login', {
      email: _args.email,
      password: _args.password   
    }),
    {
      onError: (error: any) => {
        console.error('ERROR LOGIN', error.response.data)
      },
      onSuccess: async () => {
        queryClient.resetQueries()
        Router.push('/')
      }
    }
  )
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(() =>
    axios.post('/api/logout'),
    {
      onError: (error: any) => {
        console.error('ERROR LOGOUT', error.response.data)
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['account'])
        Router.push('/login')
      }
    }
  )
}