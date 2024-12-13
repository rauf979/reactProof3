import * as React from 'react'
import * as pdfjsLib from 'pdfjs-dist'
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.worker.js'
// the default params
const DEFAULT_DESIRE_WIDTH = 980
const DEFAULT_SCALE = 1
// const DEFAULT_MIN_SCALE=0.25;
// const DEFAULT_MAX_SCALE=10;
interface urlTypes {
  url: string
  withCredentials?: boolean
  maxImageSize?: number
  cMapPacked?: boolean
}
interface IProps {
  url?: string | urlTypes
  data?: string
  scale?: string | number
  page?: number
  showAllPage?: boolean
  onDocumentComplete?: any
  width?: number
}
interface IStates {
  pdf: any
  page: number
  style: object | null
  totalPage: number
}
export class PDFReader extends React.Component<IProps, IStates> {
  private canvasRefs: { [key: string]: HTMLCanvasElement | null } = {}
  state: IStates = {
    pdf: null,
    style: null,
    page: 1,
    totalPage: 0
  }

  canvas: any
  public constructor (props: IProps) {
    super(props)
    this.canvas = React.createRef()
  }

  public componentDidMount () {
    const { url, data, showAllPage, onDocumentComplete } = this.props
    const dom: any = this.canvas.current
    if (url) {
      let obj: urlTypes = {
        url: ''
      }
      // fetch pdf and render
      if (typeof url === 'string') {
        obj.url = url
      } else if (typeof url === 'object') {
        obj = url
      }
      pdfjsLib.getDocument(obj).promise.then((pdf: pdfjsLib.PDFDocumentProxy) => {
        // is exit onDocumentComplete or not
        if (onDocumentComplete) {
          this.props.onDocumentComplete(pdf.numPages)
        }
        this.setState({ totalPage: pdf.numPages })
        this.setState({ pdf }, () => {
          if (showAllPage) {
            this.renderAllPage()
          } else {
            this.renderPage(dom, null)
          }
        })
      })
    } else {
      // loaded the base64
      const loadingTask = pdfjsLib.getDocument({ data })
      loadingTask.promise.then((pdf) => {
        // is exit onDocumentComplete or not
        if (onDocumentComplete) {
          this.props.onDocumentComplete(pdf.numPages)
        }
        this.setState({ pdf }, () => {
          if (showAllPage) {
            this.renderAllPage()
          } else {
            this.renderPage(dom, null)
          }
        })
      })
    }
  }

  static getDerivedStateFromProps (props: IProps, state: IStates): Partial<IStates> {
    return { ...state, page: props.page }
  }

  // in the new lifestyle we can use this in shouldComponentUpdate
  public shouldComponentUpdate (nextProps: IProps): boolean {
    const { showAllPage } = nextProps
    const dom = this.canvas.current
    if (showAllPage) { return true }
    if (nextProps.page !== this.state.page) {
      this.renderPage(dom, nextProps.page ?? null)
    }
    return true
  }

  private renderPage (dom: HTMLCanvasElement, spnum: number | null): void {
    const { pdf, page } = this.state
    const { width, scale } = this.props
    let currentPage = page || 1
    if (spnum) {
      currentPage = spnum
    }
    if (currentPage > pdf.numPages) {
      currentPage = pdf.numPages
    }
    if (currentPage < 1) {
      currentPage = 1
    }
    pdf.getPage(currentPage).then((page: pdfjsLib.PDFPageProxy) => {
      let desiredWidth
      // if this.props has width props
      if (width) {
        desiredWidth = width
      } else {
        desiredWidth = DEFAULT_DESIRE_WIDTH
      }
      let desireScale
      // if this.props has scale props
      if (scale) {
        desireScale = scale
      } else {
        const templeView = page.getViewport({ scale: DEFAULT_SCALE })
        desireScale = desiredWidth / templeView.width
      }
      const viewport = page.getViewport({ scale: Number(desireScale) })
      const canvas = dom
      const canvasContext = canvas.getContext('2d')
      canvas.height = viewport.height
      canvas.width = viewport.width
      this.setState({
        style: {
          height: canvas.height,
          width: canvas.width
        }
      })
      if (canvasContext != null) {
        const renderContext = {
          canvasContext,
          viewport
        }
        page.render(renderContext)
      }
    })
  }

  private renderAllPage () {
    const { totalPage } = this.state
    if (totalPage > 0) {
      for (let i = 0; i < totalPage; i++) {
        const dom = this.canvasRefs['canvas' + i.toString()]
        if (dom != null) { // Verifica si 'dom' no es null
          this.renderPage(dom, null)
        }
      }
    }
  }

  public render (): JSX.Element {
    const { totalPage } = this.state // Extraemos el estilo y el número total de páginas del estado
    const { showAllPage } = this.props // Propiedad para determinar si mostrar todas las páginas

    return (
      <div>
        {showAllPage !== undefined && showAllPage !== null && showAllPage
          ? (
            <>
              {Array.from({ length: totalPage }).map((_, index) => (
                <canvas
                  ref={(canvas) => {
                    this.canvasRefs = {}
                    this.canvasRefs['canvas' + index.toString()] = canvas
                  }}
                  key={index.toString()}
                />
              ))}
            </>
            )
          : (
            <canvas ref={(canvas) => { this.canvas = canvas }} />
            )}
      </div>
    )
  }
}
