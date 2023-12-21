import './SpotForm.css';
import { useState, useEffect } from 'react';
import { callCreateSpot } from '../../store/spots'
import { useDispatch } from 'react-redux'
const imageURLregex = /(https?:\/\/.*\.(?:png|jpg|jpeg)$)/

function SpotForm() {
  const [country, setCountry] = useState('')
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('')
	const [description, setDescription] = useState('')
	const [name, setName] = useState('')
	const [price, setPrice] = useState()
	const [imgs, setImgs] = useState(new Array(5).fill(''))
	const [errs, setErrs] = useState({})
  const [submitAttempted, setSA] = useState(false)
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(!submitAttempted) return
    const m = {imgs:[]}
    if(!country) m.country = 'Country is required'
    if(!address) m.address = 'Address is required'
    if(!city) m.city = 'City is required'
    if(!state) m.state = 'State is required'
    if(description.length < 30) m.description = 'Description needs a minimum of 30 characters'
    if(!name) m.name = 'Name is required'
    if(!price) m.price = 'Price is required'
    if(!imgs.filter(Boolean).length) m.imgs[0] = 'Preview image is required'
    imgs.map((img,idx) => {
      if(!img.length) return
      if(!imageURLregex.test(img)) m.imgs[idx] = 'Image URL must be a valid URL'
      if(!/\.(png|jpg|jpeg)$/.test(img)) m.imgs[idx] = 'Image URL must end in .png, .jpg, or .jpeg'
    })
    if(!m.imgs.length) delete m.imgs
    setErrs(m)
  }, [country, address, city, state, description, name, price, imgs, submitAttempted])

  const onSubmit = async e => {
    e.preventDefault()
    if(Object.values(errs).length) return alert(`The following errors were found:\n\n${Object.values(errs).map(e=>`    * ${e}`)}`)

    const body = {address, city, state, country, name, description, price: +price}
    dispatch(callCreateSpot(body, imgs))
  }

	return (<>
		<h1>Create a new Spot</h1>
		<form id="spotForm" onSubmit={onSubmit}>
      <h3>
        Where&apos;s your place located?
        <br/>
        <span>Guests will only get your exact address once they booked a reservation.</span>
      </h3>
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
        
      <label>
        Street Address <span className='error'>{errs.address}</span>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        City <span className='error'>{errs.city}</span>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        /><> , </>
        State <span className='error'>{errs.state}</span>
        <input
          type="text"
          placeholder="STATE"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <hr/>
      <h3>
        Describe your place to guests
        <br/>
        <span>Mention the best features of your space, any special amenities like fast Wi-Fi or parking, and what you love about the neighborhood.</span>
      </h3>
      <label>
        <textarea
          type="text"
          placeholder="Please write at least 30 characters"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <span className='error'>{errs.description}</span>
      </label>
      <hr/>
      <h3>
        Create a name for your spot
        <br/>
        <span>Catch guests&apos; attention with a spot name that highlights what makes your place special.</span>
      </h3>
      <label>
        <input
          type="text"
          placeholder="Name of your spot"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <span className='error'>{errs.name}</span>
      </label>
      <hr/>
      <h3>
        Set a base price for your spot
        <br/>
        <span>Competitive pricing can help your listing stnad out and rank higher in search results.</span>
      </h3>
      <label>
        <>$ </>
        <input
          type="number"
          placeholder="Price per night (USD)"
          value={price}
          min="1"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <span className='error'>{errs.price}</span>
      </label>
      <hr/>
      <h3>
        Liven up your spot with photos
        <br/>
        <span>Submit a link to at least one photo to publish your spot.</span>
      </h3>
      {(()=>{
        const a = []
        for (let i=0;i<5;i++) {
          a.push(<label>
            <input
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
            <span className='error'>{errs.imgs && errs.imgs[i]? errs.imgs[i] : ''}</span>
          </label>)
        }
        return a
      })()}
      <hr/>
      <button type="submit" onClick={()=>{setSA(true)}}>
        Create Spot
      </button>
		</form>
	</>);
}

export default SpotForm;