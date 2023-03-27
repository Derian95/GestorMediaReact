import {useEffect, useRef, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'react-slideshow-image/dist/styles.css'
import {Slide, Fade} from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import ReactPlayer from 'react-player'

import video from './assets/videoTest.mp4'
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

function App() {
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
	

	const vid: any = useRef(video)

	return (
		<div className='App'>
			<button onClick={ra}>raa</button>
			<Slide
				autoplay={count}
				easing='ease'
				duration={100}
				indicators
				onChange={handleSlideChange}>
				{slides.map((url, index) => {
					if (isVideo(url.url)) {
						return (
							<div key={index} className='each-slide-effect'>
								<div>
									<span>Slide 1</span>
									{/* <video ref={vid} controls src={url.url}  muted onEnded={ra}></video> */}
									<ReactPlayer
										url={url.url}
										playing={index === playingIndex}
										muted={true}
										onEnded={ra} // Aquí podrías poner la lógica para reanudar el autoplay
									/>
								</div>
							</div>
						)
					} else {
						return (
							<div key={index} className='each-slide-effect'>
								<div
									style={{
										backgroundImage: `url(${url.url})`,
									}}></div>
							</div>
						)
					}
				})}
				{/* <div  className='each-slide-effect' >
							<div
								style={{
									backgroundImage:'url(https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)',

								}}></div>
						</div> */}
			</Slide>
		</div>
	)
}

export default App
