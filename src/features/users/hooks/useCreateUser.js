import { useMutation } from '@tanstack/react-query'

import { useQueryClient } from '@tanstack/react-query'

import { createUser } from '../api/userApi'

import { toast }
    from 'react-toastify'

export const useCreateUser = () => {

    const queryClient = useQueryClient()

    return useMutation({

        mutationFn: createUser,

        onSuccess: () => {

            toast.success(
                'User created successfully'
            )

            queryClient.invalidateQueries({

                queryKey: ['users']
            })
        },
        onError: () => {

            toast.error('Something went wrong')
        }
    })
}