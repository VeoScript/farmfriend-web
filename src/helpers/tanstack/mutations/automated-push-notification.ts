import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useTriggerAutomatedPushNotificationMutation = () => {
  return useMutation((_args: { currentTemp: string, currentAverageTemp: string }) =>
    axios.get(`${process.env.FARMFRIEND_API_URL}/api/automated-suggested-crops?currentTemp=${_args.currentTemp}&currentAverageTemp=${_args.currentAverageTemp}`),
    {
      onError: (error: any) => {
        console.error('ERROR TRIGGER AUTOMATED PUSH NOTIFICATION', error.response.data)
      },
      onSuccess: async () => {
        console.log("SUCCESS TRIGGER NOTIFICATION")
      }
    }
  )
}
