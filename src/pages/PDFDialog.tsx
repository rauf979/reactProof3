import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PDFViewer } from '@react-pdf/renderer' // Cambia esto según tu librería
import ActaPDF from '../components/pdfComponents/pdfView' // Importa tanto el componente como el tipo
interface PDFDialogProps {
  formData: any
  firmaBase64Inspector: string
  firmaBase64Chofer: string
}

const PDFDialog: React.FC<PDFDialogProps> = ({ formData, firmaBase64Inspector, firmaBase64Chofer }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const goToNextPage = (): void => setCurrentPage((prev) => prev + 1)
  const goToPreviousPage = (): void => setCurrentPage((prev) => prev - 1)
  const goToNextPage2 = (): void => setCurrentPage(1)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Ver PDF</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Vista del Documento</DialogTitle>
          <DialogDescription>
            Navega por el documento PDF y haz clic en los botones para moverte entre las páginas.
          </DialogDescription>
        </DialogHeader>

        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {currentPage === 1 && (
            <Button onClick={goToNextPage} style={{ padding: '10px 20px', fontSize: '16px' }}>
              Ir a la Página 2
            </Button>
          )}
          {currentPage === 2 && (
            <Button onClick={goToPreviousPage} style={{ padding: '10px 20px', fontSize: '16px' }}>
              Ir a la Página 3
            </Button>
          )}
          {currentPage === 3 && (
            <Button onClick={goToNextPage2} style={{ padding: '10px 20px', fontSize: '16px' }}>
              Volver a la Página 1
            </Button>
          )}

          <PDFViewer width='100%' height='500px'>
            <ActaPDF
              formData={formData}
              firmaBase64Inspector={firmaBase64Inspector}
              firmaBase64Chofer={firmaBase64Chofer}
              currentPage={currentPage}
            />
          </PDFViewer>
        </div>

        <DialogFooter>
          <Button variant='outline'>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PDFDialog
