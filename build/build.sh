# 捕捉异常：遇到错误则停止执行
set -e
# 使用 nvm 切换 node 版本：<20.12.2>
nvm use 20.12.2
# 删除旧包
rm -rf lib
# 打包
# 注意：babel 7.4.4 版本后，默认不再复制文件，需要添加 --copy-files 参数
babel src --out-dir lib --copy-files
