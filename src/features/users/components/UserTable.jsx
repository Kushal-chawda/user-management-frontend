import {
   useNavigate
} from 'react-router-dom'


function UserTable({

   users,

   onEdit,

   onDelete

}) {

   return (

      <div className="card shadow">

         <div className="card-body">

            <table
               className="table table-bordered table-hover"
            >

               <thead className="table-dark">

                  <tr>

                     <th>ID</th>

                     <th>Name</th>

                     <th>Email</th>

                     <th width="200">
                        Actions
                     </th>

                  </tr>

               </thead>

               <tbody>

                  {users.map((user) => (

                     <tr key={user.id}>

                        <td>{user.id}</td>

                        <td>{user.name}</td>

                        <td>{user.email}</td>

                        <td>

                           <button

                              className="btn btn-sm btn-warning me-2"

                              onClick={() =>
                                 navigate(`/users/edit/${user.id}`)
                              }
                           >
                              Edit
                           </button>

                           <button

                              className="btn btn-sm btn-danger"

                              onClick={() =>
                                 onDelete(user.id)
                              }
                           >
                              Delete
                           </button>

                        </td>

                     </tr>
                  ))}

               </tbody>

            </table>

         </div>

      </div>
   )
}

export default UserTable