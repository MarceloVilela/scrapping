const atob = (b64Encoded: string) => Buffer.from(b64Encoded, 'base64').toString();

export default atob;
