# vue-toolistProject - 待办清单

Vue 3 数据驱动版待办清单，纯 Composition API 单文件实现。

## 功能

- 添加 / 删除任务（回车或按钮，空输入过滤）
- 标记完成 / 待办（点击圆圈）
- 行内编辑任务文字（Enter 保存、Esc 取消、失焦保存）
- 统计待办 / 已完成 / 全部数量
- 任务排序（未完成在前）
- 清除已完成 / 清除全部（空状态按钮禁用）
- localStorage 本地持久化

## 目录结构

```
src/
├── App.vue         # 全部业务逻辑：任务增删/编辑/完成/统计/排序/清除
├── assets/         # 样式文件
└── main.js         # 应用入口：挂载 Vue
```

## 运行

```bash
npm install
npm run dev
```

环境要求：Node.js `^22.18.0 || >=24.12.0`
