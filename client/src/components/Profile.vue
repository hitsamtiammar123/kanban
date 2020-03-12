<template>
        <div class="d-flex mt-4 justify-content-center ">
            
            <form @submit.prevent class="col-4 bg-light mt-3 pt-2">
                <h5>Edit Profile</h5>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" class="form-control">
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" v-model="name" class="form-control">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" class="form-control">
                </div>
                <div class="form-group">
                    <label for="repassword">Re-Password</label>
                    <input type="password" id="repassword" v-model="repassword" class="form-control">
                </div>
                <button class="btn btn-success mb-3" @click="editProfile">Submit</button>
            </form>
        </div>
</template>

<script>
    import axios from 'axios';

    function updateUser(sentData,self){
        var app=self.$parent;
        axios({
            method:'PUT',
            headers:headers,
            url:SERVER+'/user',
            data:sentData
        }).then(function(res){
            app.currentView='kanban';
            var data=res.data;
            app.setUser(data.user);
        })  
        .catch(function(err){
            console.log({err});
            swal('Update user failed','Error when updating user','error');
        })
    }

    export default {
        name:'Profile',
        data:function(){
            return {
                email:'',
                password:'',
                name:'',
                repassword:''
            }
        },
        mounted:function(){

            var app=this.$parent;
            var user=app.getUser();
            this.email=user.email;
            this.name=user.name;
            this.password='';
        },
        methods:{
            editProfile:function(){
                var sentData={}

                this.email?sentData.email=this.email:null;
                this.name?sentData.name=this.name:null;
                this.password?sentData.password=this.password:null;

                console.log(sentData);
                updateUser(sentData,this);
            }
        }
    }
</script>