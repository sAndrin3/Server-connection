import React from 'react';
import {  Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './AdminDashboard.css';
import { Link, Outlet } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="admin-dashboard">
      <div className='sideitems'>
        <Menu iconShape="square">
          <MenuItem component={<Link to = "profile"/>}>Admin Profile</MenuItem>
          <SubMenu title="Tours" label='Tours'>
            
            <MenuItem>View Tours</MenuItem>
            <MenuItem>Create Tour</MenuItem>
          </SubMenu>
          <MenuItem>Messages</MenuItem>
          <MenuItem>Bookings</MenuItem>
        </Menu>
      </div>
      <div className="content">
        {/* Content for each section goes here */}
      </div>
    </div>
  );
}
function AdminDashboard() {
  return(
    <div className='admin-profile'>
      <Sidebar />
      <Outlet/>
    </div>
  );
}

export default AdminDashboard;
