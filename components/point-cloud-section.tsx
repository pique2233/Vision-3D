"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FolderOpen, FileCode, Info } from "lucide-react"
import PointCloudViewer from "./point-cloud-viewer"

export default function PointCloudSection() {
  const [activeTab, setActiveTab] = useState("info")

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Interactive Point Clouds</h2>

        <Tabs defaultValue="info" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="info">
              <Info className="mr-2 h-4 w-4" />
              Information
            </TabsTrigger>
            <TabsTrigger value="folder">
              <FolderOpen className="mr-2 h-4 w-4" />
              Point Cloud Files
            </TabsTrigger>
            <TabsTrigger value="viewer">
              <FileCode className="mr-2 h-4 w-4" />
              3D Viewer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>About Point Clouds</CardTitle>
                <CardDescription>
                  This section contains interactive 3D point cloud visualizations of our results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Point clouds are a set of data points in 3D space that represent the external surface of an object.
                  Our Vision3D project generates high-quality point clouds from single images using a combination of
                  diffusion models and Gaussian Splatting techniques.
                </p>
                <p className="text-gray-700">
                  To interact with the point clouds, select the "3D Viewer" tab. You can rotate, zoom, and pan to
                  explore the 3D reconstructions in detail.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="folder">
            <Card>
              <CardHeader>
                <CardTitle>Point Cloud Files</CardTitle>
                <CardDescription>Add your point cloud files to the public/point-clouds directory.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <FolderOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Point Cloud Directory</h3>
                  <p className="text-gray-500 mb-4">
                    Place your .ply files in the public/point-clouds/ directory with the following naming convention:
                  </p>
                  <div className="bg-gray-100 p-3 rounded text-left overflow-x-auto">
                    <code className="text-sm">
                      public/point-clouds/scene1.ply
                      <br />
                      public/point-clouds/scene2.ply
                      <br />
                      public/point-clouds/scene3.ply
                      <br />
                      ...
                    </code>
                  </div>
                  <p className="text-gray-500 mt-4">
                    The files will be automatically detected and available in the 3D Viewer tab.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="viewer">
            <Card>
              <CardHeader>
                <CardTitle>3D Point Cloud Viewer</CardTitle>
                <CardDescription>
                  Interactive 3D viewer with sample point cloud data. Use the buttons to switch between different point
                  clouds.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[700px]">
                <PointCloudViewer />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
