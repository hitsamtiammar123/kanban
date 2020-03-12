<template>
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand">Kanban Hehe</a>
            <form class="form-inline">
                <button class="btn btn-outline-primary my-2 my-sm-0" v-if="$parent.isLogin" @click="$emit('change-view','Profile')"  type="button">Profile</button>
                <button class="btn btn-outline-success my-2 my-sm-0 ml-2" v-if="$parent.isLogin" @click="$emit('change-view','Kanban')"  type="button">Home</button>
                <button class="btn btn-outline-danger my-2 my-sm-0 ml-2" v-if="$parent.isLogin" @click="$emit('logout')" type="button">Logout</button>
            </form>
        </nav>
</template>

<script>
    export default {
        name:'Navbar',
        methods:{}
    }
</script>