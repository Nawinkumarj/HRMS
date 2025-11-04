import { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { user, handleLogout } = useAuth();

  const [modeImg, setModeImg] = useState(assets.lightIcon);
  const [openProfile, setOpenProfile] = useState("none");
  const [weather, setWeather] = useState({
    city: "",
    temp: "",
    icon: "",
    loading: true,
  });

  const ModeChange = () => {
    setModeImg((prevImage) =>
      prevImage === assets.lightIcon ? assets.darkIcon : assets.lightIcon
    );
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const apiKey = "b004e176b2692c802394b122edb4e802";
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
            );
            const data = await response.json();
            console.log("Weather API response:", data);

            if (data && data.main) {
              setWeather({
                city: data.name,
                temp: Math.round(data.main.temp),
                icon: data.weather[0].icon, // 👈 weather icon code
                loading: false,
              });
            } else {
              setWeather({ city: "Unknown", temp: "N/A", icon: "", loading: false });
            }
          } catch (error) {
            console.error("Error fetching weather:", error);
            setWeather({ city: "Error", temp: "N/A", icon: "", loading: false });
          }
        },
        () => {
          setWeather({ city: "Location blocked", temp: "--", icon: "", loading: false });
        }
      );
    } else {
      setWeather({ city: "Unsupported", temp: "--", icon: "", loading: false });
    }
  }, []);

  return (
    <div className="navbarContainer flex-center">
      <div className="leftSide">
        <h1>Welcome {user?.name} !</h1>
        <img src={assets.handIcon} alt="" />
      </div>

      <div className="rightSide flex-center">
        <div className="weatherInfo flex-center">
          {weather.loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {weather.icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt="Weather Icon"
                  className="weatherIcon"
                  style={{ width: "40px", height: "40px", marginRight: "8px" }}
                />
              )}
              <div>
                <h1 style={{ fontSize: "16px", margin: 0 }}>{weather.city}</h1>
                <p style={{ fontSize: "14px", margin: 0 }}>{weather.temp}°C</p>
              </div>
            </>
          )}
        </div>

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
          <NavLink to="/employee/profile"> View More</NavLink>
        </div>

        <div className="inboxInfo">
          <div className="TopSection flex-center">
            <p>Messages</p>
            <img src={assets.messagesAlertIcon} alt="" />
          </div>

          {[1, 2, 3].map((_, i) => (
            <div key={i} className="messagesContainer flex-center">
              <div className="left">
                <img src={assets.profileImg} alt="" />
              </div>
              <div className="right">
                <h4>Nawin Kumar</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
