# jungle
丛林的意思，使用node cluster去运行轮训脚本或定时脚本，如果脚本发生意外自动重启。
# 需求
- 部署代码到多台机器中，使用mq 服务可以实现分布式执行器

# 运行
``javascript
启动manager
npm run manager
npm run manager:prod

启动executor
npm run executor
npm run executor:prod
``

# 添加一个定时任务
1. 放入 ./lib/manager中
2. 继承BaseManager
3. 实现 run, close

# 添加一个轮训执行者
1. 放入 ./lib/executor中
2. 继承BaseExecutor
3. 实现 run, close`
