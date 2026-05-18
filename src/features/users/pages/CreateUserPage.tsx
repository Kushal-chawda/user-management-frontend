import UserForm
from '../components/UserForm'

import { useCreateUser }
from '../hooks/useCreateUser'

import {
   useNavigate
} from 'react-router-dom'

import { toast }
from 'react-toastify'

function CreateUserPage() {

   const navigate = useNavigate()

   const createMutation =
      useCreateUser()

   const handleSubmit = async (
      formData
   ) => {

      try {

         await createMutation
            .mutateAsync(formData)

         toast.success(
            'User created successfully'
         )

         navigate('/users')

      } catch (error) {

         console.log(error)
      }
   }

   return (

      <div className="container mt-5">

         <div className="card shadow">

            <div className="card-body">

               <h2 className="mb-4">

                  Create User

               </h2>

               <UserForm

                  onSubmit={handleSubmit}

                  defaultValues={{}}

                  isLoading={
                     createMutation.isPending
                  }
               />

            </div>

         </div>

      </div>
   )
}

export default CreateUserPage