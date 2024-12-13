import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
// Estilos
const styles = StyleSheet.create({
  page: { padding: 20 },
  logoSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: 5
  },
  inputLabel: { fontSize: 12, fontWeight: 'bold', fontFamily: 'GothamNarrow' },
  signatureCanvasContainer: {
    borderWidth: 1,
    borderColor: '#000',
    border: '1px solid #ccc',
    padding: '10px',
    marginTop: '20px'
  },
  table: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#000',
    marginTop: 15,
    height: 'auto'
  },
  tableRow: {
    flexDirection: 'row',
    height: 'auto'
  },
  cellLabel: {
    flex: 1,
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    fontSize: 12,
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%', // Asegura que ocupe el 100% del espacio disponible
    fontFamily: 'GothamNarrow',
    flexWrap: 'wrap', // Permite que el texto se envuelva si no cabe
    overflow: 'hidden',
    height: 'auto'
  },
  cellValue: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    padding: 1,
    fontSize: 12,
    fontFamily: 'GothamNarrow',
    height: 'auto'
  },
  cellLabelWhite: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    fontSize: 10,
    paddingVertical: 6,
    paddingHorizontal: 3,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    flexWrap: 'wrap',
    fontFamily: 'GothamNarrow',
    minHeight: 20,
    height: 'auto'
  },
  text: {
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    fontSize: 12,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'GothamNarrow'
  }
})

// Componente ActaPDF2
export interface FormData {
  fecha?: string
  inicioVerificacion?: string
  terminoVerificacion?: string
  oc?: string
  proveedor?: string
  origen?: string
  factura?: string
  especie?: string
  variedades?: string
  frioDescarga?: string
  cajasRecibidas?: string
  lineaTransportista?: string
  numeroContenedor?: string
  placasCamion?: string
  placasCaja?: string
  chofer?: string
  tempSetPoint?: string
  observacionesSetPoint?: string
  tempPantalla?: string
  observacionesPantalla?: string
  option?: string
  option2?: string
  tempOrigen?: string
  tempDestino?: string
  optionLimpio?: string
  limpio?: string
  optionCaja?: string
  cajaCerrada?: string
  optionLona?: string
  lona?: string
  optionLibre?: string
  fauna?: string
  optionCarga?: string
  carga?: string
  optionSeguridad?: string
  seguridadCarga?: string
  optionSellado?: string
  sellado?: string
  tarimasDanadas?: string
  cajasIdentificadas?: string
  danadasManiobra?: string
  tempAPuerta?: string
  tempMPuerta?: string
  tempBPuerta?: string
  tempAMedio?: string
  tempMMedio?: string
  tempBMedio?: string
  tempAFondo?: string
  tempMFondo?: string
  tempBFondo?: string
  tempMin?: string
  tempMax?: string
  tempIdeal?: string
  resultadosInv?: string
  nombreInspector?: string
  nombreChofer?: string
  imageLimpio?: string[]
  imageLibreFauna?: string[]
  imageCajaCerrada?: string[]
  imageLonaBuenEstado?: string[]
  imageCargaBuenEstado?: string[]
  imageSeguridadCarga?: string[]
  imageSellado?: string[]
}

interface DownloadPDFProps {
  formData: FormData
  firmaBase64Inspector?: string
  firmaBase64Chofer?: string
}

