import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callFetchSpots } from '../../store/spots'
import SpotTile from '../SpotTile/SpotTile';
import './SpotsGrid.css';

function SpotsGrid({ filterOwned }) {
	const dispatch = useDispatch();
	const spots = useSelector(state => state.spots);
  const sessionUser = useSelector(state => state.session.user);
  const nav = useNavigate()
  const spotsArr = Object.values(spots)
	
	useEffect(() => {
		dispatch(callFetchSpots(filterOwned));
	}, [dispatch, filterOwned, sessionUser]);
	
  if(filterOwned && !sessionUser) return <h1 style={{textAlign:'center'}}>You must be logged in to view this!</h1>

	return (<>
    {filterOwned && <>
      <h1>Manage Your Spots</h1>
      <div className="redBtn" id="manageSpotAddBtn" onClick={()=>nav('/spots/new')}>Create a New Spot</div>
    </>}
    {spotsArr.length? <div className="spotGrid">
      {
        spotsArr.map(spot => {
          return <SpotTile
            key={spot.id}
            spot={spot}
            editMode={filterOwned}
          />
        })
      }
    </div> : <h2 style={{textAlign:'center',opacity:.4}}><i>No Spots were found!<br/>Why not create one?</i></h2>}
  </>);
}

export default SpotsGrid;