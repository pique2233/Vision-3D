"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

export default function Citation() {
  const citationText = `@misc{li2025vision3d,
  author       = {Ziwen Li and Xianfeng Han},
  title        = {Vision3D: Panoramic 3D Scene Reconstruction from a Single Image via Diffusion and Gaussian Splatting},
  year         = {2025},
  howpublished = {GitHub},
  url          = {https://pique2233.github.io/Vision3D.github.io}
}`

  return (
    <section className="py-16 w-full bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Citation</h2>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>BibTeX Citation</span>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  navigator.clipboard.writeText(citationText)
                }}
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">{citationText}</pre>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
