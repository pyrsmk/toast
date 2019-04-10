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
                (url): Promise<string> => {
                    if (url.trim() === '') {
                        console.error('[toast] loading aborted: an empty string has been provided')
                        return Promise.reject()
                    }
                    switch (url.split('.').pop()!.toLowerCase()) {
                        case 'css':
                            return that.css(url)
                        case 'js':
                            return that.js(url)
                        default:
                            console.error(`[toast] loading aborted: unable to detect extension for '${url}', please use toast.js() or toast.css() instead`)
                            return Promise.reject()
                    }
                }
            )
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
