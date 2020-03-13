<template>
    <div class="d-flex justify-content-center" id="login-content">
            <div class="mt-3 bg-light" id="login-form">
                <h3 class="text-center">Login</h3>
                <form v-on:submit.prevent>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" v-model="email" id="email" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" v-model="password" id="password" class="form-control">
                    </div>
                    <div class="form-group">
                        <button v-on:click="login" :disabled="isLoggingIn" class="btn btn-success">Submit</button>
                        <a href="#" v-on:click.prevent="$emit('change-view','register')" >Click here to register</a>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary" :disabled="isLoggingIn" id="btn-google">Sign In with google</button>
                    </div>
                </form>
            </div>

    </div>
</template>
<script>
    import axios from 'axios';

    function onLoginError(err){
        console.log({err})
        var response=err.response;
        if(response && response.status===400){
            swal('Login Failed',response.data.message,'error');
        }
    }

    function onLoginSuccess(self){
        return function(response){
           
            var token=response.data.token;
            var user=response.data.user;
            headers.token=token;
            var app=self.$parent;
           
            if(app){
                app.setToken(token);
                app.setUser(user);
                app.isLogin=true;
                app.currentView='Kanban';
            }
        }
    }


    function startLogin(sentData,self){
        
        axios.post(SERVER+'/login',sentData)
        .then(onLoginSuccess(self))
        .catch(onLoginError)
        .finally(onLoginDone(self))
    }

    function login(){
        var self = this;
        startLogin({
        "email": self.email,
        "password": self.password
        }, self)
        self.isLoggingIn=true;
    }

    function onLoginDone(self){
        return function(){
            self.isLoggingIn=false;
        }
    }

    function startLoginWithGoogle(sentData,self){
        axios.post(SERVER+'/login/google',sentData)
        .then(onLoginSuccess(self))
        .catch(onLoginError)
        .finally(onLoginDone(self))
    }

    function googleSignIn(googleUser){
         var self=this;
        if (googleUser && googleUser.getBasicProfile) {
            var profile = googleUser.getBasicProfile();
            var sentData = {
                name: profile.getName(),
                email: profile.getEmail(),
                login_token: profile.getId()
            }
            startLoginWithGoogle(sentData, self);
            self.isLoggingIn=true;
        }
    }

    function initGoogleAuth(component,elemID){
        gapi.load('auth2',function(){
           component.$root.auth=gapi.auth2.init({
                client_id: '614517392795-838eqn9f4hjf05m1nfl5ic9o80sua6r7.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin'
              });
              
              var elem=document.querySelector(elemID);
              component.$root.auth.attachClickHandler(elem,{},component.googleSignIn,onLoginError);
        })
         
    }

    export default {
        name:'Login',
        data:function(){
            return {
                email:'',
                password:'',
                auth:null,
                isLoggingIn:false
            }
        },
        mounted:function(){
            initGoogleAuth(this,'#btn-google');
        },
        methods:{
            login:login,
            googleSignIn:googleSignIn
        }
    }
</script>