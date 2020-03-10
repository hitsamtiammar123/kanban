$(document).ready(function(){

    $('.add-card-link').click(function(e){
        e.preventDefault()
        swal({
            text: 'Please Enter your task name',
            content: "input",
            button: {
              text: "input",
              closeModal: true,
            },
          })
    });

    $('.kanban-text').click(function(){
        var $kanbanText=$(this).text();
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
    })
})