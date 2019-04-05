/**
 * Resources interface
 */
interface ResourcesInterface
{
    /**
     * Load several resources from URLs
     *
     * @param {Array<string>} urls
     * @return {Promise<string[]>}
     */
    load(urls: Array<string>): Promise<string[]>;
}

export default ResourcesInterface;
