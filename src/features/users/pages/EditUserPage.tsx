import { useParams }
from 'react-router-dom'

import {
   useNavigate
} from 'react-router-dom'

import UserForm
from '../components/UserForm'

import { useUsers }
from '../hooks/useUsers'

import { useUpdateUser }
from '../hooks/useUpdateUser'

import { toast }
from 'react-toastify'

function EditUserPage() {

   const { id } = useParams()

   const navigate = useNavigate()

   const updateMutation =
      useUpdateUser()

   const { data } = useUsers({
    page: 1,
    search: '',
})

   const users = (data as any)?.data || []

   const user = users.find(
      (item) =>
         item.id === Number(id)
   )

   const handleSubmit = async (
      formData
   ) => {

      try {

         await updateMutation
            .mutateAsync({

               id,

               data: formData
            })

         toast.success(
            'User updated successfully'
         )

         navigate('/users')

      } catch (error) {

         console.log(error)
      }
   }

   if (!user) {

      return <p>User not found</p>
   }

   return (

      <div className="container mt-5">

         <div className="card shadow">

            <div className="card-body">

               <h2 className="mb-4">

                  Edit User

               </h2>

               <UserForm

                  onSubmit={handleSubmit}

                  defaultValues={user}

                  isLoading={
                     updateMutation.isPending
                  }
               />

            </div>

         </div>

      </div>
   )
}

export default EditUserPage