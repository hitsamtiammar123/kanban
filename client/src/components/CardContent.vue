<template>
        <div class="col-sm-4 kanban-card">
            <div class="card">
                <div class="card-header">
                    {{title}}
                </div>
                <div class="card-body">
                    <div class="kanban-text" @click="$emit('view-card',task)" :key="task.id" track-by="$index" v-for="task in tasks">{{task.task}}</div>
                </div>
                <div class="card-footer">
                    <a class="add-card-link" href="#" v-on:click.prevent="$emit('add-card',title)">Add a card...</a>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name:'CardContent',
        data:function(){
            return {}
        },
        props:['title','tasks']
    }
</script>