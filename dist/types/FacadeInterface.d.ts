export default interface FacadeInterface {
    all(urls: string[]): Promise<string[]>;
    css(url: string): Promise<string>;
    js(url: string): Promise<string>;
}
