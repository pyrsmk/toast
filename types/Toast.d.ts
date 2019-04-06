import ResourcesInterface from './ResourcesInterface';
declare class Toast implements ResourcesInterface {
    load(urls: Array<string>): Promise<string[]>;
    css(url: string): Promise<string>;
    js(url: string): Promise<string>;
}
export default Toast;
