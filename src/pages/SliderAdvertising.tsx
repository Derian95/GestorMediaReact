import {useEffect, useState} from 'react'
import {Fade} from 'react-slideshow-image'
import ReactPlayer from 'react-player'

import 'react-slideshow-image/dist/styles.css'
import 'react-slideshow-image/dist/styles.css'

import video from '../assets/videoTest.mp4'

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
	const handleSlideChange = (oldIndex: number, newIndex: number) => {
		setCount(!isVideo(slides[newIndex].url))
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
	const ra = (): void => {
		setCount(true)
		console.log('se cambio')
	}

	useEffect(() => {
		if (isVideo(slides[0].url)) {
			setCount(false)
		}
	}, [])

	return (
		<div className='App'>
			<Fade
				autoplay={count}
				easing='ease'
				duration={100}
				indicators
				onChange={handleSlideChange}>
				{slides.map((url, index) => {
					if (isVideo(url.url)) {
						return (
							<div key={index} className='each-slide-effect'>
								<div className=' w-[100vw] h-[100vh]'>
									<ReactPlayer
										url={url.url}
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
									className='h-[100vh] w-[100vw]'
									style={{
										backgroundImage: `url(${url.url})`,
									}}>
									dd
								</div>
							</div>
						)
					}
				})}
			</Fade>
		</div>
	)
}
