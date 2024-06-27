import { Modal } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { useState } from 'react';

import Axios from 'axios';
import "../css/changepass.css";

export const ChangePasswordModal = ({ show, handleClose }) => {
  const user = useSelector((state) => state.user.user);

  const [old_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    const params = new URLSearchParams();
    params.append("old_password", old_password);
    params.append("new_password", new_password);
    params.append("confirm_password", confirm_password);
    params.append("user_id", user.user_id);

    try {
      await Axios.post("http://localhost:5000/change-password", params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Schimbă parola</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="old_password">Parola veche</label>
            <input
              type="password"
              id="old_password"
              className="form-control"
              placeholder="Parola veche"
              name="old_password"
              value={old_password}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new_password">Parola nouă</label>
            <input
              type="password"
              id="new_password"
              className="form-control"
              placeholder="Parola nouă"
              name="new_password"
              value={new_password}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm_password">Confirmă parola nouă</label>
            <input
              type="password"
              id="confirm_password"
              className="form-control"
              placeholder="Confirmă parola nouă"
              name="confirm_password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary buton-parola" onClick={handleSubmit}>
          Schimbă parola
        </button>
      </Modal.Footer>
    </Modal>
  );
};