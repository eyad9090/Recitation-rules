$(document).ready(function(){
    $(".ahkam .card").click(function(){
        var elmId = $(this).attr("name");
        var x='[name='+elmId+'] h4';
        var value=$(x).text();
        //redirect
        sessionStorage.setItem("hkm", elmId);
        sessionStorage.setItem("hkm_name", value);
        serverurl=elmId+".html";
        $(location).attr('href', serverurl);
    });
});