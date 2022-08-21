import React , {useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'

import { saveShippingInfo } from '../../actions/cartAction'
import MetaData from '../Layout/MetaData'
import PinDropIcon from "@mui/icons-material/PinDrop"
import HomeIcon from "@mui/icons-material/Home"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import PhoneIcon from "@mui/icons-material/Phone"
import PublicIcon from "@mui/icons-material/Public"
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation"
import {Country,State } from "country-state-city"
import { useAlert } from 'react-alert'
import CheckoutSteps from "../Cart/CheckoutSteps.js"
import { useNavigate } from 'react-router-dom'

const Shipping = () => {

const dispatch = useDispatch();
const alert = useAlert();
const {shippingInfo} = useSelector((state)=>state.cart);

const [address,setAddress] = useState(shippingInfo.address)
const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const navigate = useNavigate();


  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pincode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <>
    <MetaData title="Shipping Details" />

<CheckoutSteps activeStep={0} />

<div className="shippingContainer  w-full h-screen flex justify-center items-center ">
  <div className="shippingBox md:border md:border-black box-border rounded-md w-full  md:w-1/2  h-3/4">
    <h2 className="shippingHeading text-slate-700 font-thin text-center  underline underline-offset-8 text-3xl">Shipping Details</h2>

    <form
      className="shippingForm h-full  flex flex-col items-center  gap-5 justify-center transition-all"
      encType="multipart/form-data"
      onSubmit={shippingSubmit}
    >
      <div className='border border-slate-500 rounded flex gap-2 px-2 py-1 outline-none w-3/4'>
        <HomeIcon />
        <input
        className='outline-none'
          type="text"
          placeholder="Address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className='border border-slate-500 rounded flex gap-2 px-2 py-1 outline-none w-3/4'>
        <LocationCityIcon />
        <input
          className='outline-none'
          type="text"
          placeholder="City"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className='border border-slate-500 rounded flex gap-2 px-2 py-1 w-3/4'  >
        <PinDropIcon />
        <input
        className='outline-none'
          type="number"
          placeholder="Pin Code"
          required
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
      </div>

      <div className= "border border-slate-500 rounded flex gap-2 px-2 py-1 w-3/4" >
        <PhoneIcon />
        <input
        className='outline-none'
          type="number"
          placeholder="Phone Number"
          required
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          size="10"
        />
      </div>

      <div className=" border border-slate-500 rounded flex gap-2 px-2 py-1 w-3/4" >
        <PublicIcon />

        <select
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="outline-none w-full "
        
        >
          <option value="">Country</option>
          {Country &&
            Country.getAllCountries().map((item) => (
              <option key={item.isoCode} value={item.isoCode}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      {country && (
        <div className=" border border-slate-500 rounded flex gap-2 px-2 py-1 w-3/4" >
          <TransferWithinAStationIcon />

          <select
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
            className = "outline-none w-full"
          >
            <option value="">State</option>
            {State &&
              State.getStatesOfCountry(country).map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      )}

      <input
        type="submit"
        value="Continue"
        className="shippingBtn bg-orange-500 text-white px-3 py-1 rounded hover:bg-white hover:text-orange-500 hover:border-orange-500"
        disabled={state ? false : true}
      />
    </form>
  </div>
</div>

    </>
  )
}

export default Shipping