import Logo from './Logo'
import AboutMenu from './About-Menu'
import SearchBar from './Search-Bar'
import HeaderProfile from './Header-Profile'
import MotionHeader from './Motion-Header'

export default function Header() {
  return (
    <MotionHeader>
      <nav className="container mx-auto flex w-full w-screen max-w-full items-center justify-between px-4 py-2">
        <Logo />
        <div className="flex items-center space-x-4">
          <AboutMenu />
          <SearchBar />
          <HeaderProfile />
        </div>
      </nav>
    </MotionHeader>
  )
}
