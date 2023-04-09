import imge from '../../public/icon-gestor.png'
export const Header = () => {
  return (

    <div className=' flex items-center justify-between bg-white fixed w-full border-b-[1px] border-gray shadow-md'>
			<div className='p-4  h-24 '>
                <img src={imge} alt="s" className='  h-full'/>
            </div>
    </div>
  )
}
