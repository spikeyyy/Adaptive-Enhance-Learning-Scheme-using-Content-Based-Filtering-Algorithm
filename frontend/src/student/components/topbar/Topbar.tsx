import logo from "../../../img/logo.png";
import pic from "../../../img/pic.jpg";
import "../../css/topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topBarWrapper">
        <div className="topLeft">
          <span className="logo">
            <img src={logo} alt="" style={{ width: "200px", height: "auto" }} />
          </span>
        </div>
        <div className="topRight">
          <img
            src={pic}
            alt=""
            className="topAvatar"
            style={{ width: "50px", height: "50px" }}
          />
          <span className="topAccountName"></span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
