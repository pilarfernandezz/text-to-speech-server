import textToSpeech from '@google-cloud/text-to-speech';
import {Storage} from '@google-cloud/storage';
import fs from 'fs';
import util from 'util';

export const generateAudioGoogle = async (text) => {
    const client = new textToSpeech.TextToSpeechClient();
    const request = {
        input: { text: text },
        voice: { languageCode: 'pt-BR', 'name': 'pt-BR-Standard-A', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await client.synthesizeSpeech(request);
 
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('./file/output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');

    const file = fs.readFileSync('./file/output.mp3');
    return file
}
