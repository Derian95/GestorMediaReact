import {useEffect, useState} from 'react'
import {Fade} from 'react-slideshow-image'
import ReactPlayer from 'react-player'

import 'react-slideshow-image/dist/styles.css'
import 'react-slideshow-image/dist/styles.css'

import video from '../assets/videoTest.mp4'
import { getDataMedia, getDataMediaTest } from '../api'
import { Media } from '../interfaces'
import { basePath } from '../components'
import useSWR from 'swr'

const slides = [
	{
		type: 'image',
		url: video,
		title: 'Título 1',
		description: 'Descripción 1',
	},
	{
		type: 'image',
		url: video,
		title: 'Título 1',
		description: 'Descripción 1',
	},
	{
		type: 'video',
		url: 'https://es.web.img3.acsta.net/newsv7/22/10/04/17/04/1095824.jpg',
		title: 'Título 2',
		description: 'Descripción 2',
	},
	{
		type: 'image',
		url: 'https://es.web.img3.acsta.net/newsv7/22/10/04/17/04/1095824.jpg',
		title: 'Título 3',
		description: 'Descripción 3',
	},
]
export const SliderAdvertising = () => {
	
	const [count, setCount] = useState(true)
	const [playingIndex, setPlayingIndex] = useState(0)
	//const [images, setImages] = useState<Media[]>([])


	const { data: dataMedia, isLoading } = useSWR<Media[]>(basePath + 'sgc/media', getDataMediaTest, { revalidateOnMount: true})

	const handleSlideChange = (oldIndex: number, newIndex: number) => {
		if(dataMedia)
		{
		setCount(!isVideo(dataMedia[newIndex].location))
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
	const ra = (): void => {
		setCount(true)
		console.log('se cambio')
	}

	if(dataMedia){
		if(isVideo(dataMedia[0].location)){
			setCount(false)
		}
	}
	
	if (isLoading) { return <p>Carganding</p> }

	return (
			<Fade
				autoplay={count}
				easing='ease'
				duration={1000}
				indicators
				onChange={handleSlideChange}>
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
										onEnded={ra}
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
			</Fade>
	)
}


