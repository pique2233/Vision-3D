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
            We introduce RealmDreamer, a technique for generation of general forward-facing 3D scenes from text
            descriptions. Our technique optimizes a 3D Gaussian Splatting representation to match complex text prompts.
            We initialize these splats by utilizing the state-of-the-art text-to-image generators, lifting their samples
            into 3D, and computing the occlusion volume. We then optimize this representation across multiple views as a
            3D inpainting task with image-conditional diffusion models. To learn correct geometric structure, we
            incorporate a depth diffusion model by conditioning on the samples from the inpainting model, giving rich
            geometric structure. Finally, we finetune the model using sharpened samples from image generators. Notably,
            our technique does not require training on any scene-specific dataset and can synthesize a variety of
            high-quality 3D scenes in different styles, consisting of multiple objects. Its generality additionally
            allows 3D synthesis from a single image.
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
