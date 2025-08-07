import "./main.css";
import { TbActivityHeartbeat } from "react-icons/tb";
import { FaBell } from "react-icons/fa";
import { FaChartColumn } from "react-icons/fa6";
import { PiUserCircleFill } from "react-icons/pi";
import { FaFolder } from "react-icons/fa";
import { FaInbox } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
export default function Main() {
  return (
    <div className="main-page">
      <div className="main-nav">
        <div>Home</div>

        <div>Pipelines</div>

        <div>Leads</div>

        <div>Customers</div>

        <div>Tasks</div>
      </div>
      <div className="main-home">
        <div className="main-profile">
          <div className="profile">
            <PiUserCircleFill
              style={{ width: "50px", height: "50px" }}
            ></PiUserCircleFill>
          </div>
          <div className="profile-nav">
            <div>
              <TbActivityHeartbeat
                style={{ width: "30px", height: "30px" }}
              ></TbActivityHeartbeat>
            </div>

            <div>
              <FaBell style={{ width: "30px", height: "30px" }}></FaBell>
            </div>

            <div>
              <FaChartColumn
                style={{ width: "30px", height: "30px" }}
              ></FaChartColumn>
            </div>
          </div>
        </div>
        <div className="main-settings">
          <div className="main-attributes">
            <div>
              <FaFolder style={{ width: "30px", height: "30px" }}></FaFolder>
            </div>
            <div>
              <FaInbox style={{ width: "30px", height: "30px" }}></FaInbox>
            </div>
            <div>
              <IoCalendar
                style={{ width: "30px", height: "30px" }}
              ></IoCalendar>
            </div>
            <div>
              <FaInfoCircle
                style={{ width: "30px", height: "30px" }}
              ></FaInfoCircle>
            </div>
          </div>
          <div className="main-view">show the views</div>
        </div>
      </div>
    </div>
  );
}
