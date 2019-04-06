import ResourceInterface from './ResourceInterface';
declare class CssResource implements ResourceInterface {
    load(url: string): Promise<string>;
}
export default CssResource;
