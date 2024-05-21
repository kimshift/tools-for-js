# 捕捉异常：遇到错误则停止执行
set -e

if git status --porcelain | grep -q '^[ MARC]'; then # 判断仓库是否干净
  git add .
  git commit -m "publish new version" # 添加版本更新信息
fi

# 补丁修改---修改小版本
npm version patch

# 新增功能---修改中版本
# npm version minor

# 重大修改---修改大版本
# npm version major

version=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
echo "当前最新版本号：'$version'"

# 打包
npm run build

# 提交到远程仓库
git push origin master
# git push origin refs/tags/v$version # 提交 tag 到远程仓库
echo "version: v$version 发布中..."
if [[ $version =~ [beta] ]]; then # 如果版本号包含 beta  则发布到 bate 分支
  echo "version: v$version 发布到 beta 分支"
  npm publish --tag beta
else
  echo "version: v$version 发布到 master 分支"
  npm publish
fi
echo "version: v$version 发布成功！"
