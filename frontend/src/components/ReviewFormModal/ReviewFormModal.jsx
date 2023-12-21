import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callCreateReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import './ReviewForm.css';

const starAmtEmoji = ['','🤬','😤','🫤','🙂','🤩✨']

function ReviewFormModal({ spotId }) {
	const dispatch = useDispatch();
  const [rvwTxt, setRvwTxt] = useState('')
  const [stars, setStars] = useState(0)
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
    if(e.target.className.includes('Disabled')) return
		e.preventDefault();
    dispatch(callCreateReview(spotId, { review: rvwTxt, stars }))
	};

  const handleStars = e => {
    const starInput = e.target.dataset.star
    if(!starInput) return
    setStars(+starInput)
  }

	return (
		<>
			<form id="reviewFormModal">
				<div id="reviewFormTitle">How was your stay?</div>
        <div className={`error${rvwTxt && rvwTxt.length<10?'':' hidden'}`}>Minimum 10 characters required</div>
        <textarea
          id="reviewFormTxt"
          type="text"
          placeholder="Leave your review here…"
          value={rvwTxt}
          rows={8}
          onChange={(e) => setRvwTxt(e.target.value)}
          required
        />
        <div id="reviewFormStars" onClick={handleStars}>
          {(()=>{
            const arr = []
            for(let i=1;i<=5;i++) {
              arr.push(<i data-star={i} className={`fa${stars >= i?'s starSolid':'r starEmpty'} fa-star fa-lg starInput`}/>)
            }
            return arr
          })()}
        </div>
        <div id="reviewFormStarsLabel">
          <b>{starAmtEmoji[stars]}</b> {stars} Star{stars==1?'':'s'}
        </div>
        <div className={`error${rvwTxt && rvwTxt.length>=10 && !stars?'':' hidden'}`}>Please rate at least one or more stars.</div>
        <div id="reviewFormSubmit" className={`redBtn${rvwTxt.length>=10 && stars?'':'Disabled'}`} onClick={handleSubmit}>
          Submit Your Review
        </div>
			</form>
		</>
	);
}

export default ReviewFormModal;