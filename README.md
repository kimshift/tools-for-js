### 项目名称

> tools-for-js —— Javascript 工具库

### 安装

```sh
npm install tools-for-js --save
```

### 使用

```js
import { API } from 'tools-for-js'
```

### API

| 名称                                 | API               |
| ------------------------------------ | ----------------- |
| 阿拉伯数字转中文数字                 | numToChinese      |
| 金额格式化                           | moneyFormat       |
| 时间格式化                           | dateFormat        |
| 下划线转小驼峰                       | convertSmallHump  |
| 将对象中的键转小写                   | lowercaseKeys     |
| 将对象中的键转大写                   | upperCaseKeys     |
| 获取时间间隔                         | getTimeDistance   |
| 转换时间戳                           | timeStamp         |
| 获取倒计时                           | countDown         |
| 距离当前时间状况                     | transformDate     |
| 变量类型判断                         | IsType            |
| 深拷贝变量                           | deepCopy          |
| 校验空值参数                         | isEmpty           |
| 校验两个参数是否相等                 | isEqual           |
| 生成 UUID                            | createUUID        |
| 数组去重                             | deWeightArray     |
| 计算树的最后节点某字段的总和         | treeLastChildSum  |
| 校验数组对象中是否存在指定的字段为空 | checkKeyEmpty     |
| 移动数组元素                         | arrEleMove        |
| 数组元素交换位置                     | arrExchange       |
| 数组格式转树状结构                   | arrayToTree       |
| 根据 label 的值获取 value            | getValueFromArray |
| 随机抽取数组中的 n 个值              | randomNumEnum     |
| 精确加法                             | exactAdd          |
| 计算数组元素的和                     | summation         |
| 计算两个参数                         | countNumber       |
| GBK 字符集实际长度计算               | getStrLength      |
| 密码强度校验                         | checkPwdStrength  |
| 按指定长度分段字符串                 | splitString       |
| 将对象转换为查询字符串               | objectToQs        |
