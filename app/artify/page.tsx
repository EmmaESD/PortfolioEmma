import DrawCanvas from "../components/DrawCanvas";
import Gallery from "../components/Gallery";


export default function DrawingPage() {
  return (
    
    <div className="min-h-screen flex flex-col items-center gap-30 p-8 w-full typography">
      <div className="flex flex-col gap-6 items-center">
      <h1 className="text-2xl">Artify</h1>
      <p>Laissez votre empreinte unique : dessinez, l&apos;IA fera le reste.</p>
      </div>
      <div className="w-full flex flex-col gap-42 items-center">
      <DrawCanvas />
      <Gallery/>
      </div>
    </div>
    
  )
}