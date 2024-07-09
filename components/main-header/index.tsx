import Logo from './logo'
import AboutMenu from './about-menu'
import SearchBar from './search-bar'
import HeaderProfile from './header-profile'
import MotionHeader from './motion-header'

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
