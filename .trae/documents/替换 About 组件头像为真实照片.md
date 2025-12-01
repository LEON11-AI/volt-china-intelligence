## 目标
- 将底部“Leon, Founder”旁的通用头像替换为你的真实头像，保持现有圆形、渐变光环与边框风格一致，同时优化加载与清晰度。

## 现状定位
- 头像与标题位置：`components/About.tsx:16-20` 渲染 `<img>`，`alt="Leon, Founder"`，当前 `src` 指向 Unsplash 通用头像。
- 页面挂载：`App.tsx:19` 引入 `<About />`，位于主体底部区域。

## 变更范围
- 仅修改 `components/About.tsx` 的头像 `src` 与图片属性；不改动版式、文案和周边组件。
- 新增静态资源文件：在项目 `public/` 目录放置你的头像文件（示例：`public/leon-avatar.webp`）。

## 实施步骤
1. 创建资源目录
   - 若不存在则新增 `public/` 目录，用于放置静态文件。
2. 添加头像资源
   - 将你的头像拷贝为 `public/leon-avatar.webp`（或 `.jpg/.png`），建议为正方形裁剪（如 512×512），避免拉伸。
3. 更新图片引用
   - 在 `components/About.tsx` 将 `src` 从外部链接改为站点静态路径：`src="/leon-avatar.webp"`。
   - 增加图片属性以优化加载与可访问性：`loading="lazy"`、`decoding="async"`、`width`/`height`（与显示容器对应，如 128×128）。
   - 可选：提供 `srcSet`（1x/2x）与更高分辨率资源（例如 256×256 与 512×512），在高 DPI 设备保持清晰。
4. 保留现有风格
   - 保留当前圆形裁剪、边框与渐变光环的样式类，确保视觉一致：`rounded-full`、`border-2`、渐变环容器。
5. 无资源时回退策略（可选）
   - 若头像缺失，临时保留现有 Unsplash 链接作为回退，避免空白占位。

## 资源要求
- 提供你的头像原图（推荐正面、足够清晰），我将裁剪为正方形并压缩为 `webp`，同时输出 `jpg` 备选。
- 如需特殊风格（黑白、轻微磨皮、背景虚化），请说明，我会在不改变真实感的前提下处理。

## 验证
- 本地预览页面底部 About 区块，检查：
  - 头像清晰、圆形裁剪不失真，边框与光环正常。
  - 移动与桌面设备上尺寸与对齐无异常。
  - 网络性能：首次加载无明显阻塞，`lazy` 生效。

## 交付与可维护性
- 交付修改后的 `About.tsx` 与新增的头像资源文件。
- 在 README 添加一行说明：未来替换头像只需更新 `public/leon-avatar.webp` 即可。

## 备选实现（如不使用 public）
- 若更偏好打包到代码中：在 `components/About.tsx` 以 `import avatar from '../assets/leon-avatar.webp'` 并使用 `src={avatar}`，效果一致；仅需新增 `assets/` 目录及资源。
