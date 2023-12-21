// import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callDeleteReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';
// // import * as sessionActions from '../../store/session';
import './ReviewDeleteModal.css';

function ReviewDeleteModal({ reviewId }) {
	const dispatch = useDispatch()
	const { closeModal } = useModal();
	const handleConfirm = () => {
		dispatch(callDeleteReview(reviewId))
		window.location.reload()
	}

	return (
		<div id="reviewDeleteModal">
			<h2>Confirm Delete</h2>
			<div>Are you sure you want to delete this review?</div>
			<div className="redBtn" id="reviewDeleteBtnYes" onClick={handleConfirm}>Yes (Delete Review)</div>
			<div className="redBtn" id="reviewDeleteBtnNo" onClick={closeModal}>No (Keep Review)</div>
		</div>
	);
}

export default ReviewDeleteModal;