<template>
        <div class="container mt-5 mb-4 ml-3 d-flex" >
            <CardContent v-for="(kanban,title) in listKanban" :key="kanban.id"
            v-bind:tasks="kanban" 
            v-bind:title="title" 
            v-on:add-card="addCard"
            v-on:view-card="viewCard" />
        </div>
</template>

<script>
    import axios from 'axios';
    import CardContent from './CardContent';
    import io from 'socket.io-client';

    var socket = io.connect(SERVER);

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
            //console.log('listKanban',self.listKanban);
        })
        .catch(function(err){
            console.log('Ada error',err);
        })
    }

    function addTask(title){
        var self = this;
        swal({
            text: 'Please Enter your task name',
            content: "input",
            button: {
                text: "input",
                closeModal: true,
            },
        }).then(function(value) {
            if (!value)
                return false;
            var url = SERVER + '/task';
            var sentData = {
                task: value,
                type: title
            };
            return axios.post(url, sentData, {
                headers: headers
            });
        }).then(function(result) {
            if (!result)
                return;
            socket.emit('task-added',result.data);
            self.listKanban = [];
            loadTasks.call(self);
        }).catch(function(err) {
            console.log(err);
            swal('Mampus', 'Ada error', 'error');
        })
    }

    function viewCard(task){
        var $kanbanText = task.task;
        var _action;
        var self = this;
        var editData = {};
        swal({
            title: 'Task Name',
            text: $kanbanText,
            buttons: {
            edit: 'Edit Task',
            delete: {
                text: 'Delete Task',
                defeat: true,
                dangerMode: true,
            },
            cancel: 'Cancel'
            },
            closeOnClickOutside: false,
            closeModal: true
        }).then(function(value) {
            _action = value;
            switch (value) {
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
                    element: 'input',
                    attributes: {
                    value: $kanbanText
                    }
                },
                button: {
                    text: "next",
                    closeModal: true,
                },
                closeOnClickOutside: false,
                closeModal: true
                })
            }
        })
        .then(function(v) {
            if (_action === 'delete') {
            var url = SERVER + '/task/' + task.id;
            return axios({
                    method: 'DELETE',
                    headers: headers,
                    url: url
                })
                .then(function() {
                    socket.emit('task-deleted',task);
                    self.listKanban = [];
                    loadTasks.call(self);
                })
            } else if (_action === 'edit') {
            editData.task = v;
            return swal({
                title: 'Please input your task type. Accepted values [Back-log, To-Do, Doing, and Done]',
                content: {
                element: 'input'
                },
                button: {
                text: "submit",
                closeModal: true,
                }
            }).then(function(value) {
                const validType = ['Back-log', 'To-Do', 'Doing', 'Done'];
                if (validType.indexOf(value) !== -1)
                editData.type = value;
                editData.task = editData.task ? editData.task : $kanbanText;
                var url = SERVER + '/task/' + task.id;
                return axios({
                    method: 'PUT',
                    headers: headers,
                    data: editData,
                    url: url
                }).then(function() {
                    socket.emit('task-updated',task);
                    self.listKanban = [];
                    loadTasks.call(self);
                })
            })
            }
        })
        .catch(function(err) {
            console.log({
            err
            });
            swal('Mampus', 'Ada error', 'error');
        })
    }

    

    export default {
        data:function(){
            return {
                listKanban:[]
            }
        },
        created:function(){
            loadTasks.call(this);
        },
        mounted:function(){
            var self=this;
            socket.on('broadcast-task',function(result){
                console.log('brod',result);
                var type=result.type;
                self.listKanban[type].push(result);
               //self.listKanban.push(result);
            });

            socket.on('broadcast-task-deleted',function(result){
                var id=result.id;
                var type=result.type;
                var deletedIndex=self.listKanban[type].findIndex((curr)=>curr.id==id);
                self.listKanban[type].splice(deletedIndex,1);
            });

            socket.on('broadcast-task-updated',function(result){
                self.listKanban = [];
                loadTasks.call(self);
            })
        },
        components:{
            CardContent
        },
        methods:{
            addCard:addTask,
            viewCard:viewCard
        }
    }
</script>