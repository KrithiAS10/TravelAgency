import React, { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import api from './api';

const destinations = [
  { name:'Mangalore', subtitle:'Mangaluru, Karnataka', image:'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900', description:'Explore beaches, temples, churches and coastal attractions.' },
  { name:'Udupi', subtitle:'Udupi, Karnataka', image:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900', description:'Discover temples, islands, beaches and local culture.' }
];

const attractions = {
  Mangalore: [
    ['Beaches', [
      ['Panambur Beach','Popular beach known for its wide shoreline and sunset views.'],
      ['Tannirbhavi Beach','A quieter beach reached by road or ferry.'],
      ['Someshwara Beach','Coastal spot known for its rocky shoreline and Rudra Shile.'],
      ['Surathkal Beach','Beach near the lighthouse and NITK area.'],
      ['Ullal Beach','Coastal stretch south of Mangaluru.'],
      ['Sasihithlu Beach','Scenic beach near the estuary.'],
      ['Bengre Beach','A long sandy stretch between the sea and river.']
    ]],
    ['Temples & heritage', [
      ['Kudroli Gokarnanatheshwara Temple','Well-known temple with distinctive architecture.'],
      ['Kadri Manjunatha Temple','Historic temple at the foothills of Kadri.'],
      ['Mangaladevi Temple','Temple associated with the name of Mangaluru.'],
      ['Sharavu Mahaganapathi Temple','Popular Ganapathi temple in the city.'],
      ['Sultan Battery','Historic watchtower near the Gurupura river.']
    ]],
    ['Churches & city attractions', [
      ['St. Aloysius Chapel','Known for its detailed interior paintings.'],
      ['Rosario Cathedral','Historic cathedral in Mangaluru.'],
      ['Milagres Church','One of the city’s well-known churches.'],
      ['Pilikula Nisರ್ಗadhama','Nature, cultural and recreational attractions in one area.'],
      ['Pilikula Biological Park','Wildlife park within the Pilikula complex.'],
      ['Kadri Park','Public park and green space.']
    ]]
  ],
  Udupi: [
    ['Beaches & islands', [
      ['Malpe Beach','Popular beach with water activities and boat access.'],
      ['St. Mary’s Island','Island known for its distinctive columnar rock formations.'],
      ['Kaup (Kapu) Beach','Coastal destination with a historic lighthouse.'],
      ['Mattu Beach','Quiet beach known for its coastal scenery.'],
      ['Kodi Bengre / Delta Beach','Scenic estuary and beach area.'],
      ['Padukere Beach','Coastal stretch near Malpe.']
    ]],
    ['Temples & heritage', [
      ['Sri Krishna Matha','Famous Krishna temple and pilgrimage centre.'],
      ['Anantheshwara Temple','Historic temple near Krishna Matha.'],
      ['Chandramouleshwara Temple','Ancient temple in central Udupi.'],
      ['Anegudde Vinayaka Temple','Popular Ganesha temple in Kumbashi.'],
      ['Kollur Mookambika Temple','Major pilgrimage destination in the wider Udupi region.'],
      ['Barkur','Historic town with temples and heritage remains.']
    ]],
    ['Nature & experiences', [
      ['Manipal End Point','Viewpoint overlooking the Swarna river valley.'],
      ['Hasta Shilpa Heritage Village','Museum and heritage architecture experience.'],
      ['Pajaka Kshetra','Traditional pilgrimage site associated with Madhvacharya.'],
      ['Kemmannu Hanging Bridge','Scenic bridge area near the backwaters.']
    ]]
  ]
};

function Header({user,logout}) {
  return <header className="topbar"><Link className="logo" to="/">TravelAgency ◉</Link><nav><NavLink to="/locations">Explore</NavLink><NavLink to="/places?destination=Mangalore">Places</NavLink>{user?<><NavLink to="/bookings">My bookings</NavLink><span className="hello">Hi, {user.name}</span><button className="plain" onClick={logout}>Logout</button></>:<NavLink to="/login" aria-label="Login">♙</NavLink>}</nav></header>;
}
function Landing(){
 return <main className="landing"><div className="landing-shade"/><Header/><section className="landing-copy"><h1>Are you ready for an adventure?</h1><p>Explore the beautiful coast of Mangalore and Udupi.</p><Link className="explore-pill" to="/locations">Explore destinations</Link></section></main>;
}
function Locations(){
 return <main className="page-shell"><Header/><div className="content"><span className="explore-pill small-pill">Explore Karnataka Coast</span><h1 className="page-title">Explore Mangalore & Udupi</h1><p className="intro">Choose a destination to discover tourist attractions and places to stay.</p><div className="destination-grid">{destinations.map(d=><article className="destination-card" key={d.name}><Link to={`/places?destination=${encodeURIComponent(d.name)}`}><div className="destination-photo"><img src={d.image} alt={d.name}/><span>{d.name}</span></div><strong>{d.subtitle}</strong><p>{d.description}</p></Link><div className="destination-links"><Link to={`/places?destination=${encodeURIComponent(d.name)}`}>Explore places</Link><Link to={`/hotels?destination=${encodeURIComponent(d.name)}`}>View hotels</Link></div></article>)}</div></div></main>;
}
function Places(){
 const [params]=useSearchParams();const destination=params.get('destination')||'Mangalore';const groups=attractions[destination]||attractions.Mangalore;
 return <main className="page-shell"><Header/><div className="content"><Link className="explore-pill small-pill" to="/locations">All destinations</Link><h1 className="page-title">Places to visit in {destination}</h1><p className="intro">Explore beaches, temples, heritage sites and local attractions.</p>{groups.map(([category,items])=><section className="attraction-section" key={category}><h2>{category}</h2><div className="attraction-grid">{items.map(([name,description])=><article className="attraction-card" key={name}><span className="pin">📍</span><div><h3>{name}</h3><p>{description}</p></div></article>)}</div></section>)}<Link className="book-btn" to={`/hotels?destination=${encodeURIComponent(destination)}`}>Find places to stay in {destination}</Link></div></main>;
}
function Hotels(){
 const [params]=useSearchParams();const destination=params.get('destination')||'Mangalore';
 const [hotels,setHotels]=useState([]),[error,setError]=useState(''),[loading,setLoading]=useState(true),[retry,setRetry]=useState(0);
 useEffect(()=>{
   let active=true;
   setLoading(true); setError('');
   api.get('/hotels',{params:{destination}})
     .then(r=>{if(active)setHotels(Array.isArray(r.data)?r.data:[]);})
     .catch(e=>{if(active){setHotels([]);setError(e.code==='ERR_NETWORK'?'Cannot reach the TravelAgency server. Start the backend and MongoDB, then try again.':(e.response?.data?.message||'We could not load hotels right now. Please try again.'));}})
     .finally(()=>{if(active)setLoading(false);});
   return ()=>{active=false;};
 },[destination,retry]);
 return <main className="page-shell"><Header/><div className="content hotels-content"><Link className="explore-pill small-pill" to="/locations">← All destinations</Link><div className="hotel-heading"><div><p className="eyebrow">STAY BY THE COAST</p><h1 className="page-title">Best Hotels in {destination}</h1><p className="intro">Find a comfortable stay for your {destination} getaway.</p></div><span className="stay-count">{hotels.length} stays</span></div>
 {loading?<div className="hotel-state"><span className="loader"/><p>Finding stays in {destination}…</p></div>:error?<div className="hotel-state error-state"><span className="state-icon">⌁</span><h2>Hotels are temporarily unavailable</h2><p>{error}</p><button className="book-btn" onClick={()=>setRetry(v=>v+1)}>Try again</button></div>:hotels.length===0?<div className="hotel-state"><span className="state-icon">⌂</span><h2>No stays listed yet</h2><p>There are no sample hotels for {destination} in the database yet.</p></div>:<div className="hotel-grid">{hotels.map(h=><article className="hotel-card" key={h._id}><Link to={`/hotels/${h._id}`} className="hotel-photo"><img src={h.image} alt={h.name}/><span>{h.destination}, Karnataka</span></Link><div className="hotel-card-body"><div className="hotel-meta"><h3>{h.name}</h3><span className="rating">★ {Number(h.rating||0).toFixed(1)}</span></div><p className="hotel-address">⌖ {h.address}</p><div className="hotel-action"><div><strong>₹{Number(h.pricePerNight).toLocaleString('en-IN')}</strong><small> / night</small></div><Link className="book-btn" to={`/hotels/${h._id}`}>View stay <span>→</span></Link></div></div></article>)}</div>}</div></main>;
}
function Auth({onLogin}){
 const [mode,setMode]=useState('login'),[form,setForm]=useState({name:'',email:'',password:''}),[error,setError]=useState('');
 const nav=useNavigate();
 const submit=async e=>{e.preventDefault();setError('');try{const {data}=await api.post(`/auth/${mode}`,form);localStorage.setItem('travel_token',data.token);localStorage.setItem('travel_user',JSON.stringify(data.user));onLogin(data.user);nav('/locations');}catch(err){setError(err.response?.data?.message||'Unable to continue');}};
 return <main className="auth-page"><Header/><form className="auth-card" onSubmit={submit}><h2>{mode==='login'?'Welcome back':'Create account'}</h2>{mode==='register'&&<label>Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>}<label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Password<input type="password" minLength="6" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>{error&&<p className="error">{error}</p>}<button className="book-btn wide">{mode==='login'?'Login':'Register'}</button><p>{mode==='login'?'New user?':'Already registered?'} <button type="button" className="plain" onClick={()=>setMode(mode==='login'?'register':'login')}>{mode==='login'?'Create account':'Login'}</button></p></form></main>;
}
function HotelDetail({user}){
 const {hotelId}=useParams();const [hotel,setHotel]=useState(null),[dates,setDates]=useState({checkIn:'',checkOut:'',guests:1}),[message,setMessage]=useState('');const nav=useNavigate();
 useEffect(()=>{api.get(`/hotels/${hotelId}`).then(r=>setHotel(r.data)).catch(()=>setMessage('Hotel not found'));},[hotelId]);
 const book=async e=>{e.preventDefault();if(!user){nav('/login');return;}try{const {data}=await api.post('/bookings',{hotelId,...dates,guests:Number(dates.guests)});setMessage(`${data.message}. Estimated total: ₹${Number(data.booking.totalPrice).toLocaleString('en-IN')}`);}catch(err){setMessage(err.response?.data?.message||'Booking failed');}};
 if(!hotel)return <main className="page-shell"><Header/>{message||'Loading...'}</main>;
 return <main className="page-shell"><Header/><div className="content detail-layout"><img className="detail-photo" src={hotel.image} alt={hotel.name}/><div><span className="location-tag">{hotel.destination}, Karnataka</span><h1>{hotel.name}</h1><p>★ {hotel.rating} · {hotel.address}</p><p>{hotel.description}</p><h2>₹{Number(hotel.pricePerNight).toLocaleString('en-IN')} <small>per night</small></h2><div className="amenities">{hotel.amenities?.map(a=><span key={a}>{a}</span>)}</div><form className="booking-form" onSubmit={book}><h2>Book your stay</h2><label>Check-in<input type="date" required value={dates.checkIn} onChange={e=>setDates({...dates,checkIn:e.target.value})}/></label><label>Check-out<input type="date" required value={dates.checkOut} onChange={e=>setDates({...dates,checkOut:e.target.value})}/></label><label>Guests<input type="number" min="1" value={dates.guests} onChange={e=>setDates({...dates,guests:e.target.value})}/></label><button className="book-btn wide">Book</button>{message&&<p className="notice">{message}</p>}<small>Demo booking request; no payment is collected.</small></form></div></div></main>;
}
function Bookings({user}){
 const [items,setItems]=useState([]),[error,setError]=useState('');
 useEffect(()=>{if(user)api.get('/bookings/my').then(r=>setItems(r.data)).catch(e=>setError(e.response?.data?.message||'Unable to load'));},[user]);
 return <main className="page-shell"><Header/><div className="content"><h1 className="page-title">My bookings</h1>{!user?<p>Please <Link to="/login">login</Link> to view bookings.</p>:error?<p className="error">{error}</p>:items.map(b=><article className="booking-row" key={b._id}><div><h3>{b.hotel?.name}</h3><p>{b.hotel?.destination} · {new Date(b.checkIn).toLocaleDateString()} – {new Date(b.checkOut).toLocaleDateString()}</p><small>{b.guests} guest(s) · {b.status}</small></div><strong>₹{Number(b.totalPrice).toLocaleString('en-IN')}</strong></article>)}</div></main>;
}
export default function App(){
 const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem('travel_user')||'null')}catch{return null}});
 const logout=()=>{localStorage.removeItem('travel_token');localStorage.removeItem('travel_user');setUser(null);};
 return <><Routes><Route path="/" element={<Landing/>}/><Route path="/locations" element={<Locations/>}/><Route path="/places" element={<Places/>}/><Route path="/hotels" element={<Hotels/>}/><Route path="/hotels/:hotelId" element={<HotelDetail user={user}/>}/><Route path="/login" element={<Auth onLogin={setUser}/>}/><Route path="/bookings" element={<Bookings user={user}/>}/><Route path="*" element={<Landing/>}/></Routes><footer className="footer">TravelAgency · Discover the Mangalore–Udupi coast</footer></>;
}
