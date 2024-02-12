import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const nav = useNavigate()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    nav('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div id="profileBtn" onClick={toggleMenu}>
        <i className="fas fa-bars fa-sm"/><i className="fas fa-user-circle fa-lg"/>
      </div>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <p>
              <b className="truncateLongTxt">Hello, {user.username}</b>
              <i className="truncateLongTxt">{user.email}</i>
            </p>
            <div id="manageSpotBtn">
              <NavLink to="/spots/current" onClick={closeMenu}>Manage Spots</NavLink>
            </div>
            <div onClick={logout}>Log Out</div>
          </>
        ) : (
          <>
            <div>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
            <hr/>
            <div>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
