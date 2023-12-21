import { csrfFetch } from './csrf';
export const [LOAD_SPOTS,RECEIVE_SPOT,REMOVE_SPOT] = ['spots/LOAD_SPOTS','spots/RECEIVE_SPOT','spots/REMOVE_SPOT'];

export const loadSpots = spots => ({
	type: LOAD_SPOTS,
	spots
})
export const receiveSpot = spot => ({
	type: RECEIVE_SPOT,
	spot
})
export const removeSpot = spotId => ({
	type: REMOVE_SPOT,
	spotId
})

export const callFetchSpots = (filterOwned) => dispatch => {
	csrfFetch(`/api/spots${filterOwned?'/current':''}`)
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
export const callCreateSpot = (body, imgs) => dispatch => {
	csrfFetch('/api/spots', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({...body, lat:10, lng:10}),
	})
	.then(r=>r.json())
	.then(d => {
		if(imgs) {
		Promise.all(imgs.map((url,idx) => {
			if(!url) return
			csrfFetch(`/api/spots/${d.id}/images`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url, preview: idx==0 })
				})
			.then(r=>r.json())
			.catch(console.error)
		}))
		.then(() => {
			dispatch(receiveSpot(d))
			window.location='/spots/'+d.id
		})
		.catch(() => {
			alert('There was error uploading images, but the new Spot was successfully created.')
		})
		} else {
		dispatch(receiveSpot(d))
		window.location='/spots/'+d.id
		}
	})
	.catch(console.error)
}
export const callDeleteSpot = spotId => dispatch => {
	csrfFetch('/api/spots/'+spotId, { method: 'DELETE' })
	.then(() => dispatch(removeSpot(spotId)))
	.catch(console.error)
}
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
		case REMOVE_SPOT: {
			const newState = { ...state };
			delete newState[action.spotId];
			return newState;
		}
		default:
			return state;
	}
};

export default spotsReducer;
