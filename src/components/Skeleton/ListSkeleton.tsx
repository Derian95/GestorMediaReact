import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
export const ListSkeleton = () => {
  return (
    <div className="w-4/6 h-screen">
        <Skeleton /> 
<Skeleton count={5} />
    </div>
  )
}
