import './SpotTile.css';
import { Link } from 'react-router-dom';
const sampleImg = ''//'https://i.imgur.com/WTy7Iwa.png'

function SpotTile({ spot }) {
    const prvw = spot.previewImage==='No Preview Available'? sampleImg : spot.previewImage
	let ratingTxt = 0
	console.log(spot)

	if(spot.avgRating) {
		ratingTxt = (parseInt(Math.round(spot.avgRating*10))/10).toString() // e.g. "3.3333333333 stars" will be changed to "3.3 stars"
		if(!ratingTxt.includes('.')) ratingTxt += '.0' // e.g. "5 stars" will be changed to "5.0 stars"
	} else ratingTxt = 'New'

	return (<Link to={`/spots/${spot.id}`} title={spot.name} className="spotTile">
        <img className="spotTileImg" src={prvw} alt="" onError={e => {e.target.src = sampleImg}}/>
		<div className="spotTilePropTop">
			<div className="truncate spotTileProp spotTileLoc">{spot.city}, {spot.state}</div>
			<div className="spotTileProp spotTileRating"><i className="fas fa-star"/> {ratingTxt}</div>
		</div>
		{/* <div className="truncate spotTileProp spotTileName">{spot.name}</div> */}
		<div className="spotTilePrice spotTileProp">$<b>{spot.price}</b> night</div>
	</Link>);
}

export default SpotTile;