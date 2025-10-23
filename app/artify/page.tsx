import DrawCanvas from "../components/DrawCanvas";


export default function DrawingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center gap-6 p-8 bg-gray-50">
      <h1 className=" font-bold mt-8">Zone de dessin</h1>
      <DrawCanvas />
    </div>
  )
}