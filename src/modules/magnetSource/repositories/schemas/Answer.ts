interface ILinkData {
  url: string,
  text: string,
  type: string,
}

export default interface Answer {

  links: ILinkData[],
  name: string,
  size?: string,
  seeds?: number,
  leech?: number,
  engine_url: string,
  desc_link: string,
  thumb: string,
}
