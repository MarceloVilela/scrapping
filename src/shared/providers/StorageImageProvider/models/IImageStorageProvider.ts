export interface StoreImageParams {
  base64: string;
  fileName: string;
}

export default interface IImageStorageProvider {
  storeImage(data: StoreImageParams): Promise<string>;
}
