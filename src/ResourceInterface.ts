/**
 * Resource interface
 */
export default interface ResourceInterface {
    /**
     * Load a resource from an URL
     *
     * @param {string} url
     * @return {Promise<HTMLElement>}
     */
    load(url: string): Promise<HTMLElement>;

    /**
     * Listen to the loading state of a node
     *
     * @param {HTMLElement} node
     * @return {Promise<HTMLElement>}
     */
    listen(node: HTMLElement): Promise<HTMLElement>;
}
