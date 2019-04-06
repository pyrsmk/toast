import ResourceInterface from './ResourceInterface';
declare class JsResource implements ResourceInterface {
    load(url: string): Promise<string>;
}
export default JsResource;
