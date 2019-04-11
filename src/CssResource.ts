import ResourceInterface from './ResourceInterface'

/**
 * CSS resource
 */
class CssResource implements ResourceInterface {
    /**
     * Load a resource from an URL
     *
     * @param {string} url
     * @return {Promise<string>}
     */
    public load(url: string): Promise<string> {
        return new Promise(
            (resolve, reject): void => {
                const node = document.createElement('link')
                node.rel = 'stylesheet'
                node.href = url
                node.onload = (): void => resolve()
                node.onerror = (): void => reject()
                document.querySelector('head')!.appendChild(node)
            }
        )
    }
}

export default CssResource
