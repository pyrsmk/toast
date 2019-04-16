/**
 * Facade interface
 */
export default interface FacadeInterface {
    /**
     * Load several resources from URLs
     *
     * @param {(string|HTMLLinkElement|HTMLScriptElement)[]} items
     * @return {Promise<HTMLElement[]>}
     */
    all(items: (string|HTMLLinkElement|HTMLScriptElement)[]): Promise<HTMLElement[]>;

    /**
     * Load a CSS URL or a LINK node
     *
     * @param {string|HTMLLinkElement} item
     * @return {Promise<HTMLElement>}
     */
    css(item: string|HTMLLinkElement): Promise<HTMLElement>;

    /**
     * Load a JS URL or a SCRIPT node
     *
     * @param {string|HTMLScriptElement} item
     * @return {Promise<HTMLElement>}
     */
    js(item: string|HTMLScriptElement): Promise<HTMLElement>;
}
