import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="p-4">
        <nav className="flex gap-2">
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/about'}>About</NavLink>
        </nav>
    </header>
  )
}