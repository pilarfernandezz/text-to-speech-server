import { generateAudioIBM } from './toolsAPIcalls/IBM.js';
import { generateAudioMS } from './toolsAPIcalls/Microsoft.js';
import { generateAudioGoogle } from './toolsAPIcalls/Google.js';
import { generateAudioAWS } from './toolsAPIcalls/AWS.js';

const create = async (text, tool) => {
    console.log(text);
    console.log(tool);
    var file;
    if(tool === 'IBM'){
        file = await generateAudioIBM(text);
    }
    else if(tool === 'Microsoft'){
        file = await generateAudioMS(text);
    }
    else if(tool === 'Google'){
        file = await generateAudioGoogle(text);
    }
    else if(tool === 'AWS'){
        file = await generateAudioAWS(text);
    }


    console.log('file',file)
    console.log(typeof file)
    return file;
};

export default { create };