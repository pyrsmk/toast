/**
 * Resources interface
 */
export default interface ResourcesInterface {
    /**
     * Load several resources from URLs
     *
     * @param {Array<string>} urls
     * @return {Promise<string[]>}
     */
    load(urls: string[]): Promise<string[]>;
}

