import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    if(e.target.className.includes('Disabled')) return;
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <form className="credentialForm">
        <h1>Sign Up</h1>
        <label>
          Email {errors.email && <div className="error">{errors.email}</div>}
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>
          Username {errors.username && <div className="error">{errors.username}</div>}
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>
          First Name {errors.firstName && <div className="error">{errors.firstName}</div>}
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>
          Last Name {errors.lastName && <div className="error">{errors.lastName}</div>}
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label>
          Password {errors.password && <div className="error">{errors.password}</div>}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>
          Confirm Password {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div
          className={`credentialSubmitBtn redBtn${
            [email,username,firstName,lastName,password,confirmPassword].some(a=>!a)
            || username.length < 4
            || password.length < 6
            || confirmPassword.length < 6
            ?'Disabled':''}`}
          id="btnSignup"
          onClick={handleSubmit}>Sign Up</div>
      </form>
    </>
  );
}

export default SignupFormModal;