import FacadeInterface from './FacadeInterface'
import ResourceInterface from './ResourceInterface'
import CssResource from './CssResource'
import JsResource from './JsResource'

/**
 * Toast facade
 */
class Toast implements FacadeInterface {
    /**
     * @var {string} name
     */
    private name: string = '[toast]'

    /**
     * Load several resources from URLs
     *
     * @param {(string|HTMLLinkElement|HTMLScriptElement)[]} items
     * @return {Promise<HTMLElement[]>}
     */
    public all(items: (string|HTMLLinkElement|HTMLScriptElement)[]): Promise<HTMLElement[]> {
        const that = this
        return Promise.all(
            items.map(
                (item): Promise<HTMLElement> => {
                    if (typeof item === 'string') {
                        switch (item.split('.').pop()!.toLowerCase()) {
                            case 'css':
                                return that.css(item)
                            case 'js':
                                return that.js(item)
                            default:
                                console.error(`${this.name} unable to detect extension of '${item}'`)
                                return Promise.reject()
                        }
                    } else if (item instanceof HTMLLinkElement) {
                        return that.css(item)
                    } else if (item instanceof HTMLScriptElement) {
                        return that.js(item)
                    }
                    console.error(`${this.name} unexpected error`)
                    return Promise.reject()
                }
            )
        )
    }

    /**
     * Load a CSS URL or a LINK node
     *
     * @param {string|HTMLLinkElement} item
     * @return {Promise<HTMLElement>}
     */
    public css(item: string|HTMLLinkElement): Promise<HTMLElement> {
        return this.resource(new CssResource(), item)
    }

    /**
     * Load a JS URL or a SCRIPT node
     *
     * @param {string|HTMLScriptElement} item
     * @return {Promise<HTMLElement>}
     */
    public js(item: string|HTMLScriptElement): Promise<HTMLElement> {
        return this.resource(new JsResource(), item)
    }

    /**
     * Load an URL or listen to a node
     *
     * @param {ResourceInterface} resource
     * @param {string|HTMLElement} item
     * @return {Promise<HTMLElement>}
     */
    private resource(resource: ResourceInterface, item: string|HTMLElement): Promise<HTMLElement> {
        if (typeof item === 'string') {
            return resource.load(item)
        }
        return resource.listen(item)
    }
}

export default new Toast()
