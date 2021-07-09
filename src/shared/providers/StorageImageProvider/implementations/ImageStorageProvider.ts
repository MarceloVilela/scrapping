import imgur from 'imgur';
import IImageStorageProvider, { StoreImageParams } from '../models/IImageStorageProvider';

const today = new Date();
const date_time = today.toISOString().substring(0, 19).replace(/:/g, '-').replace('T', '_');

imgur.setCredentials(process.env.IMGUR_USER, process.env.IMGUR_PASS, process.env.IMGUR_CLIENT_ID);

class ImageStorageProvider implements IImageStorageProvider {
  async storeImage({ base64, fileName }: StoreImageParams): Promise<string> {
    const response = await imgur.uploadBase64(
      base64,
      '',
      `${fileName}_${date_time}_${process.env.USER}`
    );

    if (response.link) {
      console.log(`The image has been saved! | ${fileName} => ${response.link} \n`);
    }
    else {
      console.log('Error on save image!\n');
    }

    return String(response.link);
  }

}

export default ImageStorageProvider;
