import { useState } from "react";
import { assets } from "../../assets/assets";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { user, handleLogout } = useAuth();

  const [modeImg, setModeImg] = useState(assets.lightIcon);
  const [openProfile, setOpenProfile] = useState("none");

  const ModeChange = () => {
    setModeImg((prevImage) =>
      prevImage === assets.lightIcon ? assets.darkIcon : assets.lightIcon
    );
  };

  return (
    <div className="navbarContainer flex-center">
      <div className="leftSide">
        <h1>Welcome {user?.name} !</h1>
        <img src={assets.handIcon} alt="" />
      </div>
      <div className="rightSide flex-center">
        <img src={modeImg} alt="" onClick={ModeChange} />
        <div className="notifyContainer flex-center">
          <img src={assets.bellIcon} alt="" />
          <span></span>
        </div>
        <img
          onClick={() => setOpenProfile("active")}
          src={assets.profileImg}
          alt=""
          className="profileImg"
        />
      </div>

      <div
        className={`profileContainer ${openProfile}`}
        style={{
          transform:
            openProfile === "active" ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="TopSection flex-center">
          <div className="leftSide">
            <p onClick={() => setOpenProfile("none")}>Close</p>
          </div>

          <div className="rightSide" onClick={handleLogout}>
            <img src={assets.logoutIcon} alt="" /> Logout
          </div>
        </div>

        <div className="profileInfo flex-center">
          <img src={assets.profileImg} alt="" />
          <div className="smallInfo">
            <h3>{user?.name}</h3>
            <p>{user?.designation}</p>
          </div>
          <NavLink to='/employee/profile'
            onClick={() => setOpenProfile("none")}> View More</NavLink>
        </div>

        <div className="inboxInfo">
          <div className="TopSection flex-center">
            <p>Messages</p>
            <img src={assets.messagesAlertIcon} alt="" />
          </div>
          <div className="messagesContainer flex-center">
            <div className="left">
              <img src={assets.profileImg} alt="" />
            </div>
            <div className="right">
              <h4>Nawin Kumar</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
            </div>
          </div>
          <div className="messagesContainer flex-center">
            <div className="left">
              <img src={assets.profileImg} alt="" />
            </div>
            <div className="right">
              <h4>Nawin Kumar</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
            </div>
          </div>
          <div className="messagesContainer flex-center">
            <div className="left">
              <img src={assets.profileImg} alt="" />
            </div>
            <div className="right">
              <h4>Nawin Kumar</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
