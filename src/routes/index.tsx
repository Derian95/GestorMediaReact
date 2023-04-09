import {createBrowserRouter} from 'react-router-dom'

import {Advertising,SliderAdvertising} from '../pages'
import { LayoutSgc } from '../layouts/LayoutSgc'
export const route = createBrowserRouter([
	{
		path: '/gestor',
		element: <SliderAdvertising />,
		
	},
	{
		path: '/gestor/sgc',
		element: <LayoutSgc />,
		children:[
			{
				path: '/gestor/sgc',
				element: <Advertising />,
			},
		]
	},
	
])