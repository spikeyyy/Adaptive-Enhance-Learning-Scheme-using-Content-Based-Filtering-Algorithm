import { PermIdentityRounded, Publish } from "@mui/icons-material";
import "../../css/editUser.css";

const EditUser = () => {
  return (
    <div className="editUser">
      <div className="editUserTitleContainer">
        <span className="editUserTitle">Admin Information</span>
        <button className="addEditUserButton"> + Create</button>
      </div>
      <div className="editUserContainer">
        <div className="editUserShow">
          <div className="editUserShowTop">
            <img
              src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/418531224_2285773938280165_615051829644926539_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHn3hQHnigoaLCaWB1TTrvt2zbC-NDOzbnbNsL40M7Nue4tkQUc3_Vp1sCXShGWcUYEuxZQny_IGWbQ3AFrxZVO&_nc_ohc=mqIP0WfM-aoAX8cflim&_nc_ht=scontent.fmnl17-5.fna&oh=00_AfDnxgMbz6cOrs6DuW-NgXgk2WvCDWEzZxTGKxHm1pQHFg&oe=65B83B8E"
              alt=""
              className="EditUserShowImg"
            />
            <div className="editUserShowTopTitle">
              <span className="editUserShowUsername">Brian Jhon</span>
              <span className="editUserShowUserTitle">Admin</span>
            </div>
          </div>
          <div className="editUserShowBottom">
            <span className="editUserShowTitle">Account Information</span>
            <div className="editUserShowInfo">
              <PermIdentityRounded className="editUserShowIcon" />
              <span className="editUserShowInfoTitle">username</span>
            </div>
            <div className="editUserShowInfo">
              <PermIdentityRounded className="editUserShowIcon" />
              <span className="editUserShowInfoTitle">password</span>
            </div>
            <div className="editUserShowInfo">
              <PermIdentityRounded className="editUserShowIcon" />
              <span className="editUserShowInfoTitle">role</span>
            </div>
          </div>
          <div className="editUserShowBottom">
            <span className="editUserShowTitle">Personal Information</span>
            <div className="editUserShowInfo">
              <PermIdentityRounded className="editUserShowIcon" />
              <span className="editUserShowInfoTitle">first name</span>
            </div>
            <div className="editUserShowInfo">
              <PermIdentityRounded className="editUserShowIcon" />
              <span className="editUserShowInfoTitle">surname</span>
            </div>
          </div>
        </div>

        <div className="editUserUpdate">
          <span className="editUserUpdateTitle">Edit</span>
          <form className="editUserUpdateForm">
            <div className="editUserUpdateLeft">
              <div className="editUserUpdateItem">
                <label>Full name</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="editUserUpdateInput"
                />
              </div>
              <div className="editUserUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="editUserUpdateInput"
                />
              </div>
              <div className="editUserUpdateItem">
                <label>Password</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="editUserUpdateInput"
                />
              </div>
              <div className="editUserUpdateItem">
                <label>Role</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="editUserUpdateInput"
                />
              </div>
            </div>
            <div className="editUserUpdateRight">
              <div className="editUserUpdateUpload">
                <img
                  src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/418531224_2285773938280165_615051829644926539_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHn3hQHnigoaLCaWB1TTrvt2zbC-NDOzbnbNsL40M7Nue4tkQUc3_Vp1sCXShGWcUYEuxZQny_IGWbQ3AFrxZVO&_nc_ohc=mqIP0WfM-aoAX8cflim&_nc_ht=scontent.fmnl17-5.fna&oh=00_AfDnxgMbz6cOrs6DuW-NgXgk2WvCDWEzZxTGKxHm1pQHFg&oe=65B83B8E"
                  alt=""
                  className="editUserUpdateImg"
                />
                <label htmlFor="file">
                  <Publish className="editUserUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="editUserUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
