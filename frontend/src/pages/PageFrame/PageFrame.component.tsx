import { Outlet } from 'react-router-dom'
import { Banner } from '../../components/Banner/Banner.component'
import Header from '../../components/Header/Header.component'
import Footer from '../../components/Footer/Footer.component'

const PageFrame = (): JSX.Element => {
  // const { data, isSuccess } = useEnvironment()
  return (
    <>
      <Banner /* data={data} isSuccess={isSuccess} */ />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default PageFrame
