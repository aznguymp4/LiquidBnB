import './SpotForm.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { callCreateSpot, callEditSpot } from '../../store/spots'
import { useDispatch } from 'react-redux'
import { callFetch1Spot } from '../../store/spots';
import { useParams } from 'react-router-dom';
const imageURLregex = /(https?:\/\/.*\.(?:png|jpg|jpeg))/

function SpotForm({ edit }) {
	const dispatch = useDispatch();
	const nav = useNavigate()

	const { spotId } = useParams()
	const spot = useSelector(state => state.spots[spotId])
	const sessionUser = useSelector(state => state.session.user);

	useEffect(()=>{
		if(!sessionUser || (edit && spot && sessionUser.id != spot.ownerId)) return nav('/unauthorized')
		
	},[edit, sessionUser, spot, nav])

	const [country, setCountry] = useState('')
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('')
	const [description, setDescription] = useState('')
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [imgs, setImgs] = useState(new Array(5).fill(''))
	const [errs, setErrs] = useState({})
	const [submitAttempted, setSA] = useState(false)
	const [submitting, setSubmitting] = useState(false)

	useEffect(()=>{
		dispatch(callFetch1Spot(spotId));
	}, [dispatch, spotId])

	useEffect(()=>{
		if(!edit || !spot) return
		setCountry(spot.country)
		setAddress(spot.address)
		setCity(spot.city)
		setState(spot.state)
		setDescription(spot.description)
		setName(spot.name)
		setPrice(spot.price)
		// setImgs(spot.SpotImages?.map(a=>a.url) || new Array(5).fill(''))
	},[edit,spot])

	useEffect(()=>{
		if(!submitAttempted) return
		const m = {imgs:[]}
		if(!country) m.country = 'Country is required'
		if(!address) m.address = 'Address is required'
		if(!city) m.city = 'City is required'
		if(!state) m.state = 'State is required'
		if(description.length < 30) m.description = 'Description needs a minimum of 30 characters'
		if(!name) m.name = 'Name is required'
		if(name.length > 50) m.name = 'Name must be less than 50 characters'
		if(!price) m.price = 'Price is required'
		if(!imgs.filter(Boolean).length) m.imgs[0] = 'Preview image is required (image URL)'
		imgs.map((img,idx) => {
			if(!img.length) return
			if(!imageURLregex.test(img)) m.imgs[idx] = 'Must be a valid image URL'
			else if(!/\.(png|jpg|jpeg)$/.test(img)) m.imgs[idx] = 'Image URL must end in .png, .jpg, or .jpeg'
		})
		if(!m.imgs.length || edit) delete m.imgs
		setErrs(m)
		if(submitting) onSubmit(m)
	}, [country, address, city, state, description, name, price, imgs, submitAttempted, submitting, edit])

	const onSubmit = (m) => {
		setSubmitting(false)
		if(Object.values(m).length) return alert(`The following errors were found:\n\n${Object.values(m).map(e=>`    * ${e}`).join('\n')}`)

		const body = {address, city, state, country, name, description, price: +price}
		dispatch(edit && spotId ? callEditSpot(spotId, body) : callCreateSpot(body, imgs))
	}

	return (<>
		<form id="spotForm">
			<h1>{edit? 'Update your' : 'Create a New'} Spot</h1>
			<div className="formSectionTitle">
				Where&apos;s your place located?
				<br/>
				<span>Guests will only get your exact address once they booked a reservation.</span>
			</div>
			<label htmlFor="country">
				Country <span className='error'>{errs.country}</span>
			</label>
			<input
				name="country"
				type="text"
				placeholder="Country"
				value={country}
				onChange={(e) => setCountry(e.target.value)}
				required
			/>
			<label htmlFor="address">
				Street Address <span className='error'>{errs.address}</span>
			</label>
			<input
				name="address"
				type="text"
				placeholder="Address"
				value={address}
				onChange={(e) => setAddress(e.target.value)}
				required
			/>
			<div id="fieldsCityState">
				<div id="fieldCity">
					<label htmlFor="city">
						City <span className='error'>{errs.city}</span>
					</label>
					<input
						name="city"
						type="text"
						placeholder="City"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
					/>
				</div>
				<span className="fieldComma">, </span>
				<div id="fieldState">
					<label htmlFor="state">
						State <span className='error'>{errs.state}</span>
					</label>
					<input
						name="state"
						type="text"
						placeholder="STATE"
						value={state}
						onChange={(e) => setState(e.target.value)}
						required
					/>
				</div>
			</div>
			<div className="hr"/>
			<div className="formSectionTitle">
				Describe your place to guests
				<br/>
				<span>Mention the best features of your space, any special amenities like fast Wi-Fi or parking, and what you love about the neighborhood.</span>
			</div>
			<br/>
			<textarea
				name="description"
				placeholder="Please write at least 30 characters"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				rows={8}
				required
			/>
			<span className='error'>{errs.description}</span>
			<div className="hr"/>
			<div className="formSectionTitle">
				Create a title for your spot
				<br/>
				<span>Catch guests&apos; attention with a spot name that highlights what makes your place special.</span>
			</div>
			<br/><input
				type="text"
				placeholder="Name of your spot"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<span className='error'>{errs.name}</span>
			<div className="hr"/>
			<div className="formSectionTitle">
				Set a base price for your spot
				<br/>
				<span>Competitive pricing can help your listing stnad out and rank higher in search results.</span>
			</div>
			<br/>
			<i className="fas fa-dollar-sign fa-lg"/><input
				id="fieldPrice"
				type="number"
				placeholder="Price per night (USD)"
				min={1}
				value={price}
				onChange={(e) => setPrice(e.target.value)}
				required
			/>
			<span className='error'>{errs.price}</span>
			{!edit && <>
				<div className="hr"/>
				<div className="formSectionTitle">
					Liven up your spot with photos
					<br/>
					<span>Submit a link to at least one photo to publish your spot.</span>
				</div>
				<div id="formImgFields">
					{(()=>{
						const a = []
						for (let i=0;i<5;i++) {
							a.push(<>
								<input
									name={`imgUrl${i}`}
									type="text"
									placeholder={`${i?'':'Preview '}Image URL`}
									value={imgs[i]}
									onChange={(e) => {
										const a = [...imgs]
										a[i] = e.target.value
										setImgs(a)
									}}
									required={i==0}
								/>
								<label htmlFor={`imgUrl${i}`}>
									<span className='error'>{errs.imgs && errs.imgs[i]? errs.imgs[i] : ''}</span>
								</label>
							</>)
						}
						return a
					})()}
				</div>
			</>}
			<div className="hr"/>
			<div className="redBtn" id="spotFormCreate" onClick={()=>{setSubmitting(true); setSA(true)}}>
				{edit? 'Update':'Create'} Spot
			</div>
		</form>
	</>);
}

export default SpotForm;