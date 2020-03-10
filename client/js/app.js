(function(){
    window.TOKEN=localStorage.getItem('token');

    var $app=$('#app');
    var pageCache={};

    function onPageLoaded(page){
        return function(data){
            $app.html(data);
            pageCache[page]=data;
        }
    }

    function onPageFail(jqXHR,status,res){
        console.log({jqXHR,status,res});
    }

    function loadPage(page){
        if(pageCache[page]){
            $app.html(pageCache[page])
        }
        else{
            var pageURL='/partial/'+page+'.html';
            $.get(pageURL).done(onPageLoaded(page)).fail(onPageFail)
        }
    }

    function init(){
        loadPage('kanban');
    }

    init();


})();