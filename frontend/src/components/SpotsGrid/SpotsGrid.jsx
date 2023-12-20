// import { csrfFetch } from '../../store/csrf';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callFetchSpots } from '../../store/spots'
import SpotTile from '../SpotTile/SpotTile';
import './SpotsGrid.css';

function SpotsGrid() {
	const dispatch = useDispatch();
	const spots = useSelector(state => state.spots);
	
	useEffect(() => {
		dispatch(callFetchSpots());
	}, [dispatch]);
	
	return (<div className="spotGrid">
		{
			Object.values(spots).map(spot => {
				return <SpotTile
					key={spot.id}
					spot={spot}
				/>
			})
		}
	</div>);
}

export default SpotsGrid;