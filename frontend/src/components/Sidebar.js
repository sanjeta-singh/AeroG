import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { LayoutDashboard, Plane, Bell, Ban, CalendarCheck } from "lucide-react";

export default function Sidebar({ open, onToggle }) {
  return (
    <>
      <button
        className={`sidebar__toggle ${!open ? "sidebar__toggle--closed" : ""}`}
        onClick={onToggle}
      >
        ☰
      </button>

      <aside className={`sidebar ${open ? "" : "sidebar--closed"}`}>
        <h2><LayoutDashboard size={20} />Dashboard</h2>
        <nav>
          <ul>
            
            <li><Link to="/aircraft"><Plane size={20} />Aircraft</Link></li>
            <li><Link to="/alerts"><Bell size={20} />Alerts</Link></li>
            <li><Ban size={20} />Grounded</li>
            <li><CalendarCheck size={20} />Repair Schedule</li>
          </ul>
        </nav>
      </aside>
    </>
  );
}