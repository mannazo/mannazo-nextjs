import About from './about/page'
import Why from './about/why/page'
import HowItWorks from './about/how-it-works/page'
import Safety from './about/safety/page'
// import { LoadScript } from '@react-google-maps/api'
import { Library } from '@googlemaps/js-api-loader'

export default function Home() {
  //
  // const libraries : Library[] = ["places"];
  return (
    <div>
      {/*<LoadScript*/}
      {/*  googleMapsApiKey="AIzaSyBHaPCHtCW4P7oYFQBSizE2rSc1Q7AMtsM"//api 키s*/}
      {/*  libraries={libraries}*/}
      {/*  />*/}
      <About />
      <Why />
      <HowItWorks />
      <Safety />
    </div>
  )
}

// const libraries = ["places"];
// <LoadScript
//   googleMapsApiKey=""//api 키
//   libraries={libraries}
// />