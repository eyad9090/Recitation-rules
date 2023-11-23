$(document).ready(function(){
    $(".ahkam .card").click(function(){
        var elmId = $(this).attr("name");

        var name_aya='[name='+elmId+'] h4';
        var value=$(name_aya).text();

        var number_aya='[name='+elmId+'] p';
        var value2=$(number_aya).text();
        //redirect
        sessionStorage.setItem("aya", elmId);
        sessionStorage.setItem("aya_name", value);
        sessionStorage.setItem("aya_number", value2);
        //paths
        hkm=sessionStorage.getItem("hkm");
        aya=sessionStorage.getItem("aya");
        path="D:/web/";


        pp_model="D:/web/deep_speech_models/output.pb";
        scorer_model="D:/web/deep_speech_models/quran.scorer";
        root=path;
        rule_path=path+hkm+"/model.h5";
        recorded=path+"records/record.wav";
        denoised_record=path+"records/denoised_record.wav";
        output_json=path+hkm+"/"+aya+"/output.json";
        meta_data=path+hkm+"/"+aya+"/meta_data.json";
        meta_data2=path+hkm+"/"+aya+"/meta_data2.json";
        hkm_record=path+"records/result.wav";

        sessionStorage.setItem("pp_model", pp_model);
        sessionStorage.setItem("scorer_model", scorer_model);
        sessionStorage.setItem("root", root);
        sessionStorage.setItem("rule_path", rule_path);
        sessionStorage.setItem("recorded", recorded);
        sessionStorage.setItem("denoised_record", denoised_record);
        sessionStorage.setItem("output_json", output_json);
        sessionStorage.setItem("meta_data", meta_data);
        sessionStorage.setItem("meta_data2", meta_data2);
        sessionStorage.setItem("hkm_record", hkm_record);


        console.log(sessionStorage.getItem("hkm"));
        console.log(sessionStorage.getItem("aya"));
        console.log(sessionStorage.getItem("pp_model"));
        console.log(sessionStorage.getItem("scorer_model"));
        console.log(sessionStorage.getItem("root"));
        console.log(sessionStorage.getItem("rule_path"));
        console.log(sessionStorage.getItem("recorded"));
        console.log(sessionStorage.getItem("denoised_record"));
        console.log(sessionStorage.getItem("output_json"));
        console.log(sessionStorage.getItem("meta_data"));
        console.log(sessionStorage.getItem("meta_data2"));
        console.log(sessionStorage.getItem("hkm_record"));
        console.log(sessionStorage.getItem("hkm_name"));
        console.log(sessionStorage.getItem("aya_name"));
        
        serverurl="recording.html";
        $(location).attr('href', serverurl);
    });
});