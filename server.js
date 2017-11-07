/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */
const express=require('express');
//引入阿里云模块
const SMSClient = require('@alicloud/sms-sdk');
const mysql=require("mysql");
let server=express();
server.listen(5000);
//配置mysql
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"test"
});
/*ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
*设置阿里云秘钥
* */
const accessKeyId = 'id';
const secretAccessKey = 'pass';
//初始化阿里云sms_client模块
let smsClient = new SMSClient({accessKeyId, secretAccessKey});
//注册模块
server.get('/add',(req,res)=>{
    let name=req.query.name;
    let pass=req.query.pass;
    console.log(name)
    db.query(`select * from test where name='${name}' `,(err,data)=>{
        if(err){
            res.send({err:true,msg:'数据库查询失败'})
            res.end();
        }else{
            if(data.length>0){
                res.send({err:true,msg:'用户名已存在'});
                res.end();
            }else{
                db.query(`insert into test values ('${name}','${pass}')`,(err,data)=>{
                    if(err){
                        res.send({err:true,msg:'添加失败'});
                        res.end();
                    }else{
                        res.send({err:false,msg:"注册成功"});
                        res.end();
                    }
                })
            }
        }
    })
});
//登录模块
server.get('/login',(req,res)=>{
    db.query(`select * from test where name='${req.query.name}'`,(err,data)=>{
        if(err){
            res.send({err:true,msg:'数据库查询失败'});
            res.end();
        }else{
            if(data.length==0){
                res.send({err:1,msg:'没有这个人'});
                res.end();
            }else{
                if(data[0].password==req.query.pass){
                    res.send({err:0,msg:"登录成功"});
                    res.end();
                }else{
                    res.send({err:1,msg:"密码错误"})
                    res.end();
                }

            }
        }
    })
})
//随机数
function sj(){
    let arr=[1,2,3,4,5,6,7,8,9];
    let x=[];
    for(var i=0;i<4;i++){
        let sj=Math.floor(Math.random()*arr.length)
        x.push(arr[sj])
    }
    return x.join("");
}
console.log(sj())
//发送阿里云信息验证
server.get('/getPhone',(req,res) =>{
    let phone=req.query.phone;
    let code=sj();
    /**测试文件*/
    // let av={phone:code,Code:"OK",};
    // res.send(av);
    // res.end();

    smsClient.sendSMS({
    // 设置手机号
        PhoneNumbers:phone,
    // 设置模板
        SignName: 'sign',
    // 设置签名
        TemplateCode: 'code',
    // 设置发送信息
        TemplateParam: '{"code":'+code+',"product":"云通信"}'
    }).then(function (data) {
        let {Code}=data
        if (Code === 'OK') {
            //处理返回参数
            data.phone=code;
            console.log(data);
            res.send(data);
            res.end();
        }
    }, function (err) {
        // console.log(err)
        res.send(err);
        res.end();
    });
})

server.use(express.static('./'));
console.log("一起动............")