# ai-img-to-txt

Use computer vision to analyze an input image, then write captions.

## Install

To install dependencies:

```bash
npm install
```

## API KEY

- HuggingFace Access Token, get it from: https://huggingface.co/settings/tokens
- Azure Cognitive Vision API, get it from: https://portal.azure.com/

## To run:

- For HuggingFace & Transformer.js:

    ```bash
    npm run index.js
    ```

- For Azure Cognitive Vision API:

    ```
    npm run modules/az-image-caption.js
    ```

## Credits

- @mrgoonie <hi@mrgoon.info>