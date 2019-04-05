import ResourcesInterface from './ResourcesInterface';
import CssResource from './CssResource';
import JsResource from './JsResource';

/**
 * Toast facade
 */
class Toast implements ResourcesInterface
{
    /**
     * Load several resources from URLs
     *
     * @param {Array<string>} urls
     * @return {Promise<string[]>}
     */
    load(urls: Array<string>): Promise<string[]>
    {
        return Promise.all(
            <Promise<string>[]> urls.map(
                url => {
                    switch (url.split('.').pop()) {
                        case 'css':
                            return this.css(url);
                        case 'js':
                            return this.js(url);
                    }
                }
            ).filter(
                promise => promise !== undefined
            )
        );
    }

    /**
     * Load a CSS resource from an URL
     *
     * @param {string} url
     * @return {Promise<string>}
     */
    css(url: string): Promise<string>
    {
        return (new CssResource()).load(url);
    }

    /**
     * Load a JS resource from an URL
     *
     * @param {string} url
     * @return {Promise<string>}
     */
    js(url: string): Promise<string>
    {
        return (new JsResource()).load(url);
    }
}

export default Toast;
