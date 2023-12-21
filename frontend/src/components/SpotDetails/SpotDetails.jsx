import './SpotDetails.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { callFetch1Spot } from '../../store/spots';

const starFilled = <i className="fas fa-star"/>
const starHollow = <i className="far fa-star"/>

function SpotDetails() {
	const { spotId } = useParams();
	const dispatch = useDispatch();
	const spot = useSelector(state => state.spots[spotId]);
	useEffect(() => {
		dispatch(callFetch1Spot(spotId, true));
	}, [dispatch, spotId]);

  if(!spot) return null
  if(spot?.SpotImages?.length < 5) { // placeholder gray tiles for no emptiness!
    for(let i=0;i<=5-spot.SpotImages.length;i++) {
      spot.SpotImages.push({ id: 0, url: 'https://www.colorhexa.com/dddddd.png', preview: false, placeholder: true })
    }
  }
  spot.avgRating = (parseInt(Math.round(spot.avgRating*10))/10).toString() // e.g. "3.3333333333 stars" will be changed to "3.3 stars"
  if(!spot.avgRating.includes('.')) spot.avgRating += '.0' // e.g. "5 stars" will be changed to "5.0 stars"
  console.log(spot)
  const s = spot.numReviews==1?'':'s'

	return (<>
    <br/>
		<a id="spotName" className="wrap" href="/">{spot.name}</a>
		<div id="spotLoc">{spot.city}, {spot.state}, {spot.country}</div>
		<div id="spotImgGrid">
			{spot.SpotImages?.map((i,idx) => {
				return <img key={idx} src={i.url}/>
			})}
		</div>
    <div id="spotInfo">
      <div id="spotInfoL">
        <div id="spotHost">
          Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}
        </div>
        <div id="spotDesc" className="wrap">
          {spot.description}
        </div>
      </div>
      <div id="spotInfoR">
        <div id="spotInfoRTop">
          <div id="spotInfoRPrice">
            <span id="spotPrice">${spot.price}</span>
            <span> night</span>
          </div>
          <div id="spotInfoRReview">
            {starFilled} {spot.avgRating||0}・{spot.numReviews} review{s}
          </div>
        </div>
        <div id="spotRsrvBtn" onClick={()=>alert('Feature Coming Soon...')}>
          Reserve
        </div>
      </div>
    </div>
    <hr/>
    <div id="spotReviews">
      {starFilled} {spot.avgRating||0}・{spot.numReviews} review{s}
      <div id="spotReviewList">
        {spot.reviews?.map(review => {
          return <div key={review.id} className="spotReview">
            <div className="spotReviewHeader">
              {review.User.firstName}・
              {(()=>{
                const stars = new Array(review.stars).fill(starFilled)
                for(let i=0;i<5-review.stars;i++) stars.push(starHollow)
                return stars
              })()}
            </div>
            <div className="spotReviewDate">{new Date(review.createdAt).toLocaleDateString('en-US', {year:'numeric',month:'long'})}</div>
            <div>{review.review}</div>
          </div>
        })}
      </div>
    </div>
	</>);
}

export default SpotDetails;