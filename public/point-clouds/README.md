# Point Cloud Files Directory

Place your point cloud files (.ply) in this directory to make them available for viewing in the Vision3D website.

## Naming Convention

For automatic detection, please use the following naming convention:
- scene1.ply
- scene2.ply
- scene3.ply
- etc.

## How to Add Files

1. Place your .ply files in this directory following the naming convention
2. The files will automatically be available in the 3D viewer on the website
3. Use the buttons in the viewer to switch between different point clouds

## Example Structure
\`\`\`
public/
├── point-clouds/
│   ├── scene1.ply
│   ├── scene2.ply
│   ├── scene3.ply
│   └── ...
\`\`\`

## Supported Format

Currently, only PLY (Polygon File Format) is supported. Make sure your point clouds are exported in this format.
