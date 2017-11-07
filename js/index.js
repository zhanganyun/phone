
const  login={
    template:'#login',
    data(){
        return {
            name:"",
            pass:""
        }
    },
    methods:{
        //登录
        org(){
            this.$http({
                url:"/login",
                method:"get",
                params: {"name":this.name,"pass":this.pass}
            }).then(res=>{
                let aaa=JSON.parse(res.body);
                if(aaa.err==false){
                    alert("登录成功")
                }
            },err=>{
                let bbb=JSON.parse(res.body);
                alert(bbb.msg)
            })
        }
    }
}
const  sign={
    template:'#sign',
    data(){
        return{
            //手机
            phone:'',
            //密码
            pass:"",
            //确认密码
            ispass:"",
            //账户
            name:"",
            //input验证
            isyz:"",
            show: true,
            count: '',
            timer: null,
            //返回参数
            sjss:"",
            msg:"OK"
        }
    },
    methods:{
        //倒计时60秒按钮
        sj(){
            this.xaj();
            const TIME_COUNT = 60;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }
        },
        //发送信息
        xaj(){
            this.$http({
                url:"/getPhone",
                method:"get",
                params:{phone:this.phone}
            }).then(res=>{
                let a=JSON.parse(res.body);
                console.log(a.phone)
                if (a.Code=="OK"){
                    this.sjss=a.phone;
                    alert("发送成功")
                }
                else if(res.name=="RequestTimeoutError"){
                    alert("超出当天发信息量,请明天再试")
                }else{
                    alert("发送失败")
                }
            },err=>{})
        },
        //注册成功之后返回登录页面
        rou(){
            let ab=this;
            this.pass="";
            this.ispass="";
            this.name="";
            this.phone="";
            this.isyz="";
            setTimeout(function () {
                //涉及到作用域的关系所以this要赋予其他一个值
               ab.$router.replace("/login");
            },1000)
        },
        //注册
        zc(){
            if(this.pass==this.ispass){
                console.log(this.sjss)
                if(this.sjss==this.isyz){
                    this.$http({
                        url:"/add",
                        method:"GET",
                        params:{
                            pass:this.pass,
                            name:this.name
                        }
                    }).then(res=>{
                        let a=JSON.parse(res.body);
                        if(a.err==false){
                            this.rou();
                            alert(a.msg);
                        }
                    },err=>{

                    })
                }else{
                    alert("验证码错误")
                }
            }else{
                alert("两次密码不一致")
            }
        },


    }
}
//配置路由
const routes=[
    {path:"/login",component:login},
    {path:"/sign",component:sign},
    {path:"/",redirect:"/login"}
];
/**初始化Vuerouter*/
const router= new VueRouter({
    routes
});
//初始化vue实例
new Vue({
    el:"#app",
    router,
    data:{
        enterclass:"slideInLeft",
        leaveclass:"slideOutRight"
    },
    //监听事件
    watch:{
        '$route':function (to,from) {
            // to.path
            if(to.path=="/sign"){
                this.enterclass="rotateIn";
                this.leaveclass="rotateOut";
            }else{
                this.enterclass="slideInLeft";
                this.leaveclass="slideOutRight"
            }
        }
    }
})