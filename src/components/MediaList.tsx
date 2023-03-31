import {MediaCard} from './MediaCard'
import video from '../assets/videoTest.mp4'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {Media} from '../interfaces'
import useSWR from 'swr'
import {getDataMediaTest} from '../api'

// export const basePath="http://localhost:801/"
export const basePath = 'http://localhost:3005/apiGestor/'

export const MediaList = () => {
	const { data: dataMedia, isLoading } = useSWR<Media[]>(basePath + 'sgc/media', getDataMediaTest, { revalidateOnMount: true})

	if (isLoading) { return <p>Carganding</p> }
	
  return (
		<>
			<div className='grid gap-2  place-items-center max-w-7xl grid-cols-1 md:grid-cols-2  w-5/6'>
				{dataMedia ? (
					dataMedia.map((media) => (
						<MediaCard key={media.idImagenVideo} media={media} />
					))
				) : (
					<p>No se encontro registros</p>
				)}
			</div>
			<h1></h1>
		</>
	)
}
