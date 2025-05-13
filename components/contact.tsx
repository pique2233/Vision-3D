import { Mail, Github, MapPin } from "lucide-react"

export default function Contact() {
  return (
    <section className="py-16 bg-slate-900 text-white w-full">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Contact Us</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 bg-slate-800 rounded-lg">
            <Mail className="h-10 w-10 mb-4 text-slate-300" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <a href="mailto:19823000405@163.com" className="text-slate-300 hover:text-white">
              19823000405@163.com
            </a>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-slate-800 rounded-lg">
            <Github className="h-10 w-10 mb-4 text-slate-300" />
            <h3 className="text-xl font-semibold mb-2">Repository</h3>
            <a href="https://github.com/pique2233/Vision3D.github.io" className="text-slate-300 hover:text-white">
              Vision3D GitHub
            </a>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-slate-800 rounded-lg">
            <MapPin className="h-10 w-10 mb-4 text-slate-300" />
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p className="text-slate-300">Department of Computer Science</p>
            <p className="text-slate-300">Research Institute</p>
          </div>
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-slate-300 mb-6">
            We welcome collaboration opportunities, questions about our research, and feedback on our work.
          </p>
          <button className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-200 transition-colors rounded-md">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  )
}
