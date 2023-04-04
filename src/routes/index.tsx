import {createBrowserRouter} from 'react-router-dom'

import {Advertising,SliderAdvertising} from '../pages'
import { LayoutSgc } from '../layouts/LayoutSgc'
export const route = createBrowserRouter([
	{
		path: '/',
		element: <SliderAdvertising />,
		
	},
	{
		path: '/sgc',
		element: <LayoutSgc />,
		children:[
			{
				path: '/sgc',
				element: <Advertising />,
			},
		]
	},
	
])