import { useMutation, useQueryClient } from '@tanstack/react-query'
import Router from 'next/router'
import api from '@/config/Axios'

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { email: string, password: string }) =>
    api.post('/api/login', {
      email: _args.email,
      password: _args.password
    }),
    {
      onError: (error: any) => {
        console.error('ERROR LOGIN', error.response.data)
      },
      onSuccess: async (data: any) => {
        queryClient.invalidateQueries(['account'])
        Router.push('/')
      }
    }
  )
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(() =>
    api.post('/api/logout'),
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