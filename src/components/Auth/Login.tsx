import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '../ui/switch'
import video from '@/assets/media/Tarahumara.mp4'
import LogoTara from '@/assets/images/LOGO.jpg'
import Users from '@/stores/Users.json'
import useAuthStore from '@/stores/useAuthStore'
import { useNavigate } from 'react-router-dom'

const LoginForm = (): JSX.Element => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [userNameError, setUserNameError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)

  const [processing, setProcessing] = useState<boolean>(false)
  const [loginError, setLoginError] = useState<boolean>(false)

  const login = useAuthStore((state) => state.login)

  const navigate = useNavigate()

  const handleSubmit = (): void => {
    if (username.trim() === '') {
      setUserNameError(true)
    }

    if (password.trim() === '') {
      setPasswordError(true)
    }

    if (username.trim() !== '' && password.trim() !== '') {
      setProcessing(true)

      const found = Users.find((user) => user.username === username && user.password === password)

      if (found != null) {
        const rememberMe = localStorage.getItem('rememberMe') === 'true'

        if (rememberMe) {
          localStorage.setItem('user', found.username)
          localStorage.setItem('isLoggedIn', 'true')
        }

        login()
        navigate('/dashboard')
      } else {
        setProcessing(false)
        setLoginError(true)
      }
    }
  }

  return (
    <div className='w-full min-h-screen lg:grid lg:grid-cols-2'>
      <div className='flex items-center justify-center py-12'>
        <div className='grid w-10/12 gap-6 mx-auto md:w-1/2'>

          <picture>
            <source srcSet={LogoTara} media='(prefers-color-scheme: dark)' />
            <source srcSet={LogoTara} media='(prefers-color-scheme: light)' />
            <img src={LogoTara} alt='Logo de Tarahumara' className='w-auto mx-auto' />
          </picture>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Iniciar Sesión</h1>
            <p className='text-balance text-muted-foreground'>
              Ingresa tus credenciales a continuación para iniciar sesión
            </p>
          </div>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label className={userNameError ? 'text-destructive' : ''} htmlFor='username'>Usuario</Label>
              <Input
                id='username'
                type='text'
                placeholder='Código'
                onChange={(e) => {
                  setUsername(e.target.value)
                  setUserNameError(false)
                }}
                className={userNameError ? 'border-destructive' : ''}
                disabled={processing}
                required
              />
              {userNameError && <span className='text-destructive'>Es necesario que ingreses tu usuario</span>}
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label className={passwordError ? 'text-destructive' : ''} htmlFor='password'>Contraseña</Label>
              </div>
              <Input
                id='password'
                type='password'
                placeholder='********'
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordError(false)
                }}
                className={passwordError ? 'border-destructive' : ''}
                disabled={processing}
                required
              />
              {passwordError && <span className='text-destructive'>Es necesario que ingreses tu contraseña</span>}
            </div>

            <div className='flex items-center justify-start'>
              <Label htmlFor='remember-me' className='flex items-center'>
                Recordar mi sesión
              </Label>
              <Switch
                className='ml-2'
                id='remember-me'
                defaultChecked={localStorage.getItem('rememberMe') === 'true'}
                onCheckedChange={(checked) => {
                  localStorage.setItem('rememberMe', checked.toString())
                }}
                disabled={processing}
              />
            </div>

            {loginError && (
              <div className='p-4 text-center rounded bg-destructive/50 text-foreground'>
                La combinación de Usuario y Contraseña ingresa no corresponde a un usuario existente
              </div>)}

            <Button type='submit' onClick={handleSubmit} className='w-full' disabled={processing}>Ingresar</Button>
          </div>
        </div>
      </div>
      <div className='relative bg-gray-800 lg:block'>
        <video autoPlay muted loop className='w-full h-full'>
          <source src={video} type='video/mp4' />
        </video>
      </div>

    </div>
  )
}

export default LoginForm
