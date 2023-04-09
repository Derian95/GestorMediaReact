import { Outlet } from "react-router-dom"
import { SideBar } from "../components/SideBar"
import { Header } from "../components/Header"

export const LayoutSgc = () => {
	return (
		<>
			<header>
				<Header />
			</header>
			
			<main className="pt-32">
				<Outlet />
			</main>
		</>
	)
}
