import { useMutation }
from '@tanstack/react-query'

import { logoutUser }
from '../api/authApi'

import { useDispatch }
from 'react-redux'

import { logout }
from '../store/authSlice'

import {
   useNavigate
} from 'react-router-dom'

import { toast }
from 'react-toastify'

function LogoutButton() {

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const logoutMutation = useMutation({

      mutationFn: logoutUser,

      onSuccess: () => {

         localStorage.removeItem(
            'token'
         )

         dispatch(logout())

         toast.success(
            'Logout successful'
         )

         navigate('/login')
      },

      onError: () => {

         toast.error(
            'Logout failed'
         )
      }
   })

   const handleLogout = () => {

      logoutMutation.mutate()
   }

   return (

      <button

         className="btn btn-danger"

         onClick={handleLogout}

         disabled={
            logoutMutation.isPending
         }
      >

         {

            logoutMutation.isPending

               ? 'Logging out...'

               : 'Logout'
         }

      </button>
   )
}

export default LogoutButton