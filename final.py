
import time
import os
from tqdm import tqdm
import open3d as o3d
from colorama import Fore, Style, init

init(autoreset=True)  # 自动重置颜色，避免影响后续输出

def section_header(title):
    print("\n" + "=" * 60)
    print(title)
    print("=" * 60)

def simulate_terminal_log():
    os.system('clear')  # 清屏（仅Linux有效）

    section_header("🚀 Launching Panoramic-to-Mesh Workflow")

    print(f"{Fore.CYAN}[INFO]{Style.RESET_ALL} Detected CUDA device: NVIDIA RTX4090-SXM4-24GB")
    print(f"{Fore.CYAN}[INFO]{Style.RESET_ALL} Configuration:")
    print("       --input_dir ./panp/")
    print("       --output_dir ./results/output_mvd/")
    print("       --model mvdiffusion")
    print("       --depth_model depth_anything_v2")
    print("       --gpu 0")
    time.sleep(1)

    section_header("📸 Running MVDiffusion (Panoramic Image Generation)")
    for _ in tqdm(range(300), desc="MVDiffusion", ncols=75):
        time.sleep(0.01)

    print(f"{Fore.CYAN}[INFO]{Style.RESET_ALL} Reading multi-view output from: results/output_mvd/")
    time.sleep(0.5)
    print(f"{Fore.CYAN}[INFO]{Style.RESET_ALL} Found 14 images for further processing.")
    time.sleep(1)

    section_header("🔬 Running Depth Anything V2 (Depth Estimation)")
    for _ in tqdm(range(300), desc="Depth Estimation", ncols=75):
        time.sleep(0.05)

    print(f"{Fore.GREEN}[SUCCESS]{Style.RESET_ALL} Depth maps saved to: results/output_mvd/")
    time.sleep(0.5)

    section_header("🛠️  Mesh Reconstruction")
    print(f"{Fore.CYAN}[INFO]{Style.RESET_ALL} Using Poisson Surface Reconstruction (depth=14)")
    for _ in tqdm(range(400), desc="Meshing Point Cloud", ncols=75):
        time.sleep(0.05)

    print(f"{Fore.GREEN}[SUCCESS]{Style.RESET_ALL} Mesh reconstruction completed.")
    print(f"{Fore.CYAN}[INFO]{Style.RESET_ALL} Launching Open3D visualizer...")

def visualize_pointcloud(ply_file="public/point-clouds/scene4.ply"):
    if not os.path.exists(ply_file):
        print(f"{Fore.RED}[ERROR]{Style.RESET_ALL} Point cloud file not found: {ply_file}")
        return
    pcd = o3d.io.read_point_cloud(ply_file)
    o3d.visualization.draw_geometries([pcd], window_name="🌐 3D Point Cloud Viewer")

if __name__ == "__main__":
    simulate_terminal_log()
    visualize_pointcloud("public/point-clouds/scene4.ply")
