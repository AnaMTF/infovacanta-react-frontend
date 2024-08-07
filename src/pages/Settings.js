import "../css/styles.css";
import "../css/header.css";
import "../css/register.css";

import Axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ChangePasswordModal } from "../components/ChangePasswordModal";

import { setUser } from "../app/userSlice";

export const Settings = () => {
  const user = useSelector((state) => state.user.user);

  const [email, setEmail] = useState(user.email);
  const [full_name, setFullname] = useState(user.full_name);
  const [nickname, setNickname] = useState(user.nickname);
  const [profile_picture, setProfilePicture] = useState(null);
  const [background_picture, setBackgroundPicture] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("full_name", full_name);
    formData.append("nickname", nickname);

    if (profile_picture) {
      formData.append("profile_picture", profile_picture);
    }

    if (background_picture) {
      formData.append("background_picture", background_picture);
    }

    try {
      const result = await Axios.post(`https://localhost:5000/auth/refresh/${user.user_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      dispatch(setUser(result.data));
      navigate(-1);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="jumbotron container centered">
      <div className="row">
        <div className="container fluid card" style={{
          margin: "50px"
        }}>
          <h1 style={{
            margin: "20px"
          }}> Setările contului </h1>

          <div className="card-body">
            <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Emailul dumneavoastră"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nickname">Nume de utilizator</label>
                <input
                  type="text"
                  id="nickname"
                  className="form-control"
                  placeholder="Numele dumneavoastră de utilizator"
                  name="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fullname">Nume complet</label>
                <input
                  type="text"
                  id="full_name"
                  className="form-control"
                  placeholder="Numele dumneavoastră complet"
                  name="full_name"
                  value={full_name}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="profile-picture">Poză de profil</label>
                <input
                  type="file"
                  id="profile_picture"
                  className="form-control"
                  name="profile_picture"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />
              </div>

              <div className="form-group">
                <label htmlFor="profile-picture">Poză de fundal</label>
                <input
                  type="file"
                  id="background_picture"
                  className="form-control"
                  name="background_picture"
                  onChange={(e) => setBackgroundPicture(e.target.files[0])}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Actualizați setările
              </button>
            </form>

            <button className="btn btn-secondary" style={{
              marginTop: "20px"
            }} onClick={() => setShowModal(true)}>
              Schimbați-vă parola
            </button>

            <ChangePasswordModal show={showModal} handleClose={handleCloseModal} />
          </div>
        </div>
      </div>
    </div>
  );
};