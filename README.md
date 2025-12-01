<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1RWjxKMivUSM6XACHF1UpSDydokaMV3z4

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## 替换底部头像（About）

- 将你的头像文件放到 `public/` 目录并命名为：`leon-avatar.webp`（建议正方形裁剪，如 512×512）。
- 可选提供高分辨率：`leon-avatar@2x.webp`，以在高 DPI 设备显示更清晰。
- 代码已指向静态路径：`components/About.tsx:16-20` 使用 `/leon-avatar.webp`，无需改动代码。
- 若资源缺失会自动回退到当前默认头像（Unsplash 链接）。

## 替换研究卡片封面（Research）

- 将封面图片放到 `public/` 并命名为：`battery-cover.webp`
- 可选提供高分辨率：`battery-cover@2x.webp`
- 代码已指向静态路径：`components/Research.tsx:21-24` 使用 `/battery-cover.webp`
- 若资源缺失会自动回退到原 Unsplash 封面，保证不空白
