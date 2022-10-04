import axios from 'axios';
import { useState, useEffect } from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import { GetBaseURL, GetHeaderNoAuth } from '../helpers'

const initialState = {
    city: '',
    region: '',
    country: '',
    tz_id: '',
    time: '',
    temp: '',
    avg_temp: '',
    max_temp: '',
    min_temp: '',
    wind: '',
    max_wind: '',
    humidity: '',
    avg_humidity: '',
    condition: '',
    predict: '',
}

const LandingPage = () => {
    const [ state, setState ] = useState(initialState)
    const [ city, setCity ] = useState('')
    const [ isFirst, setIsFirst ] = useState(true)
    const [ isError, setIsError ] = useState(false)

    useEffect(() => {
    }, [])

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setCity(value)
    }

    const RainPredict = async (city) => {
        axios.get(`${GetBaseURL()}/weather/data/${city}`, {
            headers: GetHeaderNoAuth()
        })
        .then( response => {
            if (response.data.status === 200) {
                setState({
                    city: response.data.data.location.name,
                    region: response.data.data.location.region,
                    country: response.data.data.location.country,
                    tz_id: response.data.data.location.tz_id,
                    time: response.data.data.location.localtime,
                    temp: response.data.data.current.temp_c,
                    avg_temp: response.data.data.forecast.forecastday[0].day.avgtemp_c,
                    max_temp: response.data.data.forecast.forecastday[0].day.maxtemp_c,
                    min_temp: response.data.data.forecast.forecastday[0].day.mintemp_c,
                    wind: response.data.data.current.wind_kph, 
                    max_wind: response.data.data.forecast.forecastday[0].day.maxwind_kph,
                    humidity: response.data.data.current.humidity,
                    avg_humidity: response.data.data.forecast.forecastday[0].day.avghumidity,
                    condition: response.data.data.forecast.forecastday[0].day.condition.text,
                    predict: response.data.predict
                })
                setIsError(false)
            }
        })
        .catch(error => {
            setIsError(true)
        })
    }

    return (
        <>
            <div className="h-screen w-full bg-blue-300">
                <div className="mx-auto p-4 flex justify-center">
                    <div className="flex flex-wrap">
                        <div className="w-full px-2">
                            <div className="bg-gray-900 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full dark:bg-gray-600">
                                <div className="px-6 py-6 relative">
                                    <div className="flex mb-4 justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-4xl mb-0">Selamat Datang di Aplikasi Prediksi Hujan</h3>
                                        </div>
                                    </div>
                                    <div className="block sm:flex justify-between items-center flex-wrap">
                                        <div className="w-full">
                                            <div className="flex mb-2 justify-between items-center"><span>Masukan Nama Kota yang ingin di prediksi</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 relative">
                                    <div className="text-center flex">
                                        <div className="relative mx-auto"> 
                                            <div className="absolute top-3 left-1 w-8 h-8">
                                                <SearchIcon fill='#4b5563' />
                                            </div>
                                            <input type="text" onChange={handleInputChange} className="h-14 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none text-black" placeholder="Masukan Nama Kota..."/>
                                            <div className="absolute top-2 right-2">
                                                <button onClick={() => {RainPredict(city); setIsFirst(false)}} className="h-10 w-20 text-white rounded-lg bg-blue-500 hover:bg-blue-600">Cari</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-wrap">
                        <div className="w-full px-2">
                            <div className="bg-gray-900 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 dark:bg-gray-600">
                                {!isFirst ? (
                                    !isError ? (
                                        <>
                                            <div className="px-6 py-6 relative">
                                                <div className="flex mb-4 justify-between items-center">
                                                    <div>
                                                        <h5 className="mb-0 font-medium text-xl mr-24">{state.city}, {state.region}, {state.country}</h5>
                                                        <h6 className="mb-0">{state.time}</h6><small>{state.tz_id}</small>
                                                    </div>
                                                    <div className="text-right">
                                                        <h3 className="font-bold text-4xl mb-0"><span>{state.temp}&deg;</span></h3>
                                                    </div>
                                                </div>
                                                <div className="flex w-full items-center flex-wrap">
                                                    <div className="flex w-6/12">
                                                        <div className="flex mb-2 items-center"><span>Temp</span><small className="px-2 inline-block">{state.temp}&nbsp;&deg;C</small></div>
                                                    </div>
                                                    <div className="flex w-6/12">
                                                        <div className="flex mb-2 items-center"><span>Avg Temp</span><small className="px-2 inline-block">{state.avg_temp}&nbsp;&deg;C</small></div>
                                                    </div>
                                                </div>
                                                <div className="flex w-full items-center flex-wrap">
                                                    <div className="flex w-6/12">
                                                        <div className="flex mb-2 items-center"><span>Max Temp</span><small className="px-2 inline-block">{state.max_temp}&nbsp;&deg;C</small></div>
                                                    </div>
                                                    <div className="flex w-6/12">
                                                        <div className="flex mb-2 items-center"><span>Min Temp</span><small className="px-2 inline-block">{state.min_temp}&nbsp;&deg;C</small></div>
                                                    </div>
                                                </div>
                                                <div className="flex w-full items-center flex-wrap">
                                                    <div className="flex w-6/12">
                                                        <div className="flex mb-2 items-center"><span>Wind</span><small className="px-2 inline-block">{state.wind} kph</small></div>
                                                    </div>
                                                    <div className="flex w-6/12">
                                                        <div className="flex mb-2 items-center"><span>Max Wind</span><small className="px-2 inline-block">{state.max_wind} kph</small></div>
                                                    </div>
                                                </div>
                                                <div className="flex w-full items-center flex-wrap">
                                                    <div className="flex w-6/12">
                                                        <div className="flex mb-2 items-center"><span>Humidity</span><small className="px-2 inline-block">{state.humidity} RH</small></div>
                                                    </div>
                                                    <div className="flex w-6/12">
                                                        <div className="flex mb-2 items-center"><span>Avg Humidity</span><small className="px-2 inline-block">{state.avg_humidity} RH</small></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-6 py-4 relative">
                                                <div className="text-center justify-between items-center flex">
                                                    <small>Condition</small><h6 className="mb-0">{state.condition}</h6>
                                                </div>
                                            </div>
                                            <div className="px-6 py-4 relative">
                                                <div className="flex justify-center">
                                                    <h3 className="font-bold text-4xl mb-0">{state.predict}</h3>
                                                </div>
                                            </div>
                                        </>
                                    ) : <h3 className="font-bold text-4xl mb-0 p-8">Nama Kota Tidak Valid</h3>
                                ) : <h3 className="font-bold text-4xl mb-0 p-8">Masukan Nama Kota</h3>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage