# 捕捉异常：遇到错误则停止执行
set -e
########################环境变量配置########################
node_env='development' # 开发环境
if [ "$OS" = "Windows_NT" ]; then
    node_env='development'
else
    node_env='production'
fi
export NODE_ENV=$node_env

echo "当前操作系统：$OS，当前环境：$NODE_ENV"
########################环境变量配置########################

# 启动后台服务
version=$(node -v)
if [[ $version != "v20."* ]]; then
    echo "当前Node.js版本不是v20,正在切换..."
    nvm use 20
else
    echo "$version node环境已准备"
fi
# 启动服务
# nodemon --exec babel-node src/index.js
nodemon
