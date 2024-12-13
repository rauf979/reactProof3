import { useState, useRef, useEffect } from 'react'
import { PDFDownloadLink, PDFViewer, Font } from '@react-pdf/renderer'
import * as pdfjsLib from 'pdfjs-dist'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Layout from '../components/Layout'
import SignatureCanvas from 'react-signature-canvas'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import GothamNarrowMedium from '/fonts/GothamNarrow-Medium.otf'
import { fetchActas, insert } from '@/connections/querys'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { formInitial } from '../components/pdfComponents/format'

import ActaPDF from '../components/pdfComponents/pdfView'
import DownloadPDF from '@/components/pdfComponents/PdfDownload'

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@2.11.338/es5/build/pdf.worker.min.js'

Font.register({
  family: 'GothamNarrow',
  src: GothamNarrowMedium
})

const ActaDeLlegada = (): JSX.Element => {
  interface FormData {
    id: number | null
    fecha: string
    inicioVerificacion: string
    terminoVerificacion: string
    oc: string
    proveedor: string
    origen: string
    factura: string
    especie: string
    variedades: string
    frioDescarga: string
    cajasRecibidas: string
    lineaTransportista: string
    numeroContenedor: string
    placasCamion: string
    placasCaja: string
    chofer: string
    tempSetPoint: string
    observacionesSetPoint: string
    tempPantalla: string
    observacionesPantalla: string
    termografo: string
    tempOrigen: string
    tempDestino: string
    limpio: string
    cajaCerrada: string
    lona: string
    fauna: string
    carga: string
    seguridadCarga: string
    sellado: string
    numeroSerie: string
    resultadosInv: string
    tempAPuerta: string
    tempAMedio: string
    tempAFondo: string
    tempMPuerta: string
    tempMMedio: string
    tempMFondo: string
    tempBPuerta: string
    tempBMedio: string
    tempBFondo: string
    tempMax: string
    tempMin: string
    tempIdeal: string
    nombreInspector: string
    nombreChofer: string
    optionLimpio: string
    optionCaja: string
    optionLona: string
    optionLibre: string
    optionCarga: string
    optionSeguridad: string
    optionSellado: string
    tarimasDanadas: string
    cajasIdentificadas: string
    danadasManiobra: string
    imageLimpio: string[]
    imageCajaCerrada: string[]
    imageLonaBuenEstado: string[]
    imageLibreFauna: string[]
    imageCargaBuenEstado: string[]
    imageSeguridadCarga: string[]
    imageSellado: string[]
    [key: string]: any
  }

  const [formData, setFormData] = useState<FormData>(formInitial)
  const [currentPage, setCurrentPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<number | null>(null)
  const [actasList, setActasList] = useState<Acta[]>([])

  const [firmaBase64Inspector, setFirmaBase64Inspector] = useState<string | undefined>('')
  const [firmaBase64Chofer, setFirmaBase64Chofer] = useState<string | undefined>('')

  const signaturePadInspector = useRef<any>(null) // Refs para el signature pad
  const signaturePadChofer = useRef<any>(null)
  const goToNextPage = (): void => {
    setCurrentPage(2)
  }

  const goToNextPage2 = (): void => {
    setCurrentPage(1)
  }

  const goToPreviousPage = (): void => {
    setCurrentPage(3)
  }

  const handleInsert = async (): Promise<void> => {
    await insert(formData) // Llama a la función insert y pasa formData
  }

  interface Acta {
    id: number
    fecha: string
    start_verification: string
    end_verification: string
    oc: string
    provider: string
    origin: string
    bill: string
    varieties: string
    cold_disc: string
    boxes_received: string
    carrier_line: string
    num_cont: string
    truck_plt: string
    box_plt: string
    driver: string
    setpoint_temp: string
    setpoint_obs: string
    screen_temp: string
    screen_obs: string
    therm_org: string
    therm_dst: string
    clean_free: string
    close: string
    tarp_state: string
    pest_free: string
    load_state: string
    load_sec: string
    seal: string
    box_id: string
    invest_res: string
    tempa_door: string
    tempa_mid: string
    tempa_back: string
    tempm_door: string
    tempm_mid: string
    tempm_back: string
    tempb_door: string
    tempb_mid: string
    tempb_back: string
    temp_max: string
    temp_min: string
    temp_ideal: string
    insp_name: string
    clean_obs: string
    close_obs: string
    tarp_obs: string
    pest_obs: string
    load_obs: string
    sec_obs: string
    seal_obs: string
    pallet_dmg: string
    box_num: string
    dmg_num: string

  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { name: string, value: string } }
  ): void => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const { name, value } = e.currentTarget // Usa `currentTarget` para acceder al botón
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSelect = (idActa: number): void => {
    setValue(idActa)
    setOpen(false)

    // Buscar detalles del acta seleccionada
    const selectedActa = actasList.find((acta) => acta.id === idActa)

    if (selectedActa != null) {
      // Actualizar formData con los datos del acta seleccionada
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: selectedActa.id,
        fecha: selectedActa.fecha ?? '',
        inicioVerificacion: selectedActa.start_verification ?? '',
        terminoVerificacion: selectedActa.end_verification ?? '',
        oc: selectedActa.oc ?? '',
        proveedor: selectedActa.provider ?? '',
        origen: selectedActa.origin ?? '',
        factura: selectedActa.bill ?? '',
        especie: '',
        variedades: selectedActa.varieties ?? '',
        frioDescarga: selectedActa.cold_disc ?? '',
        cajasRecibidas: selectedActa.boxes_received ?? '',
        lineaTransportista: selectedActa.carrier_line ?? '',
        numeroContenedor: selectedActa.num_cont ?? '',
        placasCamion: selectedActa.truck_plt ?? '',
        placasCaja: selectedActa.box_plt ?? '',
        chofer: selectedActa.driver ?? '',
        tempSetPoint: selectedActa.setpoint_temp ?? '',
        observacionesSetPoint: selectedActa.setpoint_obs ?? '',
        tempPantalla: selectedActa.screen_temp ?? '',
        observacionesPantalla: selectedActa.screen_obs ?? '',
        termografo: selectedActa.therm_org ?? '',
        tempOrigen: selectedActa.therm_org ?? '',
        tempDestino: selectedActa.therm_dst ?? '',
        limpio: selectedActa.clean_free ?? '',
        cajaCerrada: selectedActa.close ?? '',
        lona: selectedActa.tarp_state ?? '',
        fauna: selectedActa.pest_free ?? '',
        carga: selectedActa.load_state ?? '',
        seguridadCarga: selectedActa.load_sec ?? '',
        sellado: selectedActa.seal ?? '',
        numeroSerie: selectedActa.box_id ?? '',
        resultadosInv: selectedActa.invest_res ?? '',
        tempAPuerta: selectedActa.tempa_door ?? '',
        tempAMedio: selectedActa.tempa_mid ?? '',
        tempAFondo: selectedActa.tempa_back ?? '',
        tempMPuerta: selectedActa.tempm_door ?? '',
        tempMMedio: selectedActa.tempm_mid ?? '',
        tempMFondo: selectedActa.tempm_back ?? '',
        tempBPuerta: selectedActa.tempb_door ?? '',
        tempBMedio: selectedActa.tempb_mid ?? '',
        tempBFondo: selectedActa.tempb_back ?? '',
        tempMax: selectedActa.temp_max ?? '',
        tempMin: selectedActa.temp_min ?? '',
        tempIdeal: selectedActa.temp_ideal ?? '',
        nombreInspector: selectedActa.insp_name ?? '',
        nombreChofer: selectedActa.driver ?? '',
        optionLimpio: selectedActa.clean_obs ?? '',
        optionCaja: selectedActa.close_obs ?? '',
        optionLona: selectedActa.tarp_obs ?? '',
        optionLibre: selectedActa.pest_obs ?? '',
        optionCarga: selectedActa.load_obs ?? '',
        optionSeguridad: selectedActa.sec_obs ?? '',
        optionSellado: selectedActa.seal_obs ?? '',
        tarimasDanadas: selectedActa.pallet_dmg ?? '',
        cajasIdentificadas: selectedActa.box_num ?? '',
        danadasManiobra: selectedActa.dmg_num ?? ''
      }))
    }
  }

  const handleFileChange3 = (event: React.ChangeEvent<HTMLInputElement>, key: string): void => {
    const files = event.target.files
    // Verificar que existan archivos antes de procesarlos
    if (files == null) return
    const fileArray = Array.from(files).map((file) => URL.createObjectURL(file))
    console.log(key)
    setFormData((prevData) => ({
      ...prevData,
      [key]: Array.isArray(prevData[key])
        ? [...prevData[key], ...fileArray]
        : fileArray
    }))
    console.log(
      'La longitud de imageCajaCerrada es:',
      Array.isArray(formData.imageCajaCerrada) ? formData.imageCajaCerrada.length + 1 : 1
    )
  }

  useEffect(() => {
    const getActasData = async (): Promise<void> => {
      const data = await fetchActas()
      if (data != null) {
        setActasList(data.map((acta: any) => ({
          ...acta,
          clean_obs: acta.clean_obs ?? '',
          close_obs: acta.close_obs ?? '',
          tarp_obs: acta.tarp_obs ?? '',
          pest_obs: acta.pest_obs ?? '',
          load_obs: acta.load_obs ?? '',
          sec_obs: acta.sec_obs ?? '',
          seal_obs: acta.seal_obs ?? ''
        })))
      }
    }

    void getActasData()
    const allTemperatures = [
      formData.tempAPuerta,
      formData.tempAMedio,
      formData.tempAFondo,
      formData.tempMPuerta,
      formData.tempMMedio,
      formData.tempMFondo,
      formData.tempBPuerta,
      formData.tempBMedio,
      formData.tempBFondo
    ]
      .map((temp) => {
        const num = Number(temp)
        return isNaN(num) ? null : num
      })
      .filter((temp) => temp !== null) /// Aseguramos que sean números válidos
    // Si no hay temperaturas válidas, no hacer nada
    if (allTemperatures.length === 0) return

    const maxTemp = Math.max(...allTemperatures)
    const minTemp = Math.min(...allTemperatures)

    // Actualizar el estado con los valores de tempMax y tempMin
    setFormData((prevData) => ({
      ...prevData,
      tempMax: maxTemp.toString(),
      tempMin: minTemp.toString()
    }))

    // Actualizar el rango
    // setTemperatureRange({ max: maxTemp, min: minTemp })
  }, [
    formData.tempAPuerta,
    formData.tempAMedio,
    formData.tempAFondo,
    formData.tempMPuerta,
    formData.tempMMedio,
    formData.tempMFondo,
    formData.tempBPuerta,
    formData.tempBMedio,
    formData.tempBFondo
  ])

  // Función para limpiar ambas firmas
  const clearSignature = (): void => {
    if (signaturePadInspector.current !== null) {
      signaturePadInspector.current.clear()
    }
    setFirmaBase64Inspector(undefined) // Estado para la firma del inspector

    if (signaturePadChofer.current !== null) {
      signaturePadChofer.current.clear()
    }
    setFirmaBase64Chofer(undefined) // Estado para la firma del chofer
  }

  // Función para guardar ambas firmas
  const saveSignature = (): void => {
    if (signaturePadInspector.current !== null) {
      const dataUrlInspector = signaturePadInspector.current.toDataURL()
      setFirmaBase64Inspector(dataUrlInspector) // Guarda la firma del inspector
    }

    if (signaturePadChofer.current !== null) {
      const dataUrlChofer = signaturePadChofer.current.toDataURL()
      setFirmaBase64Chofer(dataUrlChofer) // Guarda la firma del chofer
    }
  }

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h1>Acta de Llegada</h1>
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className='w-[200px] justify-between'
              >
                {value !== null
                  ? actasList.find((acta) => acta.id === value)?.oc
                  : 'Select Acta...'}
                <ChevronsUpDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Search Acta...' />
                <CommandList>
                  <CommandEmpty>No Acta found.</CommandEmpty>
                  <CommandGroup>
                    {actasList.map((acta) => (
                      <CommandItem
                        key={acta.id}
                        value={acta.id.toString()}
                        onSelect={() => handleSelect(acta.id)}
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${value === acta.id ? 'opacity-100' : 'opacity-0'}`}
                        />
                        {acta.oc}{' '}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        {/* Formulario con campos de entrada */}
        <h2 />

        <Accordion type='single' collapsible style={{ padding: '8px 0' }}>
          <AccordionItem value='item-1'>
            <AccordionTrigger
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '2px solid #7A2A1E',
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              Datos Pedido
            </AccordionTrigger>
            <AccordionContent style={{ padding: '8px' }}>
              <Card style={{ padding: '8px' }}>
                <CardContent>
                  {[
                    { label: 'Fecha:', type: 'date', name: 'fecha' },
                    { label: 'Inicio de verificación:', type: 'text', name: 'inicioVerificacion' },
                    { label: 'Término de verificación:', type: 'text', name: 'terminoVerificacion' },
                    { label: 'O.C.:', type: 'text', name: 'oc' },
                    { label: 'Proveedor:', type: 'text', name: 'proveedor' },
                    { label: 'Origen:', type: 'text', name: 'origen' },
                    { label: 'Factura:', type: 'text', name: 'factura' },
                    { label: 'Especie:', type: 'text', name: 'especie' },
                    { label: 'Variedades:', type: 'text', name: 'variedades' },
                    { label: 'Frío de descarga:', type: 'text', name: 'frioDescarga' },
                    { label: 'Cajas recibidas:', type: 'text', name: 'cajasRecibidas' }
                  ].map(({ label, type, name }) => (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <label style={{ flex: '0 0 200px', fontWeight: 'bold' }}>{label}</label>
                      <Input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type='single' collapsible style={{ padding: '8px 0' }}>
          <AccordionItem value='item-2'>
            <AccordionTrigger
              style={{
                fontSize: '20px', // Tamaño de fuente grande
                fontWeight: 'bold', // Negrita para mayor visibilidad
                padding: '12px 16px', // Más espacio alrededor del texto
                borderRadius: '8px', // Bordes redondeados para un diseño moderno
                border: '2px solid #7A2A1E', // Borde para resaltar el elemento
                textAlign: 'center', // Centrar el texto
                cursor: 'pointer' // Cambia el cursor para que parezca un botón
              }}
            >
              Transporte
            </AccordionTrigger>
            <AccordionContent>
              {[
                { label: 'Línea transportista:', name: 'lineaTransportista' },
                { label: 'Número de contenedor:', name: 'numeroContenedor' },
                { label: 'Placas camión:', name: 'placasCamion' },
                { label: 'Placas caja:', name: 'placasCaja' },
                { label: 'Chofer:', name: 'chofer' }
              ].map(({ label, name }) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <label style={{ flex: '0 0 200px', fontWeight: 'bold' }}>{label}</label>
                  <Input
                    type='text'
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type='single' collapsible style={{ padding: '8px 0' }}>
          <AccordionItem value='item-2'>
            <AccordionTrigger
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '2px solid #7A2A1E',
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              Condiciones de transporte
            </AccordionTrigger>
            <AccordionContent>
              {[
                { label: 'Temperatura de set point:', name: 'tempSetPoint' },
                { label: 'Observaciones set point:', name: 'observacionesSetPoint' },
                { label: 'Temperatura de pantalla:', name: 'tempPantalla' },
                { label: 'Observaciones pantalla:', name: 'observacionesPantalla' },
                { label: 'Temperatura de origen:', name: 'tempOrigen' },
                { label: 'Temperatura de destino:', name: 'tempDestino' }
              ].map(({ label, name }) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <label style={{ flex: '0 0 250px', fontWeight: 'bold' }}>{label}</label>
                  <Input
                    type='text'
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ flex: '0 0 250px', fontWeight: 'bold' }}>Termógrafo:</label>
                <Input
                  type='text'
                  name='termógrafo'
                  value={formData.termografo}
                  onChange={handleInputChange}
                  style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>
              {[
                { label: 'Cumple termógrafo:', name: 'option' },
                { label: 'Cumple termógrafo2:', name: 'option2' }
              ].map(({ label, name }) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <label style={{ flex: '0 0 250px', fontWeight: 'bold' }}>{label}</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                      style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#9A3324', cursor: 'pointer' }}
                      name={name}
                      value='Si'
                      onClick={handleButtonClick}
                    >
                      Sí
                    </Button>
                    <Button
                      style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#ccc', color: '#000', cursor: 'pointer' }}
                      name={name}
                      value='No'
                      onClick={handleButtonClick}
                    >
                      No
                    </Button>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type='single' collapsible style={{ padding: '8px 0' }}>
          <AccordionItem value='item-2'>
            <AccordionTrigger
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '2px solid #7A2A1E',
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              Inspección de transporte
            </AccordionTrigger>
            <AccordionContent>
              <div style={{ marginBottom: 30 }}>
                <label>Limpio </label>
                <div style={{ marginBottom: 20 }}>
                  <Button
                    style={{ flex: 5, marginRight: '10px' }}
                    name='optionLimpio'
                    value='Si'
                    onClick={handleButtonClick}
                  >
                    {' '}
                    Sí{' '}
                  </Button>
                  <Button
                    name='optionLimpio'
                    value='No'
                    onClick={handleButtonClick}
                  >
                    {' '}
                    No{' '}
                  </Button>
                  {formData.optionLimpio === 'No' && (
                    <div>
                      <div style={{ marginBottom: 30 }}>
                        <Button>
                          <label
                            htmlFor='file-input-limpio'
                            style={{ cursor: 'pointer' }}
                          >
                            Seleccionar Imagen
                          </label>
                        </Button>
                        {formData.imageLimpio.length < 8
                          ? (
                            <input
                              type='file'
                              id='file-input-limpio'
                              accept='image/*'
                              multiple
                              style={{ display: 'none' }}
                              onChange={(e) =>
                                handleFileChange3(e, 'imageLimpio')}
                            />
                            )
                          : <p style={{ color: 'red', marginTop: '10px' }}> No puedes agregar más de 8 imágenes </p>}
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                          {formData.imageLimpio.map((imageUrl: string, index: number) => (
                            <img
                              key={index}
                              src={imageUrl}
                              alt='imageLimpio'
                              style={{
                                width: '200px',
                                height: '200px',
                                margin: '10px',
                                objectFit: 'cover'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <label style={{ marginBottom: 30 }}>
                Pon una descripción{' '}
              </label>
              <Input
                type='text'
                name='limpio'
                value={formData.limpio}
                onChange={handleInputChange}
              />
              <div style={{ marginBottom: 30 }}>
                <label>Caja cerrada, en buen estado </label>
                <div style={{ marginBottom: 20 }}>
                  <Button
                    style={{ flex: 5, marginRight: '10px' }}
                    name='optionCaja'
                    value='Si'
                    onClick={handleButtonClick}
                  >
                    {' '}
                    Sí{' '}
                  </Button>
                  <Button
                    name='optionCaja'
                    value='No'
                    onClick={handleButtonClick}
                  >
                    {' '}
                    No{' '}
                  </Button>
                  {formData.optionCaja === 'No' && (
                    <div>
                      <div style={{ marginBottom: 30 }}>
                        <Button>
                          <label
                            htmlFor='file-input-caja'
                            style={{ cursor: 'pointer' }}
                          >
                            Seleccionar Imagen
                          </label>
                        </Button>
                        {formData.imageCajaCerrada.length < 8
                          ? (
                            <input
                              type='file'
                              id='file-input-caja'
                              accept='image/*'
                              multiple
                              style={{ display: 'none' }}
                              onChange={(e) =>
                                handleFileChange3(e, 'imageCajaCerrada')}
                            />
                            )
                          : <p style={{ color: 'red', marginTop: '10px' }}> No puedes agregar más de 8 imágenes </p>}
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                          {formData.imageCajaCerrada.map(
                            (imageUrl: string, index: number) => (
                              <img
                                key={index}
                                src={imageUrl}
                                alt='imageCajaCerrada'
                                style={{ width: '200px', height: '200px', margin: '10px', objectFit: 'cover' }}
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <label>Description</label>
              <Input
                type='text'
                name='cajaCerrada'
                value={formData.cajaCerrada}
                onChange={handleInputChange}
              />
              <div style={{ marginBottom: 30 }}>
                <label>Lona en buen estado: </label>
                <div style={{ marginBottom: 20 }}>
                  <Button
                    style={{ flex: 5, marginRight: '10px' }}
                    name='optionLona'
                    value='Si'
                    onClick={handleButtonClick}
                  >
                    {' '}
                    Sí{' '}
                  </Button>
                  <Button
                    name='optionLona'
                    value='No'
                    onClick={handleButtonClick}
                  >
                    {' '}
                    No{' '}
                  </Button>
                  {formData.optionLona === 'No' && (
                    <div>
                      <div style={{ marginBottom: 30 }}>
                        <Button>
                          <label htmlFor='file-input-lona' style={{ cursor: 'pointer' }}>
                            Seleccionar Imagen
                          </label>
                        </Button>

                        <input
                          type='file'
                          id='file-input-lona'
                          accept='image/*'
                          multiple
                          style={{ display: 'none' }}
                          onChange={(e) =>
                            handleFileChange3(e, 'imageLonaBuenEstado')}
                        />

                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                          {formData.imageLonaBuenEstado.map(
                            (imageUrl: string, index: number) => (
                              <img
                                key={index}
                                src={imageUrl}
                                alt={`imageLonaBuenEstado-${index}`}
                                style={{
                                  width: '200px',
                                  height: '200px',
                                  margin: '10px',
                                  objectFit: 'cover'
                                }}
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <label>Descripción</label>
              <Input
                type='text'
                name='lona'
                value={formData.lona}
                onChange={handleInputChange}
              />
              <div style={{ marginBottom: 30 }}>
                <label>Libre de fauna nociva: </label>
                <div style={{ marginBottom: 20 }}>
                  <Button
                    style={{ flex: 5, marginRight: '10px' }}
                    name='optionLibre'
                    value='Si'
                    onClick={handleButtonClick}
                  >
                    {' '}
                    Sí{' '}
                  </Button>
                  <Button
                    name='optionLibre'
                    value='No'
                    onClick={handleButtonClick}
                  >
                    {' '}
                    No{' '}
                  </Button>
                  {formData.optionLibre === 'No' && (
                    <div>
                      <div style={{ marginBottom: 30 }}>
                        <Button>
                          <label
                            htmlFor='file-input-libre'
                            style={{ cursor: 'pointer' }}
                          >
                            Seleccionar Imagen
                          </label>
                        </Button>
                        <input
                          type='file'
                          id='file-input-libre'
                          accept='image/*'
                          multiple
                          style={{ display: 'none' }}
                          onChange={(e) =>
                            handleFileChange3(e, 'imageLibreFauna')}
                        />
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                          {formData.imageLibreFauna.map(
                            (imageUrl: string, index: number) => (
                              <img
                                key={index}
                                src={imageUrl}
                                alt={`Selected ${index}`}
                                style={{
                                  width: '200px',
                                  height: '200px',
                                  margin: '10px',
                                  objectFit: 'cover'
                                }}
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <label>Descripción: </label>
              <Input
                type='text'
                name='fauna'
                value={formData.fauna}
                onChange={handleInputChange}
              />
              <div style={{ marginBottom: 30 }}>
                <label>Carga en buen estado: </label>
                <div style={{ marginBottom: 20 }}>
                  <Button
                    style={{ flex: 5, marginRight: '10px' }}
                    name='optionCarga'
                    value='Si'
                    onClick={handleButtonClick}
                  >
                    {' '}
                    Sí{' '}
                  </Button>
                  <Button
                    name='optionCarga'
                    value='No'
                    onClick={handleButtonClick}
                  >
                    {' '}
                    No{' '}
                  </Button>
                  {formData.optionCarga === 'No' && (
                    <div>
                      <div style={{ marginBottom: 30 }}>
                        <Button>
                          <label htmlFor='file-input' style={{ cursor: 'pointer' }}>
                            Seleccionar Imagen
                          </label>
                        </Button>
                        <input
                          type='file'
                          id='file-input'
                          accept='image/*'
                          multiple
                          style={{ display: 'none' }}
                          onChange={(e) =>
                            handleFileChange3(e, 'imageCargaBuenEstado')}
                        />
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                          {formData.imageCargaBuenEstado.map(
                            (imageUrl: string, index: number) => (
                              <img
                                key={index}
                                src={imageUrl}
                                alt={`Selected ${index}`}
                                style={{
                                  width: '200px',
                                  height: '200px',
                                  margin: '10px',
                                  objectFit: 'cover'
                                }}
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <label>Descripción: </label>
              <Input
                type='text'
                name='carga'
                value={formData.carga}
                onChange={handleInputChange}
              />
              <div style={{ marginBottom: 30 }}>
                <label>Seguridad de carga: </label>
                <div style={{ marginBottom: 20 }}>
                  <Button
                    style={{ flex: 5, marginRight: '10px' }}
                    name='optionSeguridad'
                    value='Si'
                    onClick={handleButtonClick}
                  >
                    {' '}
                    Sí{' '}
                  </Button>
                  <Button
                    name='optionSeguridad'
                    value='No'
                    onClick={handleButtonClick}
                  >
                    {' '}
                    No{' '}
                  </Button>
                  {formData.optionSeguridad === 'No' && (
                    <div>
                      <div style={{ marginBottom: 30 }}>
                        <Button>
                          <label
                            htmlFor='file-input-seguridad'
                            style={{ cursor: 'pointer' }}
                          >
                            Seleccionar Imagen
                          </label>
                        </Button>
                        <input
                          type='file'
                          id='file-input-seguridad'
                          accept='image/*'
                          multiple
                          style={{ display: 'none' }}
                          onChange={(e) =>
                            handleFileChange3(e, 'imageSeguridadCarga')}
                        />
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                          {formData.imageSeguridadCarga.map(
                            (imageUrl, index) => (
                              <img
                                key={index}
                                src={imageUrl}
                                alt={`Selected ${index}`}
                                style={{
                                  width: '200px',
                                  height: '200px',
                                  margin: '10px',
                                  objectFit: 'cover'
                                }}
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <label>Descripción: </label>
              <Input
                type='text'
                name='seguridadCarga'
                value={formData.seguridadCarga}
                onChange={handleInputChange}
              />
              <div style={{ marginBottom: 30 }}>
                <label>Sellado: </label>
                <div style={{ marginBottom: 20 }}>
                  <Button
                    style={{ flex: 5, marginRight: '10px' }}
                    name='optionSellado'
                    value='Si'
                    onClick={handleButtonClick}
                  >
                    {' '}
                    Sí{' '}
                  </Button>
                  <Button
                    name='optionSellado'
                    value='No'
                    onClick={handleButtonClick}
                  >
                    {' '}
                    No{' '}
                  </Button>
                  {formData.optionSellado === 'No' && (
                    <div>
                      <div style={{ marginBottom: 30 }}>
                        <Button>
                          <label htmlFor='file-input-sellado' style={{ cursor: 'pointer' }}>
                            Seleccionar Imagen
                          </label>
                        </Button>

                        <input
                          type='file'
                          id='file-input-sellado'
                          accept='image/*'
                          multiple
                          style={{ display: 'none' }}
                          onChange={(e) =>
                            handleFileChange3(e, 'imageSellado')}
                        />

                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                          {formData.imageSellado.map((imageUrl: string, index: number) => (
                            <img
                              key={index}
                              src={imageUrl}
                              alt={`Selected ${index}`}
                              style={{ width: '200px', height: '200px', margin: '10px', objectFit: 'cover' }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <label>Descripción: </label>
              <Input
                type='text'
                name='sellado'
                value={formData.sellado}
                onChange={handleInputChange}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type='single' collapsible style={{ padding: '8px 0' }}>
          <AccordionItem value='item-6'>
            <AccordionTrigger
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '2px solid #7A2A1E',
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              Placas Caja
            </AccordionTrigger>
            <AccordionContent>
              <label>Hay tarimas dañadas?: </label>
              <Input
                type='number'
                name='tarimasDanadas'
                value={formData.tarimasDanadas}
                onChange={handleInputChange}
              />
              <label>Cajas Identificadas: </label>
              <Input
                type='number'
                name='cajasIdentificadas'
                value={formData.cajasIdentificadas}
                onChange={handleInputChange}
              />
              <label>Cajas Dañadas por Maniobra: </label>
              <Input
                type='number'
                name='danadasManiobra'
                value={formData.danadasManiobra}
                onChange={handleInputChange}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type='single' collapsible style={{ padding: '8px 0' }}>
          <AccordionItem value='item-2'>
            <AccordionTrigger
              style={{
                fontSize: '20px', // Tamaño de fuente grande
                fontWeight: 'bold', // Negrita para mayor visibilidad
                padding: '12px 16px', // Más espacio alrededor del texto
                borderRadius: '8px', // Bordes redondeados para un diseño moderno
                border: '2px solid #7A2A1E', // Borde para resaltar el elemento
                textAlign: 'center', // Centrar el texto
                cursor: 'pointer' // Cambia el cursor para que parezca un botón
              }}
            >
              Temperatura de Pulpa
            </AccordionTrigger>
            <AccordionContent>
              <table>
                <thead>
                  <tr>
                    <th>
                      <h3>Puerta</h3>
                    </th>
                    <th>
                      <h3>Medio</h3>
                    </th>
                    <th>
                      <h3>Fondo</h3>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <label>A </label>
                    </td>
                    <td>
                      <Input
                        type='number'
                        name='tempAPuerta'
                        value={formData.tempAPuerta}
                        onChange={(e) => {
                          handleInputChange(e)
                        }}
                      />
                    </td>
                    <td>
                      <Input
                        type='number'
                        name='tempAMedio'
                        value={formData.tempAMedio}
                        onChange={(e) => {
                          handleInputChange(e)
                        }}
                      />
                    </td>
                    <td>
                      <Input
                        type='number'
                        name='tempAFondo'
                        value={formData.tempAFondo}
                        onChange={(e) => {
                          handleInputChange(e)
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>M </label>
                    </td>
                    <td>
                      <Input
                        type='number'
                        name='tempMPuerta'
                        value={formData.tempMPuerta}
                        onChange={(e) => {
                          handleInputChange(e)
                        }}
                      />
                    </td>
                    <td>
                      <Input
                        type='number'
                        name='tempMMedio'
                        value={formData.tempMMedio}
                        onChange={(e) => {
                          handleInputChange(e)
                        }}
                      />
                    </td>
                    <td>
                      <Input
                        type='number'
                        name='tempMFondo'
                        value={formData.tempMFondo}
                        onChange={(e) => {
                          handleInputChange(e)
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>B </label>
                    </td>
                    <td>
                      <Input
                        type='number'
                        name='tempBPuerta'
                        value={formData.tempBPuerta}
                        onChange={(e) => {
                          handleInputChange(e)
                        }}
                      />
                    </td>
                    <td>
                      <Input
                        type='number'
                        name='tempBMedio'
                        value={formData.tempBMedio}
                        onChange={(e) => {
                          handleInputChange(e)
                        }}
                      />
                    </td>
                    <td>
                      <Input
                        type='number'
                        name='tempBFondo'
                        value={formData.tempBFondo}
                        onChange={(e) => {
                          handleInputChange(e)
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ paddingTop: 10 }}>
                <h3>
                  {' '}
                  <strong>Temperatura Ideal</strong>
                </h3>
                <Select
                  name='tempIdeal'
                  onValueChange={(value) =>
                    handleInputChange({
                      target: { name: 'tempIdeal', value }
                    })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Selecciona una fruta' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='4'>Manzanas (4°C)</SelectItem>
                    <SelectItem value='7'>Plátanos (7°C)</SelectItem>
                    <SelectItem value='1'>Uvas (1°C)</SelectItem>
                    <SelectItem value='0'>Fresas (0°C)</SelectItem>
                    <SelectItem value='-1'>Mango (-1°C)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <h2>Resultados de la Investigación</h2>
        <Input
          type='text'
          name='resultadosInv'
          value={formData.resultadosInv}
          onChange={handleInputChange}
        />

        <Card>
          <CardHeader>
            <CardTitle>Datos de Calidad y Transporte</CardTitle>
            <CardDescription>Proporcione los datos requeridos y firme en los campos indicados.</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Names and Signatures Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                {/* Inspector Section */}
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                    Nombre Inspector de Calidad
                  </label>
                  <Input
                    type='text'
                    name='nombreInspector'
                    value={formData.nombreInspector}
                    onChange={handleInputChange}
                    style={{ marginBottom: '10px', width: '100%' }}
                  />
                  <h2 style={{ margin: '10px 0' }}>Firma Inspector de Calidad</h2>
                  <div
                    style={{
                      border: '2px solid black',
                      padding: 10,
                      display: 'inline-block',
                      boxSizing: 'border-box'
                    }}
                  >
                    <SignatureCanvas
                      ref={signaturePadInspector}
                      penColor='black'
                      canvasProps={{ width: 250, height: 100, className: 'signature-canvas' }}
                    />
                  </div>
                </div>

                {/* Chofer Section */}
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Nombre Chofer</label>
                  <Input
                    type='text'
                    name='nombreChofer'
                    value={formData.nombreChofer}
                    onChange={handleInputChange}
                    style={{ marginBottom: '10px', width: '100%' }}
                  />
                  <h2 style={{ margin: '10px 0' }}>Firma del Chofer</h2>
                  <div
                    style={{
                      border: '2px solid black',
                      padding: 10,
                      display: 'inline-block',
                      boxSizing: 'border-box'
                    }}
                  >
                    <SignatureCanvas
                      ref={signaturePadChofer}
                      penColor='black'
                      canvasProps={{ width: 250, height: 100, className: 'signature-canvas' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p style={{ textAlign: 'center' }}>
              Revise los datos y asegúrese de que las firmas sean claras antes de proceder.
            </p>
          </CardFooter>
        </Card>
        <div style={{ paddingTop: 5 }} />
        <Button onClick={clearSignature}>Limpiar Firma</Button>
        <Button onClick={saveSignature}>Guardar Firma</Button>

        <Button onClick={() => { void handleInsert() }}>Guardar datos en la Bd</Button>

        <div style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
          {firmaBase64Inspector && firmaBase64Chofer ? (
            <PDFDownloadLink
              document={<DownloadPDF
                formData={formData}
                firmaBase64Inspector={firmaBase64Inspector}
                firmaBase64Chofer={firmaBase64Chofer}
              />}
              fileName={`Acta_${formData.oc}.pdf`}
            >
              <Button variant='default'>Descargar PDF</Button>
            </PDFDownloadLink>
          ) : (
            <Button variant='default' disabled>Faltan firmas</Button>
          )}
        </div>
      </div>
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
            <div style={{ padding: '10px', display: 'flex', justifyContent: 'center' }} />
            <div style={{ marginTop: 20, textAlign: 'center' }} />
          </div>
          <DialogFooter>
            <Button variant='outline'>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

export default ActaDeLlegada
