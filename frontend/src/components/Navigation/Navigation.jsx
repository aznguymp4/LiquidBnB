import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div id="navBar">
      <div id="navLeft">
        <NavLink exact to="/"><img id="navLogo" src="/logo-banner-small.png" alt="LiquidBnB Logo" title="Home Page"/></NavLink>
      </div>
      <div id="navSpace"></div>
      <div id="navRight">
        {sessionUser? <NavLink id="navAddSpot" to="/spots/new" title="Create a New Spot">
          <span id="spotAddMobile">
            <i className="fas fa-home"/> <i className="fas fa-plus"/>
          </span>
          <span id="spotAddDesktop">Create a New Spot</span>
        </NavLink> : <div id="navAddSpot"></div>}
        {isLoaded && <ProfileButton user={sessionUser}/>}
      </div>
      <div id="navHr"/>
    </div>
  );
}

export default Navigation;