
interface ITemplateVariable{
    [key: string]: string | number;
}

interface IParseMailTemplateDTO{
    file: string;
    variables: ITemplateVariable;
}

export default IParseMailTemplateDTO;