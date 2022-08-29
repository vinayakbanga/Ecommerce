import React from 'react'
// import { Link } from 'react-router-dom'
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
// import PostAddIcon from "@mui/icons-material/PostAdd"
import AddIcon from "@mui/icons-material/Add"
import ImportExportIcon from "@mui/icons-material/ImportExport"
import ListAltIcon from "@mui/icons-material/ListAlt"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PeopleIcon from "@mui/icons-material/People"
import RateReviewIcon from "@mui/icons-material/RateReview"
const Sidebar = () => {
  return (
    <div className="sidebar flex flex-col gap-6">
    <a href='/'>
      <h1>Ecoomerce</h1>
    </a>
    <a href="/admin/dashboard">
      <p>
        <DashboardIcon /> Dashboard
      </p>
    </a>
    <a href="/admin/products">
      <p>
        <ImportExportIcon /> All Products
      </p>
    </a>
    <a href="/admin/product">
      <p>
        <AddIcon /> Create Product
      </p>
    </a>
    {/* <Link>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ImportExportIcon />}
      >
        <TreeItem nodeId="1" label="Products">
          <Link to="/admin/products">
            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
          </Link>

          <Link to="/admin/product">
            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
          </Link>
        </TreeItem>
      </TreeView>
    </Link> */}
    <a href="/admin/orders">
      <p>
        <ListAltIcon />
        Orders
      </p>
    </a>
    <a href="/admin/users">
      <p>
        <PeopleIcon /> Users
      </p>
    </a>
    <a href="/admin/reviews">
      <p>
        <RateReviewIcon />
        Reviews
      </p>
    </a>
  </div>
  )
}

export default Sidebar