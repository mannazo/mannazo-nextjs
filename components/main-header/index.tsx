import Logo from './Logo'
import AboutMenu from './About-Menu'
import SearchBar from './Search-Bar'
import HeaderProfile from './Header-Profile'
import MotionHeader from './Motion-Header'

export default function Header() {
  return (
    <MotionHeader>
      <nav className="container mx-auto px-4 py-2 flex items-center justify-between">
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
