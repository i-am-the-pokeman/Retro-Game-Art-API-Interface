const axios = require('axios');
const fs = require('fs');
const path = require('path');

export class ImageFetchService {
  public static async GetImageBufferFromImageUrl(url: string) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, "utf-8");
    return buffer;
  }

  public static async GetBufferFromAssetFileName(assetFileName: string) {
    const fileRelativePath = path.join(__dirname, '..', '..', '..', 'assets', assetFileName)
    const buffer = fs.readFileSync(fileRelativePath);
    return buffer;
  }
}