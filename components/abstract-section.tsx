"use client"

import { useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"

export default function AbstractSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Animation setup
    let animationFrameId: number
    const particles: { x: number; y: number; size: number; speed: number; color: string }[] = []

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, 0.7)`,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update particles
      particles.forEach((particle) => {
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.y += particle.speed

        // Reset particle position when it goes off screen
        if (particle.y > canvas.height) {
          particle.y = 0
          particle.x = Math.random() * canvas.width
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section className="py-16 bg-slate-100">
      <div className="container mx-auto grid md:grid-cols-2 gap-8">
        <Card className="p-6 shadow-lg bg-white border-0">
          <h2 className="text-2xl font-bold mb-4">Abstract</h2>
          <p className="text-gray-700 leading-relaxed">
          Vision3D is an open-source system for panoramic 3D scene reconstruction from a single image, integrating cutting-edge techniques in image outpainting, depth estimation, 3D modeling, and interactive visualization. The pipeline begins with panoramic image generation using Stable Diffusion and ControlNet-based diffusion models, ensuring consistency in style, semantics, and illumination. The resulting 2:1 panorama is then sliced into multiple views and processed with Depth Anything V2 for accurate metric depth estimation. These results are fed into the Gaussian Splatting module within Nerfstudio to efficiently reconstruct high-fidelity 3D scenes. To enhance occluded perspectives and scene completeness, Vision3D incorporates novel view synthesis strategies (e.g., Zero-1-to-3) to generate unseen views and refine spatial continuity. A browser-based frontend enables users to upload images, explore the reconstruction process interactively, and manipulate 3D outputs in real time, forming a fully integrated, AI-driven platform for single-image 3D scene generation and visualization.
          </p>
        </Card>
        <div className="flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={500}
            height={300}
            className="border border-slate-200 rounded-lg shadow-md bg-white"
          />
        </div>
      </div>
    </section>
  )
}
