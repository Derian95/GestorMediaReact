import { useEffect, useState} from 'react'
import {Fade, Zoom} from 'react-slideshow-image'
import ReactPlayer from 'react-player'

import 'react-slideshow-image/dist/styles.css'
import 'react-slideshow-image/dist/styles.css'

import { getDataMedia, mediaList } from '../api'
import { Media } from '../interfaces'
import { basePath } from '../components'
import useSWR from 'swr'
import {ForwardIcon, BackwardIcon, ArrowsPointingOutIcon, Cog6ToothIcon} from '@heroicons/react/24/outline'


export const SliderAdvertising = () => {
	
	const [sliderSleep, setSliderSleep] = useState(true)
	const [playingIndex, setPlayingIndex] = useState(0)
	const [showButton, setShowButton] = useState(true)
	const {data: dataMedia, isLoading} = useSWR<Media[]>( mediaList, getDataMedia, {revalidateOnMount: true} )

	const handleSlideChange = (oldIndex: number, newIndex: number) => {
		if(dataMedia)
		{
			setSliderSleep(!isVideo(dataMedia[newIndex].location))
		setPlayingIndex(newIndex)
		}
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
			if(isVideo(dataMedia[0].location)){
				setSliderSleep(false)
			}
		}
	}, [dataMedia])
	const indicators = (index:number) => (<div className="indicator  ">{index + 1}</div>);
	if (isLoading) { return <p>Carganding</p> }

	return (
		<div className='relative bg-semiBlack h-[100vh]' onMouseMove={handleMouseMove}>
          
			<Zoom
				autoplay={sliderSleep}
				easing='ease'
				duration={1000}
				indicators={indicators}
				onChange={handleSlideChange}
				prevArrow={
				<div style={{position:'absolute', bottom:0,right:'10% !important',backgroundColor:'red',width:'30px'}} className={`${showButton?'opacity-100':'opacity-0'} duration-500`}>
					<BackwardIcon color='white'/>
				</div>}
				nextArrow={<div style={{position:'absolute', bottom:0,right:0,backgroundColor:'blue',width:'30px'}} className={`${showButton?'opacity-100':'opacity-0'} duration-500`}>
					<ForwardIcon color='white'/>
				</div>}
				
				>
					{
				dataMedia ?
				(dataMedia.map((url, index) => {
					if (isVideo(url.location)) {
						return (
							<div key={index} className='each-slide-effect'>
								<div className=' w-[100vw] h-[100vh] '>
									<ReactPlayer
										url={basePath+url.location}
										playing={index === playingIndex}
										muted={true}
										onEnded={endVideo}
										width={'100%'}
										height={'100%'}
									/>
								</div>
							</div>
						)
					} else {
						return (
							<div key={index} className='each-slide-effect'>
								<div
									className='h-[100vh] w-[100vw] '
									style={{
										backgroundImage: `url(${basePath+url.location}) `,
										backgroundRepeat:"no-repeat",
										backgroundSize:"contain"
									}}>
								</div>
							</div>
						)
					}
				})):<p>No hay data causa</p>
			}
			</Zoom>
			<div className={` ${showButton?'opacity-100':'opacity-0'} cursor-pointer w-6 h-6 right-[80px] bottom-0 bg-error absolute z-50 duration-500`}>
				<ArrowsPointingOutIcon color='white'/>
			</div>
			<div className={`${showButton?'opacity-100':'opacity-0'} cursor-pointer w-6 h-6 right-[120px] bottom-0 bg-error absolute z-50 duration-500`}>
				<Cog6ToothIcon color='white'/>
			</div>
		</div>
			
	)
}


