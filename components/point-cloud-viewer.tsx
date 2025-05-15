"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader"
import { Button } from "@/components/ui/button"

// Define available point cloud files
const POINT_CLOUD_FILES = [
  { name: "Sample Sphere", path: null }, // Built-in sample
  { name: "Scene 1", path: "/point-clouds/scene1.ply" },
  { name: "Scene 2", path: "/point-clouds/scene2.ply" },
  { name: "Scene 3", path: "/point-clouds/scene3.ply" },
]

export default function PointCloudViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentFile, setCurrentFile] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Scene references for cleanup
  const sceneRef = useRef<THREE.Scene | null>(null)
  const pointCloudRef = useRef<THREE.Points | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Setup scene
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0xf0f0f0)

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Function to load a specific point cloud file
    const loadPointCloud = (fileIndex: number) => {
      // Remove previous point cloud if it exists
      if (pointCloudRef.current) {
        scene.remove(pointCloudRef.current)
        pointCloudRef.current.geometry.dispose()
        if (pointCloudRef.current.material instanceof THREE.Material) {
          pointCloudRef.current.material.dispose()
        } else if (Array.isArray(pointCloudRef.current.material)) {
          pointCloudRef.current.material.forEach((material) => material.dispose())
        }
        pointCloudRef.current = null
      }

      const selectedFile = POINT_CLOUD_FILES[fileIndex]

      // If it's the sample sphere (null path), create a sample point cloud
      if (!selectedFile.path) {
        createSamplePointCloud(scene)
        setLoading(false)
        return
      }

      // Otherwise, load the PLY file
      setLoading(true)
      setError(null)

      const loader = new PLYLoader()
      loader.load(
        selectedFile.path,
        (geometry) => {
          // Create point cloud from loaded geometry
          const material = new THREE.PointsMaterial({
            size: 0.01,
            vertexColors: true,
            sizeAttenuation: true,
          })

          const pointCloud = new THREE.Points(geometry, material)

          // Center the point cloud
          geometry.computeBoundingBox()
          if (geometry.boundingBox) {
            const center = new THREE.Vector3()
            geometry.boundingBox.getCenter(center)
            pointCloud.position.set(-center.x, -center.y, -center.z)
          }

          scene.add(pointCloud)
          pointCloudRef.current = pointCloud

          // Adjust camera to fit the point cloud
          if (geometry.boundingSphere) {
            const radius = geometry.boundingSphere.radius
            camera.position.z = radius * 2.5
            controls.update()
          }

          setLoading(false)
        },
        // Progress callback
        (xhr) => {
          // You could add a progress indicator here
        },
        // Error callback
        (error) => {
          console.error("Error loading point cloud:", error)
          setError(`Failed to load ${selectedFile.name}. Make sure the file exists at ${selectedFile.path}`)
          setLoading(false)
          // Fall back to sample point cloud
          createSamplePointCloud(scene)
        },
      )
    }

    // Function to create a sample point cloud (sphere)
    const createSamplePointCloud = (scene: THREE.Scene) => {
      const geometry = new THREE.BufferGeometry()
      const numPoints = 5000
      const positions = new Float32Array(numPoints * 3)
      const colors = new Float32Array(numPoints * 3)

      // Generate random points in a sphere
      for (let i = 0; i < numPoints; i++) {
        // Position
        const radius = 2 * Math.random()
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)

        const x = radius * Math.sin(phi) * Math.cos(theta)
        const y = radius * Math.sin(phi) * Math.sin(theta)
        const z = radius * Math.cos(phi)

        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z

        // Color based on position
        colors[i * 3] = x / 2 + 0.5 // R
        colors[i * 3 + 1] = y / 2 + 0.5 // G
        colors[i * 3 + 2] = z / 2 + 0.5 // B
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        sizeAttenuation: true,
      })

      const pointCloud = new THREE.Points(geometry, material)
      scene.add(pointCloud)
      pointCloudRef.current = pointCloud
    }

    // Load the initial point cloud
    loadPointCloud(currentFile)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose of all resources
      if (pointCloudRef.current) {
        pointCloudRef.current.geometry.dispose()
        if (pointCloudRef.current.material instanceof THREE.Material) {
          pointCloudRef.current.material.dispose()
        } else if (Array.isArray(pointCloudRef.current.material)) {
          pointCloudRef.current.material.forEach((material) => material.dispose())
        }
      }

      scene.clear()
      renderer.dispose()
    }
  }, [])

  // Function to handle file change
  const handleFileChange = (fileIndex: number) => {
    setCurrentFile(fileIndex)

    // If scene is already set up, load the new point cloud
    if (sceneRef.current) {
      const selectedFile = POINT_CLOUD_FILES[fileIndex]

      // Remove previous point cloud
      if (pointCloudRef.current) {
        sceneRef.current.remove(pointCloudRef.current)
        pointCloudRef.current.geometry.dispose()
        if (pointCloudRef.current.material instanceof THREE.Material) {
          pointCloudRef.current.material.dispose()
        } else if (Array.isArray(pointCloudRef.current.material)) {
          pointCloudRef.current.material.forEach((material) => material.dispose())
        }
        pointCloudRef.current = null
      }

      setLoading(true)
      setError(null)

      // If it's the sample sphere, create it
      if (!selectedFile.path) {
        const scene = sceneRef.current
        createSamplePointCloud(scene)
        setLoading(false)
        return
      }

      // Otherwise load the PLY file
      const loader = new PLYLoader()
      loader.load(
        selectedFile.path,
        (geometry) => {
          if (!sceneRef.current) return

          const material = new THREE.PointsMaterial({
            size: 0.01,
            vertexColors: true,
            sizeAttenuation: true,
          })

          const pointCloud = new THREE.Points(geometry, material)

          // Center the point cloud
          geometry.computeBoundingBox()
          if (geometry.boundingBox) {
            const center = new THREE.Vector3()
            geometry.boundingBox.getCenter(center)
            pointCloud.position.set(-center.x, -center.y, -center.z)
          }

          sceneRef.current.add(pointCloud)
          pointCloudRef.current = pointCloud

          setLoading(false)
        },
        undefined,
        (error) => {
          console.error("Error loading point cloud:", error)
          setError(`Failed to load ${selectedFile.name}. Make sure the file exists at ${selectedFile.path}`)
          setLoading(false)

          // Fall back to sample point cloud
          if (sceneRef.current) {
            createSamplePointCloud(sceneRef.current)
          }
        },
      )
    }
  }

  // Function to create a sample point cloud (sphere)
  const createSamplePointCloud = (scene: THREE.Scene) => {
    const geometry = new THREE.BufferGeometry()
    const numPoints = 5000
    const positions = new Float32Array(numPoints * 3)
    const colors = new Float32Array(numPoints * 3)

    // Generate random points in a sphere
    for (let i = 0; i < numPoints; i++) {
      // Position
      const radius = 2 * Math.random()
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // Color based on position
      colors[i * 3] = x / 2 + 0.5 // R
      colors[i * 3 + 1] = y / 2 + 0.5 // G
      colors[i * 3 + 2] = z / 2 + 0.5 // B
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      sizeAttenuation: true,
    })

    const pointCloud = new THREE.Points(geometry, material)
    scene.add(pointCloud)
    pointCloudRef.current = pointCloud
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center mb-4 gap-2">
        {POINT_CLOUD_FILES.map((file, index) => (
          <Button
            key={index}
            variant={currentFile === index ? "default" : "outline"}
            onClick={() => handleFileChange(index)}
            disabled={loading}
            className="text-sm"
          >
            {file.name}
          </Button>
        ))}
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10 rounded-lg">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-slate-800">Loading point cloud...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-2 left-2 right-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded z-20">
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-1">Using sample point cloud instead.</p>
        </div>
      )}

      <div ref={containerRef} className="w-full h-full rounded-lg relative" />

      <div className="mt-4 text-sm text-slate-500 text-center">
        <p>
          To add your own point clouds, place .ply files in the public/point-clouds/ directory named scene1.ply,
          scene2.ply, etc.
        </p>
      </div>
    </div>
  )
}
