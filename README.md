
# 🖼️ Vision3D Frontend

基于 **Next.js** 构建的 Vision3D 项目前端展示平台，支持交互式上传图像、全景图生成展示、三维重建结果的浏览与操作，配合 Gaussian Splatting 点云重建效果，提供完整视觉流程演示体验。

## 🌐 在线预览

> 项目主页：[https://v0-vision3d-website.vercel.app/](https://v0-vision3d-website.vercel.app/)  
> 主项目仓库：[Vision3D ](https://github.com/pique2233/Vision3D)

---

## 🚀 功能 Features

- 🎯 支持上传单张图像作为输入
- 🖼️ 展示生成的 2:1 全景图像与切图视角
- 🌍 使用 Three.js 交互式浏览三维重建结果（支持旋转/缩放）
- 🔁 展示完整处理流程（输入 → 全景 → 深度 → 重建）
- 📖 结构化页面，包含项目介绍、作者信息、Demo 按钮、Github 链接
- 💻 响应式设计，支持桌面端与移动端访问

---

## 🧩 技术栈

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - 快速美观的原子化 CSS 框架
- [Three.js](https://threejs.org/) - WebGL 三维渲染库
- [Vercel](https://vercel.com/) - 部署推荐平台

---

## 📦 安装与运行

确保本地环境已安装 Node.js（建议 v16+）

```bash
# 克隆仓库
git clone https://github.com/your-org/vision3d-frontend.git
cd vision3d-frontend

# 安装依赖
npm install

# 本地开发运行
npm run dev

# 打包并构建生产环境
npm run build
npm start
```

---

## 📁 项目结构

```bash
vision3d-frontend/
├──app/         # 页面组件（Hero, Navbar, Viewer 等）
├── components/         # 页面组件（Hero, Navbar, Viewer 等）
├── public/             # 静态资源（图片、模型等）
├── hooks/              # 页面路由（/index.tsx 等）
├── styles/             # 全局样式（Tailwind 设置）
├── README.md
└── package.json
```

---

## 🧠 交互式 Demo 模块说明

- `/components/Hero.tsx`：首页介绍、按钮与项目描述区域
- `/components/Viewer.tsx`：3D 点云或 mesh 模型的渲染区域，基于 Three.js
- `/pages/index.tsx`：主页面入口，调用各个模块
- `/public/models/`：示例模型或重建输出结果，用于演示

---

## ✨ TODO / 开发中功能

- [ ] 在线调用后端 API 自动生成全景图（集成图像生成模型）
- [ ] 在线上传 → 深度估计与三维重建自动联动
- [ ] 支持高分辨率点云分层加载与异步渲染

---

## 👨‍💻 作者与贡献

本前端由 Vision3D 团队开发，项目成员包括：

- [Ziwen Li](https://pique2233.github.io/)
- Xianfeng Han  
- Guanyu Qv

欢迎通过 Pull Request 或 Issue 参与建设！

---

## 🔗 相关资源

- 🔬 [核心论文链接](https://arxiv.org/abs/xxx)
- 💻 [核心代码仓库](https://github.com/your-org/vision3d)
- 🌐 [交互式 Demo 页面](https://your-domain.com)

---

## 📜 License

本项目采用 MIT 协议，详见 [LICENSE](./LICENSE) 文件。
