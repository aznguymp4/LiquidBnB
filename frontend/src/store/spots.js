export const [LOAD_SPOTS,RECEIVE_SPOT] = ['spots/LOAD_SPOTS','spots/RECEIVE_SPOT'];

export const loadSpots = spots => ({
	type: LOAD_SPOTS,
	spots
});
export const receiveSpot = spot => ({
	type: RECEIVE_SPOT,
	spot
});  

export const callFetchSpots = () => dispatch => {
	fetch('/api/spots')
	.then(r=>r.json())
	.then(d => dispatch(loadSpots(d.Spots)))
	.catch(console.error)
};
export const callFetch1Spot = (id,getReviews=false) => dispatch => {
	fetch('/api/spots/'+id)
	.then(r=>r.json())
	.then(d => {
		if(getReviews) {
			fetch(`/api/spots/${id}/reviews`)
			.then(r=>r.json())
			.then(dd => {
				dispatch(receiveSpot({ ...d, reviews: dd.Reviews }))
			})
			.catch(console.error)
		}
		else dispatch(receiveSpot(d))
	})
	.catch(console.error)
};
/* export const callDeleteSpot = (id) => async (dispatch) => {
	const response = await fetch('/api/spots/'+id, {method:'DELETE'});
	if(!response.ok) return
	dispatch(removeSpot(id));
};
export const callFetch1Spot = (id) => async (dispatch) => {
	const response = await fetch('/api/spots/'+id);
	const spot = await response.json();
	dispatch(receiveSpot(spot));
};
export const callCreateSpot = (payload) => async (dispatch) => {
	const response = await fetch('/api/spots', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	const spot = await response.json()
	if(response.ok) dispatch(receiveSpot(spot));
	return spot;
};
export const callEditSpot = (payload) => async (dispatch) => {
	const response = await fetch('/api/spots/'+payload.id, {
		method: 'PUT',
		body: JSON.stringify(payload)
	});
	const spot = await response.json()
	if(response.ok) dispatch(editSpot(spot));
	return spot;
}; */

const spotsReducer = (state = { spots: [] }, action) => {
	switch (action.type) {
		case LOAD_SPOTS: {
			const spotsState = {};
			action.spots.forEach((spot) => {
				spotsState[spot.id] = spot;
			});
			return spotsState;
		}
		case RECEIVE_SPOT:
			return { ...state, [action.spot.id]: action.spot };
		default:
			return state;
	}
};

export default spotsReducer;
