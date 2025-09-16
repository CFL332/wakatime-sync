# WakaTime Sync 本地测试指南

本指南将帮助您在本地环境测试 WakaTime 数据同步功能，无需依赖 GitHub Actions。

## 1. 准备环境变量

首先，打开`.env`文件，填入您的实际配置信息：

```
# GitHub访问令牌，需要有gist权限
GH_TOKEN=您的GitHub访问令牌

# GitHub Gist ID
GIST_ID=您的Gist ID

# WakaTime API密钥
WAKATIME_API_KEY=您的WakaTime API密钥

# Server酱密钥（可选）
# SCU_KEY=您的Server酱密钥
```

### 如何获取所需的密钥

- **WAKATIME_API_KEY**：登录 WakaTime 后，在[Settings > API Key](https://wakatime.com/settings/api-key)页面获取
- **GH_TOKEN**：在 GitHub 的[Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)创建，需要勾选`gist`权限
- **GIST_ID**：创建一个新的 Gist（公开或私有），URL 中的 ID 即为 Gist ID

## 2. 运行测试脚本

我们创建了一个专门的测试脚本`test-wakatime.js`，用于验证 WakaTime API 连接和数据获取功能：

```bash
node test-wakatime.js
```

这个脚本会：

- 检查环境变量配置
- 分别测试获取昨天和今天的数据
- 显示数据概览，包括总时间、项目列表和编程语言等信息

## 3. 测试完整功能

如果您想测试完整的同步功能（包括更新 Gist），可以直接运行主脚本：

```bash
node index.js
```

## 4. 调试提示

如果遇到问题，可以：

1. 检查环境变量是否正确设置
2. 确保网络连接正常，特别是可以访问 GitHub 和 WakaTime
3. 检查 API 密钥的权限是否足够
4. 查看控制台输出的错误信息

## 5. 常见问题

### Q: 为什么获取不到今天的数据？

A: WakaTime 的日常数据统计通常在当天结束后才会完整统计。您可以尝试查询昨天的数据，或者确认您今天有使用 WakaTime 记录的活动。

### Q: 如何验证 API 密钥是否有效？

A: 运行`test-wakatime.js`脚本会显示详细的错误信息，如果 API 密钥无效，会返回认证错误。

### Q: 为什么更新 Gist 失败？

A: 请检查：

- GitHub 访问令牌是否有 gist 权限
- Gist ID 是否正确
- Gist 是否被删除或设为私密（如果设置了私密，需要确保访问令牌有足够权限）

## 6. 修改时间范围查询

如果您想修改代码中的时间范围查询逻辑，可以编辑`index.js`文件中的`fetchSummaryWithRetry`函数。
