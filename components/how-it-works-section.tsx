import Image from 'next/image'
export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">How it Works</h2>

        <div className="grid md:grid-cols-1 gap-12 max-w-4xl mx-auto">
          {/* Stage 1 */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-800">Stage 1: Panorama Generation</h3>
            <p className="text-gray-700 leading-relaxed">
              First, we generate a high-resolution, 360-degree panorama image based on the input text prompt or image.
              This panorama captures the overall scene layout and appearance.
            </p>
            <div className="bg-slate-100 rounded-lg p-4 flex items-center justify-center h-64 border border-slate-200">
              
              {/* The user will add their image here */}
                <Image
                 src="/images/image1.jpg" // 替换为您第一张图像的路径
                 alt="Panorama Generation"
                 width={500}
                 height={300}
                 className="object-cover"
                />
            </div>
          </div>

          {/* Stage 2 */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-800">Stage 2: Pano-to-Scene Conversion</h3>
            <p className="text-gray-700 leading-relaxed">
              Next, the generated panorama is converted into a full 3D scene. This involves converting panorama image
              into 3DGS or mesh representations, allowing for interactive exploration and consistent views from any
              angle.
            </p>
            <div className="bg-slate-100 rounded-lg p-4 flex items-center justify-center h-64 border border-slate-200">
              <p className="text-slate-500 text-center">Image placeholder for pano-to-scene conversion process</p>
              {/* The user will add their image here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
