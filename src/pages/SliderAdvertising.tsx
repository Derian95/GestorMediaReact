import { useEffect, useState} from 'react'
import {Fade, Zoom} from 'react-slideshow-image'
import ReactPlayer from 'react-player'
import imge from '../../public/icon-gestor.png'

import 'react-slideshow-image/dist/styles.css'

import { getDataMedia, getDataMediaActive, mediaList, mediaListActive } from '../api'
import { Media } from '../interfaces'
import { basePath } from '../components'
import useSWR from 'swr'
import {ForwardIcon, BackwardIcon, ArrowsPointingOutIcon, Cog6ToothIcon} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { capitalize } from '../utils'


export const SliderAdvertising = () => {
	
	const [sliderSleep, setSliderSleep] = useState(true)
	const [loopVideo, setLoopVideo] = useState(false);
	const [timeSlider, setTimeSlider] = useState(5000);
	
	
	const [playingIndex, setPlayingIndex] = useState(0)
	const [showButton, setShowButton] = useState(true)
	const {data: dataMedia, isLoading, error} = useSWR<Media[]>( mediaListActive, getDataMediaActive, {revalidateOnMount: true} )

	const handleSlideChange = (oldIndex: number, newIndex: number) => {
		if(dataMedia)
		{
			setSliderSleep(!isVideo(dataMedia[newIndex].location))
		
	
	}
	setPlayingIndex(newIndex)
		
	}

	const isVideo = (url: string) => {
		return (
			url.endsWith('.mp4') ||
			url.endsWith('.avi') ||
			url.endsWith('.mov') ||
			url.includes('youtube.com')
		)
	}
	const endVideo = (): void => {
		setSliderSleep(true)
	}
	const handleMouseMove = () => {
		setShowButton(true);
	  };
	
	  useEffect(() => {
		const timeoutId = setTimeout(() => {
			setShowButton(false);
		  }, 5000);
	  
		  return () => {
			clearTimeout(timeoutId);
		  };
	}, [showButton])
	
	useEffect(() => {
		if(dataMedia){
			if(dataMedia.length!=0){
				if(isVideo(dataMedia[0].location)){
					setSliderSleep(false)
				}
				if(dataMedia.length==1){
					setLoopVideo(true)
				}
			}
			
		}

	}, [dataMedia])
	const indicators = (index:number) => (<div className="indicator  "></div>)

	const screenSize=() => {
			if (document.fullscreenElement) {
			  document.exitFullscreen();
			} else {
			  document.documentElement.requestFullscreen();
			}
	}

	useEffect(() => {
	const time = localStorage.getItem("tiempo")
		if(time){
		setTimeSlider(parseInt(time))
		}
	}, []);
	

	
	if (isLoading) { return <p>Carganding</p> }
	if (dataMedia?.length==0) { return <div className='flex justify-center items-center w-screen h-screen bg-white text-black flex-col'> <img src={imge} alt="a" className='w-2/6' /> <h2>No se encontro publicidad registrada</h2></div> }

	return (
		<div className='relative bg-semiBlack h-[100vh]' onMouseMove={handleMouseMove}>
          
			<Zoom
				autoplay={sliderSleep}
				easing='ease'
				duration={timeSlider}
				indicators
				onChange={handleSlideChange}
				prevArrow={
				<div style={{position:'absolute', bottom:0,right:'50px',left:'auto',backgroundColor:'#bd2e2e',width:'40px',borderRadius:'5px'}} className={`${showButton?'opacity-100':'opacity-0'} duration-500`}>
					<BackwardIcon color='white'/>
				</div>}
				nextArrow={<div style={{position:'absolute', bottom:0,right:0,backgroundColor:'#bd2e2e',width:'40px',borderRadius:'5px'}} className={`${showButton?'opacity-100':'opacity-0'} duration-500`}>
					<ForwardIcon color='white'/>
				</div>}
				
				>
					{
				dataMedia ?
				(dataMedia.map((url, index) => {
					if (isVideo(url.location)) {
						return (
							<div key={index} className='each-slide-effect'>
								<div className={`${index ===playingIndex?'slide-text ':'opacity-0'}  absolute p-2 tblur`}>
								<h1 className='text-[50px] text-white'> {capitalize(url.title)}</h1>
									<p className='text-[24px] tex-white'>{capitalize(url.description)}</p>
								</div>
								<div className=' w-[100vw] h-[100vh] '>
									<ReactPlayer
										url={basePath+url.location}
										playing={index === playingIndex}
										muted={true}
										onEnded={endVideo}
										width={'100%'}
										height={'100%'}
										loop={loopVideo}
									/>
								</div>
							</div>
						)
					} else {
						return (
							<div key={index} className='each-slide-effect each-slide'>
								<div className={`${index ===playingIndex?'slide-text ':'opacity-0'}  absolute p-2 tblur`}>
									<h1 className='text-[50px] text-white'>{capitalize(url.title)}</h1>
									<p className='text-[24px] tex-white'>{capitalize(url.description)}</p>
								</div>
								<div
									className='h-[100vh] w-[100vw] '
									style={{
										backgroundImage: `url(${basePath+url.location}) `,
										backgroundRepeat:"no-repeat",
										backgroundSize:"contain",
										backgroundPosition:'center'
										
									}}>
								</div>
								

							</div>
						)
					}
				})):<div className='w-screen h-screen bg-black text-white'><h2>Cargando</h2></div>
			}
			</Zoom>
			<div className={` ${showButton?'opacity-100':'opacity-0'} rounded-[5px] cursor-pointer w-10 h-10 right-[100px] bottom-0 bg-[#bd2e2e] absolute z-50 duration-500`}>
				<ArrowsPointingOutIcon color='white' onClick={screenSize}/>
			</div>
			<Link to="/gestor/sgc" target="_blank" className={`${showButton?'opacity-100':'opacity-0'} rounded-[5px] cursor-pointer w-10 h-10 right-[150px] bottom-0 bg-[#bd2e2e] absolute z-50 duration-500`}>
				<Cog6ToothIcon color='white' />
			</Link>
		</div>
			
	)
}


