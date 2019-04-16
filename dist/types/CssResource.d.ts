import ResourceInterface from './ResourceInterface';
declare class CssResource implements ResourceInterface {
    load(url: string): Promise<HTMLLinkElement>;
    listen(node: HTMLLinkElement): Promise<HTMLLinkElement>;
    private promise;
}
export default CssResource;
