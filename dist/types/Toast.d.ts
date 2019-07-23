declare class Toast {
    all(urls: string[]): Promise<HTMLElement[]>;
    css(url: string): Promise<HTMLElement>;
    js(url: string): Promise<HTMLElement>;
    private promise;
}
declare const _default: Toast;
export default _default;
