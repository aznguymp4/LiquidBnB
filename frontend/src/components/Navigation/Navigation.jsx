import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div id="navBar">
      <div className="navLeft">
        <NavLink exact to="/"><img id="navLogo" src="/logo-banner-small.png" alt="LiquidBnB Logo" title="Home Page"/></NavLink>
      </div>
      <div id="navSpace"></div>
      <div className="navRight">
        {isLoaded && <ProfileButton user={sessionUser}/>}
      </div>
    </div>
  );
}

export default Navigation;