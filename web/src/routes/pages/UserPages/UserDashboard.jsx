import React from 'react';
import {  Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './UserDashboard.css';
import { Link, Outlet } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="user-dashboard">
      <div className='sideitems'>
        <Menu iconShape="square">
          <MenuItem component={<Link to = "profile"/>}>User Profile</MenuItem>
          <SubMenu title="Tours" label='Tours'>
            
            <MenuItem component={<Link to = "viewtours"/>}>View Tours</MenuItem>
    
          </SubMenu>
          <MenuItem component={<Link to = "message"/>}>Message</MenuItem>
          <MenuItem component={<Link to = "book"/>}>Book</MenuItem>
        </Menu>
      </div>
      <div className="content">
        {/* Content for each section goes here */}
      </div>
    </div>
  );
}
function UserDashboard() {
  return(
    <div className='user-profile'>
      <Sidebar />
      <Outlet/>
    </div>
  );
}

export default UserDashboard;
