const prefixProtocol = (url: string) => !url.startsWith('http')
  ? `https:${url}`
  : url;

export default prefixProtocol
