import React from "react";
import {
  LayoutDashboard,
  Plane,
  Bell,
  Ban,
  CalendarCheck
} from "lucide-react";

import "./Sidebar.css";

export default function Sidebar({ open, onToggle }) {
  return (
    <>
      {/* Hamburger always visible with conditional positioning */}
      <button 
        className={`sidebar__toggle ${!open ? "sidebar__toggle--closed" : ""}`} 
        onClick={onToggle}
      >
        ☰
      </button>

      {/* sidebar itself */}
      <aside className={`sidebar ${open ? "" : "sidebar--closed"}`}>
        <h2><LayoutDashboard size={20} />Dashboard</h2>
        <nav>
          <ul>
            <li><Plane size={20} />Aircraft</li>
            <li><Bell size={20} />Alerts</li>
            <li><Ban size={20} />Grounded</li>
            <li><CalendarCheck size={20} /> Repair Schedule</li>
          </ul>
        </nav>
      </aside>
    </>
  );
}