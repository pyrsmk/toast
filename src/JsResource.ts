import ResourceInterface from './ResourceInterface'

// Needed for a fix for IE10
declare global {
    interface HTMLScriptElement extends HTMLElement {
        onreadystatechange: Function;
        readyState: string;
    }
}

/**
 * JS resource
 */
class JsResource implements ResourceInterface {
    /**
     * Load a resource from an URL
     *
     * @param {string} url
     * @return {Promise<HTMLScriptElement>}
     */
    public load(url: string): Promise<HTMLScriptElement> {
        const script = document.createElement('script')
        script.src = url
        document.querySelector('head')!.appendChild(script)
        return this.promise(script)
    }

    /**
     * Listen to the loading state of a node
     *
     * @param {HTMLScriptElement} node
     * @return {Promise<HTMLScriptElement>}
     */
    public listen(node: HTMLScriptElement): Promise<HTMLScriptElement> {
        return this.load(node.src)
    }

    /**
     * Create a new promise from an HTMLScriptElement
     *
     * @param {HTMLScriptElement} node
     * @return {Promise<HTMLScriptElement>}
     */
    private promise(node: HTMLScriptElement): Promise<HTMLScriptElement> {
        const script = node
        return new Promise(
            (resolve, reject): void => {
                script.addEventListener('load', (): void => resolve(script))
                script.addEventListener('error', (): void => reject())
                // Fix for IE10 which does not call onload()
                // when attaching to an existent node
                script.addEventListener('readystatechange', (): void => {
                    if (script.readyState === 'complete') {
                        resolve(script)
                    }
                })
            }
        )
    }
}

export default JsResource
