import './SpotTile.css';
import { Link } from 'react-router-dom';
const sampleImg = ''//'https://i.imgur.com/WTy7Iwa.png'

function SpotTile({ spot }) {
    const prvw = spot.previewImage==='No Preview Available'? sampleImg : spot.previewImage

	return (<Link to={`/spots/${spot.id}`} className="spotTile">
        <img className="spotTileImg" src={prvw} alt="" onError={e => {e.target.src = sampleImg}}/>
		<div className="spotTilePropTop">
			<div className="truncate spotTileProp spotTileLoc">{spot.city}, {spot.state}</div>
			<div className="spotTileProp spotTileRating"><i className="fas fa-star"/> {spot.avgRating}</div>
		</div>
		{/* <div className="truncate spotTileProp spotTileName">{spot.name}</div> */}
		<div className="spotTilePrice spotTileProp">$<b>{spot.price}</b> night</div>
	</Link>);
}

export default SpotTile;