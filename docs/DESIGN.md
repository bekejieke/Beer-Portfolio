# Beer Portfolio Design Direction

## 视觉定位

整体参考深色开发者作品集气质，尤其是左右分栏、左侧固定个人信息、右侧滚动内容、青绿色强调色和克制动效。但不得复制参考网站的文字、代码、项目排版和个人品牌元素。

## 布局

桌面端：

- 页面总宽度建议 1120px 至 1240px。
- 左侧区域 38% 至 42%，使用 `position: sticky; top: 0; height: 100vh;`。
- 右侧区域 58% 至 62%，使用浏览器自然滚动。

移动端：

- 转为单列。
- 左侧个人信息不固定。
- 导航简化或隐藏。
- 项目卡片上下排列。
- 取消鼠标相关效果。

## 色彩

```text
背景色: #0F172A
卡片悬停背景: rgba(30, 41, 59, 0.45)
主标题: #E2E8F0
正文: #94A3B8
次级文字: #64748B
强调色: #5EEAD4
边框: rgba(148, 163, 184, 0.15)
```

## 字体

- 主字体：Inter。
- 中文回退：`PingFang SC`、`HarmonyOS Sans SC`、`Microsoft YaHei`、`sans-serif`。
- 代码或标签：JetBrains Mono。

## 字号

```text
个人名称: 48px
职业标题: 20px
正文: 16px
模块标题: 14px
项目标题: 18px
标签: 12px
```

## 组件方向

- `Sidebar`：姓名、职业定位、简介、锚点导航、社交链接。
- `SectionNav`：编号导航、hover/active 状态和滚动联动。
- `ExperienceCard`：轻量卡片，hover 时轻微上移和标题高亮。
- `FeaturedProjectCard`：16:10 项目截图 + 项目说明 + 标签 + 外链。
- `OtherProjectCard`：三列网格，移动端单列。
- `NotesSection`：文字列表，不使用大封面。
- `ContactSection`：邮件主按钮、简历和 GitHub 次级入口。

## 动效

- 页面进入动画总时长控制在 800ms 内。
- 模块进入视口可轻微淡入。
- hover 动画建议 200ms ease。
- 支持 `prefers-reduced-motion`。
- 禁止强烈彩色光斑、复杂滚动劫持和无法暂停的持续动画。

## 可访问性

- 使用语义化 HTML。
- 所有图片必须有 alt。
- 所有图标链接必须有 aria-label。
- 导航必须键盘可操作。
- focus 状态必须清晰。
- 导航高亮不能只依赖颜色。
