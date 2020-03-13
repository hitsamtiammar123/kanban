<template>
            <div class="d-flex justify-content-center" id="register-content">
            <div class="mt-3 bg-light" id="register-form">
                <h3 class="text-center">Register</h3>
                <form v-on:submit.prevent>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" v-model="email" id="email" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" v-model="name" id="name" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" v-model="password" id="password" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="re-password">Confirm Password</label>
                        <input type="password" v-model="repassword" id="re-password" class="form-control">
                    </div>
                    <div class="form-group">
                        <button v-on:click.prevent="register" :disabled="isRegistering" class="btn btn-success">Submit</button>
                        <a href="#" v-on:click.prevent="$emit('change-view','login')">Click here to login</a>
                    </div>
                </form>
            </div>
        </div>
</template>

<script>
    import axios from 'axios';

    function  onError(err){
        console.log({err});
        swal('warning','Register failed','error');
    }

    function onLoginError(err){
        console.log({err})
        var response=err.response;
        if(response && response.status===400){
            swal('Login Failed',response.data.message,'error');
        }
    }

    function startLogin(sentData,self){
        
        axios.post(SERVER+'/login',sentData)
        .then(onLoginSuccess(self))
        .catch(onLoginError)
        .finally(onDone(self));
    }

    function onDone(self){
        return function(){
            self.isRegistering=false;
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

    function validateRegisterInputs(sentData,err){
        if(!sentData.email){
            err.message='Email must be filled';
            return false;
        }
        if(!sentData.password){
            err.message='Password must be filled';
            return false;
        }
        if(!sentData.name){
            err.message='Name must be filled';
            return false;
        }

        if(sentData.password!==sentData.repassword){
            err.message='Re-Password is not match';
            return false;
        }

        return true;
    }

    function register(){
        var self = this;
        var sentData = {
            "email": self.email,
            "password": self.password,
            "name": self.name,
            "repassword": self.repassword
        }
        var err = {};
        if (!validateRegisterInputs(sentData, err)) {
            swal('Register failed', err.message, 'error');
            return;
        }
        axios.post(SERVER + '/register', sentData)
        .then(function(response) {
            var data = response.data;
            var email = data.email;
            var password = sentData.password;
            startLogin({
                email,
                password
            }, self);
        })
        .catch(onError)
        

        self.isRegistering=true;
    }

    export default {
        data: function() {
            return {
                email: '',
                password: '',
                name: '',
                repassword: '',
                isRegistering:false
            }
        },
        methods:{
            register:register
        }
    }
</script>