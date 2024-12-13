import { ReactNode, useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { IconFileCertificate } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

const Content = (): ReactNode => {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const storedUserId = localStorage.getItem('id_usuario')
    setUserId(storedUserId)
  }, [])

  return (
    <main className='grid items-start gap-4 p-4 sm:px-6 sm:py-0'>
      <div className='grid items-start gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>ERP 2 {userId ? <span className='text-sm text-muted'>({userId})</span> : <span className='text-sm text-muted'>(Guest)</span>}</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className='mb-4 text-2xl'>Digitalizaciones</h1>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              <Link to='/receipt' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                <div className='mx-auto'>
                  <IconFileCertificate size={64} stroke={2} />
                </div>
                <p>Act de descarga</p>
              </Link>
            </div>
            <Separator className='my-4' />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

const Dashboard = (): ReactNode => {
  return (
    <Layout>
      <Content />
    </Layout>
  )
}

export default Dashboard
