import { Outlet, useNavigate } from 'react-router-dom'
import useAuthStore from '@/stores/useAuthStore'
import { useEffect } from 'react'

const Home = (): JSX.Element => {
  const navigate = useNavigate()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  useEffect(() => {
    const logged = localStorage.getItem('isLoggedIn') === 'true'
    useAuthStore.setState({ isLoggedIn: logged })
  }, [])

  useEffect(() => {
    const a = true
    if (a) {
      const {
        pathname, search
      } = window.location

      navigate(`${pathname}${search}`)
    }
  }, [isLoggedIn])

  return (

    <Outlet />

  )
}

export default Home
