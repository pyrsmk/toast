export default interface FacadeInterface {
    all(items: (string | HTMLLinkElement | HTMLScriptElement)[]): Promise<HTMLElement[]>;
    css(item: string | HTMLLinkElement): Promise<HTMLElement>;
    js(item: string | HTMLScriptElement): Promise<HTMLElement>;
}
