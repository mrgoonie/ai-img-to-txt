import { pipeline } from "@xenova/transformers";
import { HfInference } from "@huggingface/inference";
import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

const hgInference = new HfInference(process.env.HUGGINGFACE_ACCESS_TOKEN);

async function textLabel(input) {
	let classifier = await pipeline("sentiment-analysis", "Xenova/bert-base-multilingual-uncased-sentiment");
	let output = await classifier(input);
	console.log("output :>> ", output);
	return output;
}

async function captionImage(url) {
	// Salesforce/blip-image-captioning-large
	let captioner = await pipeline('image-to-text', 'Xenova/vit-gpt2-image-captioning');
	let output = await captioner(url, { topk: 3 });
	console.log('output :>> ', output);
	return output;
}

async function imageClassification(url) {
	let classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
	let output = await classifier(url, { topk: 0 });
	console.log('output :>> ', output);
	return output;
}

async function hfImageCaption(url) {
	const output = await hgInference.imageToText({
		data: await (await fetch(url ?? 'https://picsum.photos/300/300')).blob(),
		model: 'Salesforce/blip-image-captioning-base',
	});
	console.log('output :>> ', output);
	return output;
}

// textLabel("I love transformers!");
// captionImage("https://cdn.leonardo.ai/users/9db60283-a257-4d8c-93c7-fb4c35dfb08f/initImages/017fa7d0-66d1-4f23-823f-3f5471798d68.jpg")
// imageClassification("https://cdn.leonardo.ai/users/9db60283-a257-4d8c-93c7-fb4c35dfb08f/initImages/017fa7d0-66d1-4f23-823f-3f5471798d68.jpg")

// hugging face
hfImageCaption();
