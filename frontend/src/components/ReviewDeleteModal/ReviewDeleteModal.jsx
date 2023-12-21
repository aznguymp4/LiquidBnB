// import { useState } from 'react';
// import { callFetch } from '../../store/reviews';
// // import * as sessionActions from '../../store/session';
// import { useDispatch } from 'react-redux';
// import { callDeleteReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import './ReviewDeleteModal.css';

function ReviewDeleteModal({ confirmed }) {
	// const dispatch = useDispatch()
	const { closeModal } = useModal();
	// const handleConfirm = () => {
	// 	dispatch(callDeleteReview(reviewId))
	// 	closeModal()
	// }

	return (
		<div id="reviewDeleteModal">
			<h2>Confirm Delete</h2>
			<div>Are you sure you want to delete this review?</div>
			<div className="redBtn" id="reviewDeleteBtnYes" onClick={()=>{confirmed(); closeModal()}}>Yes (Delete Review)</div>
			<div className="redBtn" id="reviewDeleteBtnNo" onClick={closeModal}>No (Keep Review)</div>
		</div>
	);
}

export default ReviewDeleteModal;