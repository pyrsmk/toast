import ResourcesInterface from './ResourcesInterface'
import CssResource from './CssResource'
import JsResource from './JsResource'

/**
 * Toast facade
 */
class Toast implements ResourcesInterface {
    /**
     * Load several resources from URLs
     *
     * @param {Array<string>} urls
     * @return {Promise<string[]>}
     */
    public load(urls: string[]): Promise<string[]> {
        const that = this
        return Promise.all(
            urls.map(
                (url): Promise<string> | null => {
                    if (url.trim() === '') {
                        console.warn('[toast] an empty URL has been provided, please fix it to avoid this message')
                        return null
                    }
                    switch (url.split('.').pop()!.toLowerCase()) {
                        case 'css':
                            return that.css(url)
                        case 'js':
                            return that.js(url)
                        default:
                            console.warn(`[toast] unable to detect extension for '${url}' URL, please use toast.js() or toast.css() instead`)
                            return null
                    }
                }
            ).filter(
                (promise): boolean => promise !== null
            ) as Promise<string>[]
        )
    }

    /**
     * Load a CSS resource from an URL
     *
     * @param {string} url
     * @return {Promise<string>}
     */
    public css(url: string): Promise<string> {
        return (new CssResource()).load(url)
    }

    /**
     * Load a JS resource from an URL
     *
     * @param {string} url
     * @return {Promise<string>}
     */
    public js(url: string): Promise<string> {
        return (new JsResource()).load(url)
    }
}

export default new Toast()
