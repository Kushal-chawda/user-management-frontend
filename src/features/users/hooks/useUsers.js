import { useQuery } from '@tanstack/react-query'

import { getUsers } from '../api/userApi'

export const useUsers = ({
    page,
    search
}) => {

    return useQuery({

        queryKey: [
            'users',
            page,
            search
        ],

        queryFn: () =>
            getUsers({
                page,
                search
            }),

        keepPreviousData: true
    })
}