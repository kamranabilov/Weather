import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import '../style/style.css';
import { BsSearch } from 'react-icons/bs';
import { BsWind } from 'react-icons/bs';
import { BsMoisture } from 'react-icons/bs';
import { FaWhatsappSquare } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Map from './Map';
// import { BsFillCloudSunFill } from 'react-icons/bs';
// import search from '../images/search.png';

function Home() {
    // const notify = () => toast.success("Name add!!");
    const [ name, setName] = useState("");
    const [ error, setError] = useState("");
    const [ success, setSuccess] = useState("");
    const axios = require('axios'); 
    
    const [data, setData] = useState({
        celcius: 6,
        name: "London",
        humidity: 10,
        speed: 2,
        image: "/images/clouds.png"
    })
    
    const handleClick = () => {
        if(name !=="") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=ee0e778ca83eb30c57a667e81fb12a80&units=metric`;
            axios.get(apiUrl)
            .then(res => {
                let imagePath = '';
                if(res.data.weather[0].main == "Clouds") {
                    imagePath = "/images/clouds.png"
                } else if(res.data.weather[0].main == "Clear") {
                    imagePath = "/images/clear.png"
                } else if(res.data.weather[0].main == "Rain") {
                    imagePath = "/images/rain.png"
                } else if(res.data.weather[0].main == "Drizzle") {
                    imagePath = "/images/drizzle.png"
                } else if(res.data.weather[0].main == "Mist") {
                    imagePath = "/images/mist.png"
                } else {
                    imagePath = "/images/clouds.png"
                }
                console.log(res.data)
                setData({...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagePath})
                
                setSuccess('', toast.success("City added", {
                    position: toast.POSITION.BOTTOM_RIGHT
                }));
            })
            .catch(err => {
                if(err.response.status === 404) {
                    setError("", toast.error("Invalid City Name", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    }))
                }else {
                    setError('')
                }
                console.log(err);
            })
        }else if(!name){
            setError("", toast.error("Name cant be empty!", {
                position: toast.POSITION.BOTTOM_RIGHT
            }))
        }else{
            setError("", toast.error('Invalid City Name!', {
                position: toast.POSITION.BOTTOM_RIGHT
            }))
        }
    }
    // const notify = (e) =>{
    //     if(error == null) {
    //         setError("", toast.error('Invalid City Name!', {
    //             position: toast.POSITION.BOTTOM_RIGHT
    //         }))
    //     }else{
    //         setError('', toast.success('City added!', {
    //             position: toast.POSITION.BOTTOM_RIGHT
    //         }));
    //     }
    // }
    return (
        <div>
            <div className="header-weather">
                <div style={{backgroundColor: "rgb(86,86,235)"}}>
                    <Marquee className='text-light fs-5'>
                    Looking at the weather of Cities!!!
                    </Marquee>
                </div>
                <div>
                    <div className='d-flex justify-content-center'>
                        Write on Whatsapp: // 
                        <a className='text-success' href="http://wa.me/994555818800" aria-label='whatsapp'>
                            <FaWhatsappSquare style={{borderRadius: "50%", marginRight: "20px"}} className='fs-3'/>
                        </a>
                    </div>
                </div>            
                <div className="weather">
                    <div className="search">
                        <input type="text" id='' name='text' autoComplete='on' required placeholder='Enter City Name?' onChange={e => setName(e.target.value)}/>
                        <button onClick={handleClick}>
                            <ToastContainer />
                            <BsSearch className=' icon' />
                        </button>
                    </div>
                    <div className="error">
                        <p>{error}</p>
                    </div>
                    <div className="wininfo">
                        <img src={data.image} alt="clouds" className='icon-cloud'/>
                        <h1>{Math.round(data.celcius)}°c</h1>
                        <h2>{data.name}</h2>
                        <div className="details">
                            <div className="col">
                                <BsMoisture style={{fontSize: "40px"}}/>
                                {/* <img style={{color: "#fff"}} src="/images/humidity.jpg" alt="" /> */}
                                <div className='humidity'>
                                    <p>{Math.round(data.humidity)}%</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                            <div className="col">
                                <BsWind style={{fontSize: "45px"}}/>
                                {/* <img src="/images/wind.jpg" alt="" /> */}
                                <div className='wind'>
                                    <p>{Math.round(data.speed)}km/h</p>
                                    <p>Wind</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home