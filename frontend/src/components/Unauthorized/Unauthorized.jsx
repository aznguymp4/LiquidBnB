import { useNavigate } from 'react-router-dom';
import './Unauthorized.css'

function Unauthorized() {
	const nav = useNavigate()
	return <h2 id="unauthorized">
		You must be authorized to view this! :(
		<br/>
		<br/>
		<div className="redBtn" id="unauthorizedGoHome" onClick={()=>nav('/')}>Go Home</div>
	</h2>;
}

export default Unauthorized;