import ResourceInterface from './ResourceInterface';
declare global {
    interface HTMLScriptElement extends HTMLElement {
        onreadystatechange: Function;
        readyState: string;
    }
}
declare class JsResource implements ResourceInterface {
    load(url: string): Promise<HTMLScriptElement>;
    listen(node: HTMLScriptElement): Promise<HTMLScriptElement>;
    private promise;
}
export default JsResource;
