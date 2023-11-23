// import { getBlob } from "@firebase/storage"
// import type { StorageReference } from "firebase/storage"

// collect DOMs
const display = document.querySelector('.display')
const controllerWrapper = document.querySelector('.controllers')

const State = ['Initial', 'Record', 'Download']
let stateIndex = 0
let mediaRecorder, chunks = [], audioURL = ''

// mediaRecorder setup for audio
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
    console.log('mediaDevices supported..')

    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        mediaRecorder = new MediaRecorder(stream)

        mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data)
        }

        mediaRecorder.onstop = () => {
            x=4.0;
            if(sessionStorage.getItem("hkm")==="hkm2"
                ||sessionStorage.getItem("hkm")=="hkm3"
                ||sessionStorage.getItem("hkm")=="hkm4")
            {
                x=3.0;   
            }
            const blob = new Blob(chunks, {'type': 'audio/wav; codecs=opus'})
            serverUrl="http://localhost:2000/records/save"
            var myObj = { 
                "pb_model":sessionStorage.getItem("pp_model"),
                "scorer_model":sessionStorage.getItem("scorer_model"),
                "root":sessionStorage.getItem("root"),
                "rule_path":sessionStorage.getItem("rule_path"),
                "record":sessionStorage.getItem("recorded"),
                "denoised_record":sessionStorage.getItem("denoised_record"),
                "output_json":sessionStorage.getItem("output_json"),
                "meta_data":sessionStorage.getItem("meta_data"),
                "hkm_record":sessionStorage.getItem("hkm_record"),
                "model_x":x
            }; 
            var data = JSON.stringify(myObj); 
 
            $.ajax({
                url: serverUrl,
                type: 'POST',
                contentType: 'application/json;charset=UTF-8',
                data:data,
                success: function (response) {
                    console.log(response)
                },
                error: function (response) {
                    console.log(response)
                }
            });    

            $.ajax({
                url: serverUrl,
                type: 'POST',
                contentType: 'application/json;charset=UTF-8',
                data:blob,
                processData: false,
                contentType: false,
                beforeSend: function(){
                    $("#loader").show();
                    $(".recorded_audio").hide();
                },
                success: function (response) {
                    console.log(response);
                    $("#loader").hide();
                    if(response==="0")
                    {
                        swal("تم نطق الحكم بشكل خاطئ ", "", "error");
                        $(".recorded_audio").show();
                    }
                    else
                    {
                        swal("تم نطق الحكم بشكل صحيح ", "", "success");
                    }
                },
                error: function (response) {
                    console.log(response)
                    swal("تأكد من انك قمت بالسماح للميكروفون خاصتك", "", "error");
                },
            }); 
            chunks = []
            audioURL = window.URL.createObjectURL(blob)
            document.querySelector('.recorded_audio').src = audioURL
        }
    }).catch(error => {
        console.log('Following error has occured : ',error)
    })
}else{
    stateIndex = ''
    application(stateIndex)
}

const clearDisplay = () => {
    display.textContent = ''
}

const clearControls = () => {
    controllerWrapper.textContent = ''
}

const record = () => {
    stateIndex = 1
    mediaRecorder.start()
    application(stateIndex)
}

const stopRecording = () => {
    stateIndex = 2
    mediaRecorder.stop()
    application(stateIndex)
}

const downloadAudio = () => {
    const downloadLink = document.createElement('a')
    downloadLink.href = audioURL
    downloadLink.setAttribute('download', 'audio')
    downloadLink.click()
}

const addButton = (id, funString, text) => {
    const btn = document.createElement('button')
    btn.id = id
    btn.setAttribute('onclick', funString)
    btn.textContent = text
    controllerWrapper.append(btn)
}

const addMessage = (text) => {
    const msg = document.createElement('p')
    msg.textContent = text
    display.append(msg)
}

const addAudio = () => {
    const audio = document.createElement('audio')
    audio.classList.add('recorded_audio');
    audio.controls = true
    audio.src = audioURL
    display.append(audio)
}

const application = (index) => {
    switch (State[index]) {
        case 'Initial':
            clearDisplay()
            clearControls()

            addButton('record', 'record()', 'Start Recording')
            break;

        case 'Record':
            clearDisplay()
            clearControls()

            addMessage('التسجيل...')
            addButton('stop', 'stopRecording()', 'Stop Recording')
            break

        case 'Download':
            clearControls()
            clearDisplay()

            addAudio()
            addButton('record', 'record()', 'Record Again')
            break

        default:
            clearControls()
            clearDisplay()

            addMessage('Your browser does not support mediaDevices')
            break;
    }

}





application(stateIndex)// collect DOMs
