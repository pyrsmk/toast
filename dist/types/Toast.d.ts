import ResourcesInterface from './ResourcesInterface';
declare class Toast implements ResourcesInterface {
    load(urls: string[]): Promise<string[]>;
    css(url: string): Promise<string>;
    js(url: string): Promise<string>;
}
declare const _default: Toast;
export default _default;
