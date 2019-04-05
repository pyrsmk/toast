/**
 * Resource interface
 */
interface ResourceInterface
{
    /**
     * Load a resource from an URL
     *
     * @param {string} url
     * @return {Promise<string>}
     */
    load(url: string): Promise<string>;
}

export default ResourceInterface;
