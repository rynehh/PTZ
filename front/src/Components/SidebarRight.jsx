import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/SidebarRight.css';

const SidebarRight = () => {
    return (
        <aside className="sidebar-right">
            <img className="profile-avatar" src="/pkball.png"></img>
            <div className="mini-circles-list">
                <img className="circle-pair" src="/white.jpg"></img>
                <img className="circle-pair2" src="/white.jpg"></img>
                <img className="circle-pair" src="/white.jpg"></img>
                <img className="circle-pair2" src="/white.jpg"></img>
                <img className="circle-pair" src="/white.jpg"></img>
                <img className="circle-pair2" src="/white.jpg"></img>
            </div>
        </aside>
    );
};

export default SidebarRight;
