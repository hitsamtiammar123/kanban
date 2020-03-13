<template>
    <div>
         <Navbar @change-view="loadView" @logout="logout"></Navbar>
         <component :is="currentView" 
         @set-token="setToken" 
         @set-user="setUser"
         @is-login="setLogin"
         @change-view="loadView"></component>
    </div>
</template>

<script>
    import Navbar from './components/navbar.vue';
    import Login from './components/Login';
    import Register from './components/Register';
    import Kanban from './components/Kanban';
    import CardContent from './components/CardContent';
    import Profile from './components/Profile';

    export default {
        name: 'App',
        data:function(){
            return {
                currentView:'Login',
                isLogin:false,
                auth:null,
                user:null
            }
        },
        components:{
            Navbar,
            Login,
            Register,
            Kanban,
            CardContent,
            Profile
        },
        created:function(){
            this.user=JSON.parse(localStorage.getItem('user'));
            if(!TOKEN){
                this.currentView='login';
                this.isLogin=false;
            }
            else{
                this.currentView='kanban';
                this.isLogin=true;
            }
        },
        methods:{
            hehe:function(){
                swal('Hehehe');
            },
            loadView:function(view){
                this.currentView=view;
            },
            setLogin:function(isLogin){
                this.isLogin=isLogin;
            },
            setToken:function(token){
                TOKEN=token;
                localStorage.setItem('token',token);
            },
            hasLogin:function(){
                return this.isLogin;
            },
            setUser:function(user){
                localStorage.setItem('user',JSON.stringify(user));
                this.user=user
            },
            getUser(){
                return this.user;
            },
            logout:function(){
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.isLogin=false;
                this.currentView='login';
               
                if(this.auth){
                    this.auth.signOut().then(function(){
                        //renderGoogleButton()
                    });
                    this.auth.disconnect();
                }
                
            }
        }
    };
</script>