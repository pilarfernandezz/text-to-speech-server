import sdk from"microsoft-cognitiveservices-speech-sdk";

export const generateAudioMS = async (text) => {
    var subscriptionKey = process.env.MICROSOFTAPIKEY;
    var serviceRegion = process.env.MICROSOFTSERVICEREGION;
    var filename = "audio.wav";

    var audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

    var synthesizer =  new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    const ssml = '<speak version="1.0" xmlns="https://www.w3.org/2001/10/synthesis" xml:lang="pt-BR"><voice name="pt-BR-FranciscaNeural">'+ text +'</voice></speak>'

    let writeText = await (() => {
        return new Promise((resolve, reject) => {
            synthesizer.speakSsmlAsync(
                ssml,
                result => {
                    if (result.errorDetails) {
                        reject(result.errorDetails);
                    } else {
                        resolve(result.privAudioData);
                    }
                    synthesizer.close();
                },
                error => {
                    synthesizer.close();
            });
        });
    })();    
    try{
        return writeText
    } catch(e) {
        console.log(e)
    }
};