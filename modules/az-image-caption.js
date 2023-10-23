import axios from "axios";
import { readFileSync } from "fs";

const AZURE_ENDPOINT = 'https://image-caption-test.cognitiveservices.azure.com/computervision/imageanalysis:analyze';  // e.g. "https://your_region.api.cognitive.microsoft.com/vision/v3.0/analyze"
const AZURE_KEY = process.env.AZURE_KEY;

const imageUrl = 'https://cdn.leonardo.ai/users/9db60283-a257-4d8c-93c7-fb4c35dfb08f/initImages/017fa7d0-66d1-4f23-823f-3f5471798d68.jpg'; // Remote URL to the image
const imagePath = 'images/source-TAI04447-resized.jpg'; // Local path to image

async function getCaption(url) {
    const headers = {
        'Ocp-Apim-Subscription-Key': AZURE_KEY,
        'Content-Type': 'application/json',
    };

    const params = {
        "api-version": "2023-02-01-preview",
        features: 'denseCaptions',
        language: "en",
        // "gender-neutral-caption": "True" // <-- if you don't want to know the gender
    };

    // const imageBuffer = readFileSync(imagePath);
    // console.log('imageBuffer :>> ', imageBuffer);

    try {
        const data = { url };
        // const response = await axios.post(AZURE_ENDPOINT, imageBuffer, { headers, params });
        // const response = await axios.post(AZURE_ENDPOINT, { headers, params, data });
        const response = await axios({ url: AZURE_ENDPOINT, headers, method: "POST", params, data });
        // console.log('response :>> ', response);
        const description = response.data.denseCaptionsResult;
        const captions = description.values;

        if (captions && captions.length > 0) {
            console.log('captions :>> ', captions.map(c => c.text));
            return captions[0].text;
        } else {
            return "No caption available.";
        }
    } catch (error) {
        console.error("Error captioning the image:", error.response.data);
        return null;
    }
}

getCaption(imageUrl);