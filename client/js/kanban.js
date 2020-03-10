(function(){

    var $cardTemplete=$('#kanban-card-template');
    var card_template=$cardTemplete.html();

    Vue.component('card-content',{
        template:card_template,
        data:function(){
            return {}
        },
        props:['title','tasks']
    });

    new Vue({
        el:'#app',
        data:{
            currentView:'kanban'
        },
        methods:{
            loadView:function(view){
                this.currentView=view;
            }
        }
    });
    

})();

