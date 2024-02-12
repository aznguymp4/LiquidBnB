import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e,c,p) => {
    if(e.target.className.includes('Disabled')) return;
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential: c || credential, password: p || password }))
      .then(() => {
        closeModal()
        if(window.location.href.includes('unauthorized')) window.location = '/'
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <form className="credentialForm">
        <h1>Log In</h1>
        <div className="error">{errors.credential}</div>
        <label>
          Username or Email
        </label>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        <label>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className={`credentialSubmitBtn redBtn${credential.length<4 || password.length<6? 'Disabled' : ''}`} id="btnLogin" onClick={handleSubmit}>Log In</div>
        <div id="btnDemoUser" onClick={e=>handleSubmit(e,'demo@user.io','password')}>Demo User</div>
      </form>
    </>
  );
}

export default LoginFormModal;