const DownloadPDF: React.FC<DownloadPDFProps> = ({ formData, firmaBase64Inspector, firmaBase64Chofer }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.logoSection}>
        <Image
          style={[styles.logo, { height: 60, width: 150 }]} // Ajusta el tamaño de la imagen según sea necesario
          src='/src/assets/images/LOGO.jpg'
        />
        <View style={{ alignItems: 'center' }}>
          {' '}
          <Text style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'GothamNarrow' }}>ACTA DE DESCARGA </Text>
          <View style={{ alignItems: 'center', marginTop: 5 }}>
            <Text style={{ fontSize: 14, fontFamily: 'GothamNarrow' }}>
              F-I-CAL-02-01
            </Text>
            <Text style={{ fontSize: 14, fontFamily: 'GothamNarrow' }}>
              Rev.7 (08-12-2024)
            </Text>
          </View>
        </View>
      </View>

      <View style={{ width: '100%' }}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.cellLabel}>Fecha: </Text>
            <Text style={styles.cellValue}>{formData.fecha ?? ''}</Text>
            <Text style={[styles.cellLabel, { flex: 1.5 }]}>
              Inicio de{'\n'}verificación:
            </Text>
            <Text style={styles.cellValue}>
              {formData.inicioVerificacion ?? ''}
            </Text>
            <Text style={[styles.cellLabel, { flex: 1.5 }]}>
              Término de verificación:
            </Text>
            <Text style={styles.cellValue}>
              {formData.terminoVerificacion ?? ''}
            </Text>
            <Text style={styles.cellLabel}>O.C.: </Text>
            <Text style={styles.cellValue}>{formData.oc ?? ''}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { flex: 0.8 }]}>Proveedor:</Text>
            <Text style={styles.cellValue}>{formData.proveedor ?? ''}</Text>
            <Text style={styles.cellLabel}>Origen:</Text>
            <Text style={styles.cellValue}>{formData.origen ?? ''}</Text>
            <Text style={styles.cellLabel}>Factura: </Text>
            <Text style={styles.cellValue}>{formData.factura ?? ''}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { flex: 0.2 }]}>Especie:</Text>
            <Text style={styles.cellValue}>{formData.especie ?? ''}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { flex: 0.2 }]}>Variedades:</Text>
            <Text style={styles.cellValue}>{formData.variedades ?? ''}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.cellLabel}>Frío de descarga: </Text>
            <Text style={styles.cellValue}>{formData.frioDescarga ?? ''}</Text>
            <Text style={styles.cellLabel}>
              Cajas recibidas: {formData.cajasRecibidas}
            </Text>
            <Text style={styles.cellValue}>{formData.cajasRecibidas ?? ''}</Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { flex: 0.35 }]}>
              Línea Transportista
            </Text>
            <Text style={styles.cellValue}>
              {formData.lineaTransportista ?? ''}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { flex: 0.35 }]}>
              No. de Contenedor
            </Text>
            <Text style={styles.cellValue}>
              {formData.numeroContenedor ?? ''}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { flex: 0.35 }]}>
              Placas de Camión
            </Text>
            <Text style={styles.cellValue}>{formData.placasCamion ?? ''}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { flex: 0.35 }]}>Placas Caja</Text>
            <Text style={styles.cellValue}>{formData.placasCaja ?? ''}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { flex: 0.35 }]}>Chofer</Text>
            <Text style={styles.cellValue}>{formData.chofer ?? ''}</Text>
          </View>
        </View>
        <View style={{ marginBottom: 20 }} />
        <View style={{ width: '100%' }}>
          <Text style={[styles.text, { width: '100%' }]}>
            Condiciones de transporte:
          </Text>
          <View style={styles.tableRow}>
            <Text style={{ width: '60%' }} />
            <Text style={styles.cellLabelWhite}>Observaciones</Text>
          </View>
          <View style={{ width: '100%', textAlign: 'center' }}>
            <View style={styles.tableRow}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.2 }]}>
                    Temperatura del set point:
                  </Text>
                  <Text style={[styles.cellValue, { flex: 0.4 }]}>
                    {'\n'}  {formData.tempSetPoint ?? ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.observacionesSetPoint ?? ''}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.2 }]}>
                    Temperatura de pantalla:
                  </Text>
                  <Text style={[styles.cellValue, { flex: 0.4 }]}>
                    {'\n'} {formData.tempPantalla ?? ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.observacionesPantalla ?? ''}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabel, { flex: 0.28 }]} />
                  <Text style={[styles.cellLabel, { flex: 0.17 }]}>cumple</Text>
                  <Text style={[styles.cellLabel, { flex: 0.17 }]}>
                    no cumple
                  </Text>
                  <Text style={[styles.cellLabel, { flex: 0.52 }]}>
                    observaciones
                  </Text>
                </View>
                <View style={[styles.tableRow, { height: 'auto' }]}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.66 }]}>
                    Termografo:
                  </Text>
                  <View style={{ flex: 0.42 }}>
                    <Text style={styles.cellValue}>
                      {formData.option === 'Si' ? 'SI' : ''}
                    </Text>
                    <Text style={styles.cellValue}>
                      {formData.option2 === 'Si' ? 'SI' : ''}
                    </Text>
                  </View>
                  <View style={{ flex: 0.43 }}>
                    <Text style={styles.cellValue}>
                      {formData.option === 'No' ? 'No ' : ''}
                    </Text>
                    <Text style={styles.cellValue}>
                      {formData.option2 === 'No' ? 'No' : ''}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3 }}>
                    <Text style={styles.cellValue}>Origen</Text>
                    <Text style={styles.cellValue}>Destino:</Text>
                  </View>
                  <View style={{ flex: 0.98, minHeight: 60 }}>
                    <Text style={styles.cellValue}>
                      {formData.tempOrigen ?? ''}
                    </Text>
                    <Text style={styles.cellValue}>
                      {formData.tempDestino ?? ''}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                    Limpio,libre de malos olores:
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionLimpio === 'Si' ? 'Si' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionLimpio === 'No' ? 'No' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                    {' '}
                    {formData.limpio ?? ''}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                    Caja cerrada , en buen estado(sin hoyos o endiduras ):
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionCaja === 'Si' ? 'Si' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionCaja === 'No' ? 'No' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                    {formData.cajaCerrada ?? ''}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                    Lona en buen estado:
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionLona === 'Si' ? 'Si' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionLona === 'No' ? 'No' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                    {formData.lona ?? ''}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                    Libre de fauna nociva:
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionLibre === 'Si' ? 'Si' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionLibre === 'No' ? 'No' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                    {formData.fauna ?? ''}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                    Carga en buen estado:
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionCarga === 'Si' ? 'Si' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionCarga === 'No' ? 'No' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                    {formData.carga ?? ''}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                    seguridad de carga
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionSeguridad === 'Si' ? 'Si' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionSeguridad === 'No' ? 'No' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                    {formData.seguridadCarga ?? ''}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                    sellado:
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionSellado === 'Si' ? 'Si' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionSellado === 'No' ? 'No' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                    {formData.sellado ?? ''}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={[styles.text, { fontSize: 10 }]}>
            Condiciones de Carga (Maniobra)
          </Text>
          <View style={{ width: '100%' }}>
            <View style={styles.tableRow}>
              <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                Hay tarimas dañadas :
              </Text>
              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>SI</Text>
              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>NO</Text>
              <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                #{formData.tarimasDanadas}{' '}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                Cajas identificadas :
              </Text>
              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>SI</Text>
              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>NO</Text>
              <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                #{formData.cajasIdentificadas}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                Cajas dañadas por maniobra:
              </Text>
              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}> SI </Text>
              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>NO</Text>
              <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                #{formData.danadasManiobra}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 20 }} />
        <View style={[styles.tableRow, { marginBottom: 15, width: '100%' }]}>
          <View style={[{ height: 100, width: '26%' }]}>
            <Text style={[styles.cellLabel, {}]}>Temperatura de pulpa</Text>
            <Text style={styles.cellValue}>A</Text>
            <Text style={styles.cellValue}>M</Text>
            <Text style={styles.cellValue}>B</Text>
          </View>
          <View style={[{ width: '10%' }]}>
            <Text style={[styles.cellLabel, { height: 20 }]}>Puerta</Text>
            <Text style={styles.cellValue}>{formData.tempAPuerta}</Text>
            <Text style={styles.cellValue}>{formData.tempMPuerta}</Text>
            <Text style={styles.cellValue}>{formData.tempBPuerta}</Text>
          </View>
          <View style={[{ width: '10%' }]}>
            <Text style={[styles.cellLabel, { height: 20 }]}>Medio</Text>
            <Text style={styles.cellValue}>{formData.tempAMedio}</Text>
            <Text style={styles.cellValue}>{formData.tempMMedio}</Text>
            <Text style={styles.cellValue}>{formData.tempBMedio}</Text>
          </View>
          <View style={[{ width: '10%' }]}>
            <Text style={[styles.cellLabel, { height: 20 }]}>Fondo</Text>
            <Text style={styles.cellValue}>{formData.tempAFondo}</Text>
            <Text style={styles.cellValue}>{formData.tempMFondo}</Text>
            <Text style={styles.cellValue}>{formData.tempBFondo}</Text>
          </View>
          <View style={[{ width: '30%' }]}>
            <Text style={[styles.cellLabel]}>Rango de Temperatura</Text>
            <View style={[styles.tableRow, { height: 50 }]}>
              <Text style={styles.cellValue}>Min:{formData.tempMin}</Text>
              <Text style={styles.cellValue}>Max:{formData.tempMax}</Text>
            </View>
          </View>
          <View style={[{ width: '30%' }]}>
            <Text style={styles.cellLabel}>Ideal</Text>
            <View style={[styles.tableRow, { height: 50 }]}>
              <Text style={styles.cellValue}> {formData.tempIdeal}°C </Text>
            </View>
          </View>
        </View>

        <View style={[styles.tableRow, { marginBottom: 15 }]}>
          {/* Parte en negritas y más grande */}
          <Text
            style={[
              styles.cellLabel,
              { flex: 0.35, fontSize: 11, fontWeight: 'bold' }
            ]}
          >
            Resultados de la {'\n'}Investigación{'\n'}
            <Text style={{ fontSize: 6 }}>
              (PRODUCTO DAÑADO DESEMPLEADO SE ENVIAN A PISO O SE ARREGLAN)
            </Text>
          </Text>
          <Text style={styles.cellValue}>{formData.resultadosInv ?? ''}</Text>
        </View>

        <Text style={[styles.text, { fontSize: 12 }]}>
          Hago constar que estoy de acuerdo con lo verificado y registrado en el
          presente{'\n'}documento
        </Text>

        <View>
          <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { width: '12%', textAlign: 'center', fontSize: 10, height: 200 }]}>
              {' '}
              Verifico descarga{'\n'} (Inspector de Calidad)
            </Text>
            <View style={{ width: '38%' }}>
              <Text style={[styles.cellValue, { flex: 0.3 }]}>
                Nombre:{formData.nombreInspector}
              </Text>
              <View style={[styles.cellValue, {}]}>
                <Text style={[styles.inputLabel, { paddingBottom: 10 }]}>
                  Firma:
                </Text>
                {firmaBase64Inspector !== null && firmaBase64Inspector !== undefined && (
                  <Image
                    src={firmaBase64Inspector}
                    style={{ width: 200, height: 150 }}
                  />
                )}
              </View>
            </View>
            <Text style={[styles.cellLabel, { width: '12%', fontSize: 10 }]}>
              {' '}
              Chofer
            </Text>
            <View style={{ width: '38%' }}>
              <Text style={[styles.cellValue, { flex: 0.3 }]}>
                Nombre:{formData.nombreChofer}
              </Text>
              <View style={[styles.cellValue, {}]}>
                <Text style={[styles.inputLabel, { paddingBottom: 10 }]}>
                  Firma:
                </Text>
                {firmaBase64Chofer !== null && firmaBase64Chofer !== undefined && (
                  <Image
                    src={firmaBase64Chofer}
                    style={{ width: 200, height: 150 }}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
    (formData.option === 'No' ||
    formData.option2 === 'No' ||
    formData.optionLibre === 'No' ||
    formData.optionCaja === 'No' ||
    formData.optionLona === 'No' ||
    formData.optionCarga === 'No' ||
    formData.optionSeguridad === 'No' ||
    formData.optionSellado === 'No' ||
    formData.optionLimpio === 'No') && (
    <Page size='A4' style={styles.page}>
      <View>
        <Text
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            borderWidth: 1,
            borderColor: '#000',
            backgroundColor: '#ccc'
          }}
        >
          Anexos
        </Text>
      </View>

      <View>
        {formData.optionLimpio === 'No' && (
          <>
            <View style={{ borderWidth: 1, borderColor: '#000' }}>
              <Text style={{ fontSize: '15px' }}>  Evidencia No cumple con Limpio, libre de malos olores  </Text>
              <Text style={{ fontSize: '10px', paddingTop: 10 }}> {formData.limpio ?? ''} </Text>
              <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>
                {formData.imageLimpio?.map((imageUrl: string, index: number) => (
                  <div key={index} style={{ padding: '4px', borderRadius: '10px', textAlign: 'center' }}>
                    <Image
                      src={imageUrl}
                      style={{ width: '150px', height: '150px', borderRadius: '5px', marginBottom: '10px' }}
                    />
                  </div>
                ))}
              </div>
            </View>
          </>
        )}

        {formData.optionLibre === 'No' && (
          <>
            <View style={{ borderWidth: 1, borderColor: '#000' }}>
              <Text style={{ fontSize: '15px' }}>  Evidencia No cumple libre de Fauna nociva  </Text>
              <Text style={{ fontSize: '10px', paddingTop: 10 }}> {formData.limpio ?? ''} </Text>
              <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>
                {formData.imageLibreFauna?.map((imageUrl: string, index: number) => (
                  <div key={index} style={{ padding: '4px', borderRadius: '10px', textAlign: 'center' }}>
                    <Image
                      src={imageUrl}
                      style={{ width: '150px', height: '150px', borderRadius: '5px', marginBottom: '10px' }}
                    />
                  </div>
                ))}
              </div>
            </View>
          </>
        )}

        {formData.optionCaja === 'No' && (
          <>
            <View style={{ borderWidth: 1, borderColor: '#000' }}>
              <Text style={{ fontSize: '15px' }}>  Evidencia No cumple Caja cerrada, en buen estado(sin hoyos o endiduras ):  </Text>
              <Text style={{ fontSize: '10px', paddingTop: 10 }}> {formData.cajaCerrada ?? ''} </Text>
              <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>
                {formData.imageCajaCerrada?.map((imageUrl: string, index: number) => (
                  <div key={index} style={{ margin: '10px' }}>
                    <Image
                      src={imageUrl}
                      style={{ width: '150px', height: '150px', borderRadius: '5px', marginBottom: '10px' }}
                    />
                  </div>
                ))}
              </div>
            </View>
          </>
        )}
        {formData.optionLona === 'No' && (
          <>
            <View style={{ borderWidth: 1, borderColor: '#000' }}>
              <Text style={{ fontSize: '15px' }}>  Evidencia No cumple  Lona en buen estado  </Text>
              <Text style={{ fontSize: '10px', paddingTop: 10 }}> {formData.lona ?? ''} </Text>
              <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>
                {formData.imageLonaBuenEstado?.map((imageUrl: string, index: number) => (
                  <div key={index} style={{ margin: '10px' }}>
                    <Image
                      src={imageUrl}
                      style={{ width: '150px', height: '150px', borderRadius: '5px', marginBottom: '10px' }}
                    />
                  </div>
                ))}
              </div>
            </View>
          </>
        )}
        {formData.optionCarga === 'No' && (
          <>
            <View style={{ borderWidth: 1, borderColor: '#000' }}>
              <Text style={{ fontSize: '15px' }}>  Evidencia No cumple Carga en buen estado</Text>
              <Text style={{ fontSize: '10px', paddingTop: 10 }}> {formData.carga ?? ''} </Text>
              <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>
                {formData.imageCargaBuenEstado?.map((imageUrl: string, index: number) => (
                  <div key={index} style={{ margin: '10px' }}>
                    <Image
                      src={imageUrl}
                      style={{ width: '150px', height: '150px', borderRadius: '5px', marginBottom: '10px' }}
                    />
                  </div>
                ))}
              </div>
            </View>
          </>
        )}
        {formData.optionSeguridad === 'No' && (
          <>
            <View style={{ borderWidth: 1, borderColor: '#000' }}>
              <Text style={{ fontSize: '15px' }}>  Evidencia No cumple seguridad de carga </Text>
              <Text style={{ fontSize: '10px', paddingTop: 10 }}> {formData.seguridadCarga ?? ''} </Text>
              <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>
                {formData.imageSeguridadCarga?.map((imageUrl: string, index: number) => (
                  <div key={index} style={{ margin: '10px' }}>
                    <Image
                      src={imageUrl}
                      style={{ width: '150px', height: '150px', borderRadius: '5px', marginBottom: '10px' }}
                    />
                  </div>
                ))}
              </div>
            </View>
          </>
        )}

        {formData.optionSellado === 'No' && (
          <>
            <View style={{ borderWidth: 1, borderColor: '#000' }}>
              <Text style={{ fontSize: '15px' }}>  Evidencia No cumple con el sellado  </Text>
              <Text style={{ fontSize: '10px', paddingTop: 10 }}> {formData.sellado ?? ''} </Text>
              <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>
                {formData.imageSellado?.map((imageUrl: string, index: number) => (
                  <div key={index} style={{ margin: '10px' }}>
                    <Image
                      src={imageUrl}
                      style={{ width: '150px', height: '150px', borderRadius: '5px', marginBottom: '10px' }}
                    />
                  </div>
                ))}
              </div>
            </View>
          </>
        )}
      </View>
    </Page>
  </Document>
)
export default DownloadPDF
