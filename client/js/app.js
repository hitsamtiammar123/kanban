(function(){
    window.TOKEN=localStorage.getItem('token');

    Vue.component('navbar',{
        template:'#navbar',
        methods:{
        }
    })

    Vue.component('login',{
        template:'#login-page'
    });

    Vue.component('register',{
        template:'#register-page'
    });


    Vue.component('kanban',{
        template:'#kanban-page',
        data:function(){
            return {
                listKanban:[
                    {
                        title:'Ini Judul Heheheh',
                        tasks:[
                            {
                                id:1,
                                task:'Hahahahaahahahah'
                            },
                            {
                                id:2,
                                task:'Heheheh HOhoohoho'
                            },
                            {
                                id:3,
                                task:'Hihihi Hahahah Heheheheh'
                            },
                        ]
                    },
                    {
                        title:'Ini Judul Heheheh 55555',
                        tasks:[
                            {
                                id:1,
                                task:'Hahahahaahahahah'
                            },
                            {
                                id:2,
                                task:'Heheheh HOhoohoho'
                            },
                            {
                                id:3,
                                task:'Hihihi Hahahah Heheheheh'
                            },
                        ]
                    },
                ]
            }
        },
        methods:{
            addCard:function(){
                console.log(this);
                swal({
                    text: 'Please Enter your task name',
                    content: "input",
                    button: {
                        text: "input",
                        closeModal: true,
                    },
                })
            },
            viewCard:function(task){
                var $kanbanText=task.task;
                var _action;
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
                    closeOnClickOutside :false
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
                              title:'Edit Task',
                              content:{
                                  element:'textarea',
                                  attributes:{
                                    value:$kanbanText.trim(),
                                    rows:10
                                  }
                              }
                        })
                    }
                })
                .then(function(){
                    if(_action==='delete'){
                        swal('Ini action delete')
                    }
                    else if(_action==='edit'){
                        swal('Ini action edit');
                    }
                })
            }
        }
    })


})();