import Link from "next/link"

export default function RelatedWork() {
  return (
    <section className="py-16 bg-gray-50 w-full">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">Related Work</h2>

        <div className="prose prose-slate max-w-none">
          <p>There are many related works that have influenced our technique:</p>

          <ul className="mb-4">
            <li>
              <Link href="https://dreamfusion3d.github.io/" className="text-blue-600 hover:underline">
                Dreamfusion
              </Link>
              ,{" "}
              <Link href="https://pals.ttic.edu/p/score-jacobian-chaining" className="text-blue-600 hover:underline">
                Score Jacobian Chaining
              </Link>
              , and{" "}
              <Link href="https://prolificdreamer.github.io/" className="text-blue-600 hover:underline">
                ProlificDreamer
              </Link>{" "}
              pioneer pretrained 2D Diffusion Models for 3D generation.
            </li>
            <li>
              <Link href="https://lukashoel.github.io/text-to-room/" className="text-blue-600 hover:underline">
                Text2Room
              </Link>{" "}
              shows the effectiveness of iterative approaches for indoor scene synthesis.
            </li>
          </ul>

          <p>
            There are also some concurrent work that tackle scene generation or use inpainting models for similar
            applications:
          </p>

          <ul>
            <li>
              <Link href="https://nerfiller.github.io/" className="text-blue-600 hover:underline">
                NeRFiller: Completing Scenes via Generative 3D Inpainting
              </Link>
            </li>
            <li>
              <Link href="https://inpaint3d.github.io/" className="text-blue-600 hover:underline">
                Inpaint3D: 3D Scene Content Generation using 2D Inpainting Diffusion
              </Link>
            </li>
            <li>
              <Link href="https://scenewiz3d.github.io/" className="text-blue-600 hover:underline">
                SceneWiz3D: Towards Text-guided 3D Scene Composition
              </Link>
            </li>
            <li>
              <Link href="https://text2nerf.github.io/" className="text-blue-600 hover:underline">
                Text2NeRF: Text-Driven 3D Scene Generation with Neural Radiance Fields
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
