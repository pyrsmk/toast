import FacadeInterface from './FacadeInterface';
declare class Toast implements FacadeInterface {
    private name;
    all(items: (string | HTMLLinkElement | HTMLScriptElement)[]): Promise<HTMLElement[]>;
    css(item: string | HTMLLinkElement): Promise<HTMLElement>;
    js(item: string | HTMLScriptElement): Promise<HTMLElement>;
    private resource;
}
declare const _default: Toast;
export default _default;
