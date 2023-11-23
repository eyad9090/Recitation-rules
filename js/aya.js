$(document).ready(function () {
    $(".recorded_audio").hide();
    $("#loader").hide();
    //get aya text
    data=sessionStorage.getItem("meta_data2");
    serverUrl="http://localhost:2000/read_file"
    $.ajax({
        url: serverUrl,
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data:data,
        processData: false,
        contentType: false,
        success: function (response) {
            $("#aya").html(response)
        },
        error: function (response) {
            console.log(response)
        }
    });
    //records
    hkm=sessionStorage.getItem("hkm");
    aya=sessionStorage.getItem("aya");
    path=hkm+"/"+aya+"/records/record1.mp3";
    path2=hkm+"/"+aya+"/records/record2.mp3";
    path3=hkm+"/"+aya+"/records/record3.mp3";

    path4=hkm+"/"+aya+"/records/record4.wav";
    path5=hkm+"/"+aya+"/records/record5.wav";
    path6=hkm+"/"+aya+"/records/record6.wav";
    $(".recorded-sec #audio1 source").attr("src",path);
    $(".recorded-sec #audio1")[0].load();

    $(".recorded-sec #audio2 source").attr("src",path2);
    $(".recorded-sec #audio2")[0].load();


    $(".recorded-sec #audio3 source").attr("src",path3);
    $(".recorded-sec #audio3")[0].load();

    $(".recorded-sec #audio4 source").attr("src",path4);
    $(".recorded-sec #audio4")[0].load();

    $(".recorded-sec #audio5 source").attr("src",path5);
    $(".recorded-sec #audio5")[0].load();

    $(".recorded-sec #audio6 source").attr("src",path6);
    $(".recorded-sec #audio6")[0].load();

    //
    $("#hkm-name").html("الحكم: "+sessionStorage.getItem("hkm_name"));
    $("#aya-name").html(sessionStorage.getItem("aya_name"));
    $("#aya-number").html(sessionStorage.getItem("aya_number"));
});