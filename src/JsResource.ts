import ResourceInterface from './ResourceInterface'

/**
 * JS resource
 */
class JsResource implements ResourceInterface {
    /**
     * Load a resource from an URL
     *
     * @param {string} url
     * @return {Promise<string>}
     */
    public load(url: string): Promise<string> {
        return new Promise(
            (resolve): void => {
                const node = document.createElement('script')
                node.src = url
                document.querySelector('head')!.appendChild(node)
                node.onload = (): void => resolve()
            },
        )
    }
}

export default JsResource
