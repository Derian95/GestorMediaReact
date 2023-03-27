import {createBrowserRouter} from 'react-router-dom'

import {Sgc,SliderAdvertising} from '../pages'
export const route = createBrowserRouter([
	{
		path: '/',
		element: <SliderAdvertising />,
		
	},
	{
		path: '/sgc',
		element: <Sgc />,
	},
	
])