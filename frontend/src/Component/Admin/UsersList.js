import React,{useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch,useSelector } from 'react-redux'
// import { getAdminProduct,clearErrors,deleteProduct } from '../../actions/productAction'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'
import MetaData from '../Layout/MetaData'
// DELETE_PRODUCT_RESET
// useAlert
// Button
// DELETE_USER_RESET
// MetaData
import EditIcon from "@mui/icons-material/Edit"
import  DeleteIcon  from '@mui/icons-material/Delete'
import Sidebar from './Sidebar'
// import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import { deleteUser,getAllUsers,clearErrors } from '../../actions/userAction'
import { DELETE_USER_RESET } from '../../constants/userConstants'

const UserList = () => {
   
    const dispatch = useDispatch();

    const alert = useAlert();
  
    const { error, users } = useSelector((state) => state.allUsers);
    const navigate = useNavigate();
  
    // const { error, products } = useSelector((state) => state.products);
    const {
        error: deleteError,
        isDeleted,
        message,
      } = useSelector((state) => state.profile);
    
   
  
    const deleteUserHandler = (id) => {
      dispatch(deleteUser(id));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        alert.success(message);
        navigate("/admin/users");
        dispatch({ type: DELETE_USER_RESET });
      }
  
      dispatch(getAllUsers());
    }, [dispatch, alert, error,deleteError,isDeleted,navigate ]);
    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    
        {
          field: "email",
          headerName: "Email",
          minWidth: 200,
          flex: 1,
        },
        {
          field: "name",
          headerName: "Name",
          minWidth: 150,
          flex: 0.5,
        },
    
        {
          field: "role",
          headerName: "Role",
          type: "number",
          minWidth: 150,
          flex: 0.3,
          cellClassName: (params) => {
            return params.getValue(params.id, "role") === "admin"
              ? "text-green-500"
              : "text-red-500";
          },
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteUserHandler(params.getValue(params.id, "id"))
                  }
                  style={{color:"red"}}
                  
                >
                  <DeleteIcon />
                </Button>
              </>
            );
          },
        },
      ];
    
      const rows = [];
    
      users &&
        users.forEach((item) => {
          rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            name: item.name,
          });
        });

  return (
    <>
     <MetaData title={`ALL PRODUCTS - Admin`} />

<div className="dashboard flex flex-col md:h-screen md:flex-row">
<div className=' md:w-1/4  md:border-r-2'>
      <Sidebar/>
      </div>
  <div className="productListContainer md:w-3/4">
    <h1 id="productListHeading " className='text-center my-5 text-xl'>ALL Users</h1>

    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      className="productListTable"
      autoHeight
    />
  </div>
</div>
     
    </>
  )
}

export default UserList