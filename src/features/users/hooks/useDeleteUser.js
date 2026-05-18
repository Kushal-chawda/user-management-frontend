import { useMutation } from '@tanstack/react-query'

import { useQueryClient } from '@tanstack/react-query'

import { deleteUser } from '../api/userApi'

export const useDeleteUser = () => {

   const queryClient = useQueryClient()

   return useMutation({

      mutationFn: deleteUser,

      onSuccess: () => {

         queryClient.invalidateQueries({

            queryKey: ['users']
         })
      }
   })
}