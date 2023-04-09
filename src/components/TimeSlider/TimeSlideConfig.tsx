import { useEffect, useState } from "react";
import { PencilSquareIcon, InboxArrowDownIcon } from '@heroicons/react/24/solid'

export const TimeSlideConfig = () => {
  const [changeTime, setChangeTime] = useState(true);
  const [time, setTime] = useState(0);
  
    useEffect(() => {
    }, []);
    
    const changeNewTime=() => {
    setChangeTime(false)

    }
    const saveTime=() => {
        const newTime = time * 1000
        localStorage.setItem("tiempo",newTime.toString())

      setChangeTime(true)
    }
    const changeText=(timeNew:number) => {
      if(isNaN(timeNew)){
      setTime(0)

      }else{
        setTime(timeNew)

      }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!/[0-9]/.test(event.key)  ) {
        event.preventDefault();
      }
    }

    useEffect(() => {
      const time = localStorage.getItem("tiempo")
		if(time){
      const secondValue = parseInt(time) /1000
		changeText(secondValue)
		}
    }, []);
    
    return (
    <div className="flex flex-col sm:flex-row items-center justify-center">
        <div >
            <input  onKeyPress={handleKeyPress} 	className={`${changeTime ? 'bg-gray':'bg-white'}  p-2 rounded-lg border-[1px] border-[#8c8b8b] w-16 sm:mb-0 mb-2`} type="tel" maxLength={2} name="" id="" disabled={changeTime} onChange={(e)=>changeText(parseInt(e.target.value) )
            } value={time}/>
        </div>
        {
            changeTime?
        <button className="flex items-center ml-4 bg-success text-white p-2 rounded" onClick={changeNewTime}>Cambiar <PencilSquareIcon className="h-5 w-5 text-blue-500 ml-2" /></button>
            :
        <button className="flex items-center ml-4 bg-base cursor-pointer p-2 rounded text-white hover:bg-baseH" onClick={saveTime}>Guardar <InboxArrowDownIcon className="h-5 w-5 text-blue-500 ml-2" /></button>

        }
    </div>
  )
};
