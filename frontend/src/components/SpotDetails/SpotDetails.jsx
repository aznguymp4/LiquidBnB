import './SpotDetails.css';
import { useParams, useSearchParams, useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { callFetch1Spot, callDeleteSpot } from '../../store/spots';
import { callFetchReviewsForSpot, callDeleteReview } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import ReviewFormModal from '../ReviewFormModal'
import ConfirmDeleteModal from '../ConfirmDeleteModal'
import { useModal } from '../../context/Modal';

const starSolid = <i className="fas fa-star starSolid"/>
const starEmpty = <i className="far fa-star starEmpty"/>
const placeholder = 'https://www.colorhexa.com/dddddd.png'

function SpotDetails() {
  const { spotId } = useParams();
  const nav = useNavigate()
	const dispatch = useDispatch();
	const spot = useSelector(state => state.spots[spotId]);
  const reviews = useSelector(state => state.reviews);
  const sessionUser = useSelector(state => state.session.user);
  const userOwnsSpot = spot?.Owner?.id == sessionUser?.id
  const [searchParams] = useSearchParams();
  const reviewHighlight = searchParams.get('reviewJump')
  const { setModalContent } = useModal();

	useEffect(() => {
    dispatch(callFetchReviewsForSpot(spotId))
	}, [dispatch, spotId]);

  useEffect(() => {
    dispatch(callFetch1Spot(spotId));
  }, [dispatch, reviews, spotId])

  if(!spot) return <h2 id="unauthorized">
    Spot was not found! :(
    <br/>
    <br/>
    <div className="redBtn" id="unauthorizedGoHome" onClick={()=>nav('/')}>Go Home</div>
  </h2>;
  if(spot?.SpotImages?.length < 5) { // placeholder gray tiles for no emptiness!
    for(let i=0;i<=5-spot.SpotImages.length;i++) {
      spot.SpotImages.push({ id: 0, url: placeholder, preview: false, placeholder: true })
    }
  }
  spot.avgRating = (parseInt(Math.round(spot.avgRating*10))/10).toString() // e.g. "3.3333333333 stars" will be changed to "3.3 stars"
  if(!spot.avgRating.includes('.')) spot.avgRating += '.0' // e.g. "5 stars" will be changed to "5.0 stars"
  const s = (spot?.numReviews || 0)==1?'':'s'

	return (<>
    <div id="spotDetailHeader">
      <NavLink id="spotName" className="wrap" to='/'>{spot.name}</NavLink>
      {userOwnsSpot && <div id="spotDetailControl">
        <div className="redBtn" onClick={()=>nav(`/spots/${spotId}/edit`)}><i className="fas fa-edit"/> Update</div>
        {/* <div className="redBtn"><i className="fas fa-trash-alt"/> Delete</div> */}
        <OpenModalButton
          className="redBtn"
          buttonText={<><i className="fas fa-trash-alt"/> Delete</>}
          modalComponent={
            <ConfirmDeleteModal
              confirmed={() => {
                dispatch(callDeleteSpot(spotId))
                nav('/spots/current')
              }}
              text={{
                title: 'Confirm Delete',
                desc: 'Are you sure you want to remove this spot?',
                btnYes: 'Yes (Delete Spot)',
                btnNo: 'No (Keep Spot)'
              }}
            />
          }
        />
      </div>}
    </div>
    
		<div id="spotLoc">{spot.city}, {spot.state}, {spot.country}</div>
		<div id="spotImgGrid">
			{spot.SpotImages?.map((i,idx) => {
				return <img key={idx} src={i.url} onClick={()=>{
          if(i.url == placeholder) return
          setModalContent(<img className="expandedImg" src={i.url}/>)
        }}/>
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
            {starSolid} {spot.numReviews? `${spot.avgRating||0}・${spot.numReviews} review${s}` : `New`}
          </div>
        </div>
        <div id="spotRsrvBtn" className="redBtn" onClick={()=>alert('Feature Coming Soon...')}>
          Reserve
        </div>
      </div>
    </div>
    <hr/>
    <div id="spotReviews">
      {starSolid} {spot.numReviews? `${spot.avgRating||0}・${spot.numReviews} review${s}` : `New${userOwnsSpot || !sessionUser? '' : '・Be the first to post a review!'}`}
      {
        Object.values(reviews).find(r=>r.userId==sessionUser?.id) || userOwnsSpot || !sessionUser ? <><br/><br/></> : <OpenModalButton
          className="redBtn"
          id="spotReviewAddBtn"
          buttonText="Post Your Review"
          modalComponent={<ReviewFormModal spotId={spotId}/>}
        />
      }
      <div id="spotReviewList">
        {(()=>{
          let highlightIdx
          const arr = Object.values(reviews).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))?.map((review,idx) => {
            const userOwnsReview = review.userId==sessionUser?.id
            const highlighted = review.id==reviewHighlight || userOwnsReview
            if(highlighted) highlightIdx = idx
            return <div key={review.id} id={`spotReviewId${review.id}`} className={`spotReview${highlighted? ' highlight' : ''}`}>
              <div className="spotReviewHeader">
                {review.User?.firstName}・
                {(()=>{
                  const stars = new Array(review.stars).fill(starSolid)
                  for(let i=0;i<5-review.stars;i++) stars.push(starEmpty)
                  return stars
                })()}
              </div>
              <div className="spotReviewDate">{new Date(review.createdAt).toLocaleDateString('en-US', {year:'numeric',month:'long'})}</div>
              <div>{review.review}</div>
              {userOwnsReview && <OpenModalButton
                id="spotReviewDeleteBtn"
                className="redBtn"
                buttonText="Delete"
                modalComponent={<ConfirmDeleteModal
                  confirmed={() => {
                    dispatch(callDeleteReview(review.id))
                  }}
                  text={{
                    title: 'Confirm Delete',
                    desc: 'Are you sure you want to delete this review?',
                    btnYes: 'Yes (Delete Review)',
                    btnNo: 'No (Keep Review)'
                  }}
                  />}
              />}
            </div>
          })

          if(!highlightIdx) return arr
          const moveUp = arr.splice(highlightIdx, 1)
          arr.unshift(moveUp)
          if(reviewHighlight) scroll(0, 585)
          return arr
        })()}
      </div>
    </div>
	</>);
}

export default SpotDetails;