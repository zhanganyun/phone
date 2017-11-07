基于Node写的阿里云短信验证

目录介绍：
  index.html是测试页面;
  get.html是基于vue写的模拟静态页面;
  index.js是主要的js文件;
  server.js是服务器文件;
  其他的我都不说了。
  
  首先安装阿里云短信验证模块依赖
  cnpm install @alicloud/sms-sdk
  cnpm install express
  cnpm install mysql
  
  配置
  设置阿里云秘钥
   const accessKeyId = '';
   const secretAccessKey = '';
  设置手机号
  PhoneNumbers:phone,
  // 设置模板
  SignName: '',
  // 设置签名
  TemplateCode: '',
  // 设置发送信息
  TemplateParam: '{"code":'+code+',"product":"云通信"}'
  
  设置mysql数据库 我这是模拟的数据库  根据代码设置数据库  我这就不多说了
  
  基本操作就是这样！
  写的不好的地方的请指教！
  
  
 
  

