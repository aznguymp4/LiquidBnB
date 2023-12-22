import './SpotTile.css';
import { Link, useNavigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import { callDeleteSpot } from '../../store/spots';
import { useDispatch } from 'react-redux';
const sampleImg = ''//'https://i.imgur.com/WTy7Iwa.png'

function SpotTile({ spot, editMode }) {
	const dispatch = useDispatch()
	const nav = useNavigate()
	const prvw = spot.previewImage==='No Preview Available'? sampleImg : spot.previewImage
	let ratingTxt = 0

	if(spot.avgRating) {
		ratingTxt = (parseInt(Math.round(spot.avgRating*10))/10).toString() // e.g. "3.3333333333 stars" will be changed to "3.3 stars"
		if(!ratingTxt.includes('.')) ratingTxt += '.0' // e.g. "5 stars" will be changed to "5.0 stars"
	} else ratingTxt = 'New'

	return (<div className="spotTile">
		<Link to={`/spots/${spot.id}`} title={spot.name}>
			<img className="spotTileImg" src={prvw} alt="" onError={e => {e.target.src = sampleImg}}/>
			<div className="spotTilePropTop">
				<div className="truncate spotTileProp spotTileLoc">{spot.city}, {spot.state}</div>
				<div className="spotTileProp spotTileRating"><i className="fas fa-star"/> {ratingTxt}</div>
			</div>
			<div className="spotTilePrice spotTileProp">$<b>{spot.price}</b> night</div>
		</Link>
		{editMode && <div className="editBtns">
			<div className="redBtn alt" onClick={()=>nav(`/spots/${spot.id}/edit`)}>Update</div>
			<OpenModalButton
				className="redBtn alt"
				buttonText="Delete"
				modalComponent={
					<ConfirmDeleteModal
						confirmed={() => {
							dispatch(callDeleteSpot(spot.id))
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
	</div>);
}

export default SpotTile;