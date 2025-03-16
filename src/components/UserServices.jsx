import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/UserServices.css';
import { LuCalendarClock } from "react-icons/lu";
import { IoCarSportOutline } from "react-icons/io5";
import { GiMechanicGarage } from "react-icons/gi";
import { MdOutlineManageHistory } from "react-icons/md";
import { CgToolbox } from "react-icons/cg";
import { LuClipboardList } from "react-icons/lu"; // Icono para Work Order

const UserServices = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="user-services-container">
      <h2>Quick Links</h2>
      <div className="user-services-card-grid">
        <Link to="/agenda" className="user-services-link">
          <div className="user-services-card">
            <div className='service-icon'>
              <LuCalendarClock />
            </div>
            <h5>AGENDAR</h5>
          </div>
        </Link>
        <Link to="/agenda" className="user-services-link">
          <div className="user-services-card">
            <div className='service-icon'>
              <GiMechanicGarage />
            </div>
            <h5>STATUS</h5>
          </div>
        </Link>
        <Link to="/history" className="user-services-link">
          <div className="user-services-card">
            <div className='service-icon'>
              <MdOutlineManageHistory />
            </div>
            <h5>HISTORIA</h5>
          </div>
        </Link>
        <Link to="/manage-plates" className="user-services-link">
          <div className="user-services-card">
            <div className='service-icon'>
              <IoCarSportOutline />
            </div>
            <h5>VEHICULOS</h5>
          </div>
        </Link>

        {/* Link a Work Order (visible solo si el usuario es admin) */}
        {user?.isAdmin && (
          <>
            <Link to="/work-order" className="user-services-link">
              <div className="user-services-card">
                <div className='service-icon'>
                  <LuClipboardList />
                </div>
                <h5>ORDENES</h5>
              </div>
            </Link>
            <Link to="/orderslist" className="user-services-link">
              <div className="user-services-card">
                <div className='service-icon'>
                  <CgToolbox />
                </div>
                <h5>TRABAJO</h5>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default UserServices;
