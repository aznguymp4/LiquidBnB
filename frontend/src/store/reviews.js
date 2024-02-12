import { csrfFetch } from './csrf';
export const [LOAD_REVIEWS,RECEIVE_REVIEW,REMOVE_REVIEW] = ['reviews/LOAD_REVIEWS','reviews/RECEIVE_REVIEW','reviews/REMOVE_REVIEW'];

export const loadReviews = reviews => ({
	type: LOAD_REVIEWS,
	reviews
})
export const receiveReview = review => ({
	type: RECEIVE_REVIEW,
	review
})
export const removeReview = reviewId => ({
	type: REMOVE_REVIEW,
	reviewId
})

export const callFetchReviewsForUser = () => dispatch => {
	csrfFetch('/api/reviews/current')
	.then(r=>r.json())
	.then(d => dispatch(loadReviews(d.Reviews)))
	.catch(console.error)
};
export const callFetchReviewsForSpot = (spotId) => dispatch => {
	fetch(`/api/spots/${spotId}/reviews/`)
	.then(r=>r.json())
	.then(d => dispatch(loadReviews(d.Reviews)))
	.catch(console.error)
};
export const callCreateReview = (spotId, body, imgs) => dispatch => {
	window.location.search = ''
	csrfFetch(`/api/spots/${spotId}/reviews`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({...body}),
	})
	.then(r=>r.json())
	.then(d => {
		if(imgs) {
		Promise.all(imgs.map((url,idx) => {
			if(!url) return
			csrfFetch(`/api/reviews/${d.id}/images`, {
				method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ url, preview: idx==0 })
				})
			.then(r=>r.json())
			.catch(console.error)
		}))
		.then(() => {
			dispatch(receiveReview(d))
			window.location=`/spots/${spotId}?reviewJump=${d.id}`
		})
		.catch(() => {
			alert('There was error uploading images, but the new Review was successfully created.')
		})
		} else {
			dispatch(receiveReview(d))
			window.location=`/spots/${spotId}?reviewJump=${d.id}`
		}
	})
	.catch(console.error)
}
export const callDeleteReview = reviewId => dispatch => {
	csrfFetch(`/api/reviews/${reviewId}`, {method: 'DELETE'})
	.then(r=>r.json())
	.then(() => dispatch(removeReview(reviewId)))
	.catch(console.error)
}

const reviewsReducer = (state = { reviews: [] }, action) => {
	switch (action.type) {
		case LOAD_REVIEWS: {
			const reviewsState = {};
			action.reviews.forEach((review) => {
				reviewsState[review.id] = review;
			});
			return reviewsState;
		}
		case RECEIVE_REVIEW:
			return { ...state, [action.review.id]: action.review };
		case REMOVE_REVIEW: {
			const newState = { ...state };
			delete newState[action.reviewId];
			return newState;
		}
		default:
			return state;
	}
};

export default reviewsReducer;
