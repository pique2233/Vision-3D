export default function Hero() {
  return (
    <section className="w-full bg-slate-900 text-white py-32">
      <div className="container mx-auto text-center">
        <h1 className="text-6xl font-bold mb-6">Vision3D</h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-slate-300">
          Panoramic 3D Scene Reconstruction from a Single Image via Diffusion and Gaussian Splatting
        </p>
        <div className="flex justify-center gap-4 mb-10">
          <button className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 transition-colors rounded-md">
            Paper
          </button>
          <a  href="https://github.com/pique2233/Vision-3D" target="_blank" rel="noopener noreferrer">
            <button className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 transition-colors rounded-md">
            Code
            </button>
          </a>
         
          <button className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 transition-colors rounded-md">
            Demo
          </button>
        </div>
        <div className="text-lg text-slate-300">
          <p>Ziwen Li,  Guanyu Qv，Xianfeng Han</p>
          <p className="text-sm mt-2">Department of Computer Science, Research Institute</p>
        </div>
      </div>
    </section>
  )
}
