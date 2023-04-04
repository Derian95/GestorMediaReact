import {MediaCard} from './MediaCard'
import {Media} from '../interfaces'
import useSWR from 'swr'
import {getDataMedia, mediaList} from '../api'
import { useState } from 'react'

// export const basePath="http://localhost:801/"
export const basePath = 'http://localhost:3005/apiGestor/'

export const MediaList = () => {
	const {data: dataMedia, isLoading} = useSWR<Media[]>( mediaList, getDataMedia, {revalidateOnMount: true} )
	const [searchValue, setSearchValue] = useState('');
	if (isLoading) {
		return <p>Carganding</p>
	}

	if (dataMedia?.length === 0) return <div>No se encontro registros</div>
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	  };
	
	  const filteredData = dataMedia?.filter(
		item => item.title.toLowerCase().includes(searchValue.toLowerCase())
	  );
	
	return (
		<>
		 <label>
          Buscar:
          <input type="text" value={searchValue} onChange={handleSearchChange} />
        </label>
			<div className='grid gap-7 place-items-center max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-5/6 mt-10 py-5'>
				{dataMedia ? (
					filteredData?.map((media) => (
						<MediaCard key={media.idImagenVideo} media={media} />
					))
				) : (
					<p className='text-black'>No se encontro registros</p>
				)}
			</div>
	</>
	)
}
