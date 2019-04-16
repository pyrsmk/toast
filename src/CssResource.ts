import ResourceInterface from './ResourceInterface'

/**
 * CSS resource
 */
class CssResource implements ResourceInterface {
    /**
     * Load a resource from an URL
     *
     * @param {string} url
     * @return {Promise<HTMLLinkElement>}
     */
    public load(url: string): Promise<HTMLLinkElement> {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = url
        document.querySelector('head')!.appendChild(link)
        return this.promise(link)
    }

    /**
     * Listen to the loading state of a node
     *
     * @param {HTMLLinkElement} node
     * @return {Promise<HTMLLinkElement>}
     */
    public listen(node: HTMLLinkElement): Promise<HTMLLinkElement> {
        return this.load(node.href)
    }

    /**
     * Create a new promise from an HTMLLinkElement
     *
     * @param {HTMLLinkElement} node
     * @return {Promise<HTMLLinkElement>}
     */
    private promise(node: HTMLLinkElement): Promise<HTMLLinkElement> {
        const link = node
        return new Promise(
            (resolve, reject): void => {
                link.onload = (): void => resolve(link)
                link.onerror = (): void => reject()
            }
        )
    }
}

export default CssResource
