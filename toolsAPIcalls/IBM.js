import fs from 'fs';
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1.js';
import { IamAuthenticator } from 'ibm-watson/auth/index.js';

export const generateAudioIBM = async (text) => {
    var file = null;
    const textToSpeech = new TextToSpeechV1({
        authenticator: new IamAuthenticator({
            apikey: process.env.IBMAPIKEY,
        }),
        serviceUrl: process.env.IBMSERVICEURL,
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
            console.log('audio.wav written with a corrected wav header');
        })
        .catch(err => {
            console.log(err);
        });
    
    file = fs.readFileSync('./file/audio.wav');
    return file
}