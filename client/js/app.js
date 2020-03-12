(function(){
    window.TOKEN=localStorage.getItem('token');

    const SERVER='http://localhost:3000';

    Vue.component('navbar',{
        template:'#navbar',
        methods:{
        }
    });

    const headers={
        'Content-Type':'application/json',
        'token':TOKEN
    };

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
            app.setToken(token);
            app.setUser(user);
            app.isLogin=true;
            app.currentView='kanban';
            app.user=response.data.user;
           
        }
    }

    function startLogin(sentData,self){
        
        axios.post(SERVER+'/login',sentData)
        .then(onLoginSuccess(self))
        .catch(onLoginError)
    }

    function startLoginWithGoogle(sentData,self){
        axios.post(SERVER+'/login/google',sentData)
        .then(onLoginSuccess(self))
        .catch(onLoginError)
    }

    function initGoogleAuth(component,elemID){
        gapi.load('auth2',function(){
           component.$root.auth=gapi.auth2.init({
                client_id: '614517392795-5oq30eghfu0883s8jn5h8ilt84u66c7c.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin'
              });
              
              var elem=document.querySelector(elemID);
              component.$root.auth.attachClickHandler(elem,{},component.googleSignIn,onLoginError);
        })
         
    }

    function loadTasks(){
        var self=this;
        axios({
            method:'get',
            headers:headers,
            url:SERVER+'/task'
        })
        .then(function(response){
           
            var data=response.data;
            self.listKanban=data;
            console.log(self);
        })
        .catch()
    }

    function updateUser(sentData){
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

    Vue.component('login',{
        template:'#login-page',
        data:function(){
            return {
                email:'',
                password:'',
                auth:null
            }
        },
        mounted:function(){
            initGoogleAuth(this,'#btn-google');
        },
        methods:{
            login:function(){
                var self=this;
                startLogin({
                    "email":self.email,
                    "password":self.password
                },self)
            },
            googleSignIn:function(googleUser){
                if(googleUser && googleUser.getBasicProfile){
                    var profile = googleUser.getBasicProfile();
                    var sentData={
                        name:profile.getName(),
                        email:profile.getEmail(),
                        login_token:profile.getId()
                    }
                   
                    startLoginWithGoogle(sentData,self);
                }
            }
        }
    });


    Vue.component('register',{
        template:'#register-page',
        data:function(){
            return {
                email:'',
                password:'',
                name:'',
                repassword:''
            }
        },
        methods:{
            register:function(){
                var self=this;
                var sentData={
                    "email":self.email,
                    "password":self.password,
                    "name":self.name,
                    "repassword":self.repassword
                }
                var err={};
                if(!validateRegisterInputs(sentData,err)){
                    swal('Register failed',err.message,'error');
                    return;
                }

                axios.post(SERVER+'/register',sentData)
                .then(function(response){
                    var data=response.data;
                    var email=data.email;
                    var password=sentData.password;
                    startLogin({email,password},self);
                })
                .catch(onError)
            }
        }
    });


    Vue.component('kanban',{
        template:'#kanban-page',
        data:function(){
            return {
                listKanban:[]
            }
        },
        created:function(){
           console.log(this);
           loadTasks.call(this);
        },
        methods:{
            addCard:function(title){
                var self=this;
                swal({
                    text: 'Please Enter your task name',
                    content: "input",
                    button: {
                        text: "input",
                        closeModal: true,
                        
                    },
                })
                .then(function(value){
                    if(!value)
                        return;
                   var url=SERVER+'/task';
                   var sentData={task:value,type:title};

                   return axios.post(url,sentData,{
                       headers:headers
                   })

                })
                .then(function(){
                    self.listKanban=[];
                    loadTasks.call(self);
                })
                .catch(function(err){
                    console.log(err);
                        swal('Mampus','Ada error','error');
                })
            },
            viewCard:function(task){
                var $kanbanText=task.task;
                var _action;
                var self=this;
                var editData={};
                swal({
                    title:'Task Name',
                    text:$kanbanText,
                    buttons:{
                        edit:'Edit Task',
                        delete:{
                            text:'Delete Task',
                            defeat:true,
                            dangerMode: true,
                        },
                        cancel:'Cancel'
                    },
                    closeOnClickOutside :false,
                    closeModal:true
                }).then(function(value){
                    
                    _action=value;
                    switch(value){
                        case 'delete':
                           return swal({
                            title: "Are you sure want to delete this task?",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          })
                        case 'edit':
                            return swal({
                                title: 'Please input your task',
                                content: {
                                    element:'input',
                                    attributes:{
                                        value:$kanbanText
                                    }
                                },
                                button:{
                                    text: "next",
                                    closeModal: true,
                                },
                                closeOnClickOutside :false,
                                closeModal:true
                            })
                    }
                })
                .then(function(v){

                    if(_action==='delete'){
                        var url=SERVER+'/task/'+task.id;
                        return axios({
                            method:'DELETE',
                            headers:headers,
                            url:url
                        })
                        .then(function(){
                            self.listKanban=[];
                            loadTasks.call(self);
                        })
                    }
                    else if(_action==='edit'){
                        editData.task=v;
                        return swal({
                            title: 'Please input your task type. Accepted values [Back-log, To-Do, Doing, and Done]',
                            content: {
                                element:'input'
                            },
                            button:{
                                text: "submit",
                                closeModal: true,
                            }
                        }).then(function(value){

                            const validType=['Back-log','To-Do','Doing','Done'];
                            if(validType.indexOf(value)!==-1)
                                editData.type=value;
                            
                            editData.task=editData.task?editData.task:$kanbanText;
                        
                            var url=SERVER+'/task/'+task.id;
                            return axios({
                                method:'PUT',
                                headers:headers,
                                data:editData,
                                url:url
                            }).then(function(){
                                self.listKanban=[];
                                loadTasks.call(self);
                            })
                            
                        })
                    }
                })
                .catch(function(err){
                    console.log({err});
                    swal('Mampus','Ada error','error');
                })
            }
        }
    });

    var $cardTemplete=$('#kanban-card-template');
    var card_template=$cardTemplete.html();

    Vue.component('card-content',{
        template:card_template,
        data:function(){
            return {}
        },
        props:['title','tasks']
    });

    Vue.component('profile-page',{
        template:'#profile-page',
        data:function(){
            return {
                email:'',
                password:'',
                name:'',
                repassword:''
            }
        },
        mounted:function(){

            var user=app.user;
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
                updateUser(sentData);
            }
        }
    })

   var app= new Vue({
        el:'#app',
        data:{
            currentView:'login',
            isLogin:false,
            auth:null,
            user:null
        },
        created:function(){
            this.user=JSON.parse(localStorage.getItem('user'));
        },
        methods:{
            loadView:function(view){
                this.currentView=view;
            },
            setToken:function(token){
                TOKEN=token;
                localStorage.setItem('token',token);
            },
            setUser:function(user){
                localStorage.setItem('user',JSON.stringify(user));
                this.user=user
            },
            logout:function(){
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                app.isLogin=false;
                this.currentView='login';
                if(this.auth){
                    this.auth.signOut().then(function(){
                        //renderGoogleButton()
                    });
                    this.auth.disconnect();
                }
                
            }
        }
    });
    
    if(!TOKEN){
        app.currentView='login';
        app.isLogin=false;
    }
    else{
        app.currentView='kanban';
        app.isLogin=true;
    }


})();