import { useQuery } from '@tanstack/react-query'

import api from '../../../api/axios'

export const useAuthUser = () => {

   return useQuery({

      queryKey: ['profile'],

      queryFn: async () => {

         const response = await api.get('/profile')

         return response.data.user
      },

      retry: false
   })
}