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

    function validateRegisterInputs(sentData){
        if(!sentData.email){

        }
    }

    function onLoginError(err){
        console.log({err})
        var response=err.response;
        if(response.status===400){
            swal('Login Failed',response.data.message,'error');
        }
    }

    function startLogin(sentData,self){
        
        axios.post(SERVER+'/login',sentData)
        .then(function(response){
            var token=response.data.token;
            TOKEN=token;
            localStorage.setItem('token',token);
            app.currentView='kanban';
            console.log(self.$root);

        })
        .catch(onLoginError)
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

    Vue.component('login',{
        template:'#login-page',
        data:function(){
            return {
                email:'',
                password:''
            }
        },
        methods:{
            login:function(){
                var self=this;
                startLogin({
                    "email":self.email,
                    "password":self.password
                },self)
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
                    "name":self.name
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
                                title: 'Demo Form',
                                content: 'input',
                                button: {
                                  text: 'Submit',
                                  closeModal: false
                                }
                            })
                    }
                })
                .then(function(){
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

   var app= new Vue({
        el:'#app',
        data:{
            currentView:'login'
        },
        methods:{
            loadView:function(view){
                this.currentView=view;
            },
            logout:function(){
                localStorage.removeItem('token');
                this.currentView='login';
            }
        }
    });
    
    if(!TOKEN){
        app.currentView='login';
    }
    else{
        app.currentView='kanban';
    }


})();