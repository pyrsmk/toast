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
                node.onerror = (event): void => reject(event)
                document.querySelector('head')!.appendChild(node)
                const verify = setInterval(
                    (): void => {
                        if ('sheet' in node) {
                            clearInterval(verify)
                            resolve()
                        }
                    },
                    50
                )
            }
        )
    }
}

export default CssResource
