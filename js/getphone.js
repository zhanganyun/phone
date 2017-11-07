
const  login={
    template:'#login',
    data(){
        return {
            name:"",
            pass:""
        }
    },
    methods:{
        org(){
            this.$http({
                url:"/login",
                method:"get",
                params: {"name":this.name,"pass":this.pass}
            }).then(res=>{
                console.log(res)
            },err=>{
                console.log(res)
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
        xaj(){
            this.$http({
                url:"/getPhone",
                method:"get",
                params:{phone:this.phone}
            }).then(res=>{
                let a=JSON.parse(res.body);
                if (a.Code=="OK"){
                    this.sjss=  Number(a.phone);
                    alert("发送成功")
                }
                else if(res.name=="RequestTimeoutError"){
                    alert("超出当天发信息量,请明天再试")
                }else{
                    alert("发送失败")
                }
            },err=>{})
        },
        zc(){

            // if(this.sjss==this.isyz){
            //
            // }else{
            //     alert("验证码错误")
            // }
        },


    }
}
const routes=[
    {path:"/login",component:login},
    {path:"/sign",component:sign},
    {path:"*",redirect:"/login"}
]
const router= new VueRouter({
    routes
})
new Vue({
    el:"#app",
    router,
    data:{
        enterclass:"slideInLeft",
        leaveclass:"slideOutRight"
    },
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