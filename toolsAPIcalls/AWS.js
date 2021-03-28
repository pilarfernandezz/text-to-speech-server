import AWS from 'aws-sdk';

const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
})

export const generateAudioAWS = async (text) => {
    let params = {
    'Text': text,
    'OutputFormat': 'mp3',
    'VoiceId': 'Vitoria'
    }

    let writeText = await (() => {
        return new Promise((resolve, reject) => {
            Polly.synthesizeSpeech(params, (err, data) => {
                if (err) {
                    reject(err);
                    console.log(err.code)
                } else if (data) {
                    resolve(data.AudioStream)
                }
            })
        });
    })();    
    try{
        return writeText
    } catch(e) {
        console.log(e)
    }
}
