import fs from 'fs';
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1.js';
import { IamAuthenticator } from 'ibm-watson/auth/index.js';

export const generateAudioIBM = async (text) => {
    var file = null;
    console.log("funfou "+text)
    const textToSpeech = new TextToSpeechV1({
        authenticator: new IamAuthenticator({
            apikey: 'SFG9-FPpzm7qnONKiQQxXKKh82mfxztURH0t85bqcodY',
        }),
        serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/8a8bc299-b41b-406a-931a-f0dc4080c092',
    });

    const params = {
        text,
        voice: 'pt-BR_IsabelaV3Voice', // Optional voice
        accept: 'audio/wav'
    };

    await textToSpeech
        .synthesize(params)
        .then(response => {
            const audio = response.result;
            return textToSpeech.repairWavHeaderStream(audio);
        })
        .then(repairedFile => {
            fs.writeFileSync('./file/audio.wav', repairedFile);
            console.log('file',file);
            console.log('audio.wav written with a corrected wav header');
        })
        .catch(err => {
            console.log(err);
        });
    
    file = fs.readFileSync('./file/audio.wav');
    return file

}
