interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParserMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
};
