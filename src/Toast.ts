/**
 * Toast loader
 */
class Toast {
    /**
     * Load several resources from URLs
     *
     * @param {string[]} urls
     * @return {Promise<HTMLElement[]>}
     */
    public all(urls: string[]): Promise<HTMLElement[]> {
        return Promise.all(
            urls.map(
                (url): Promise<HTMLElement> => {
                    switch (url.split('.').pop()!.toLowerCase()) {
                        case 'css':
                            return this.css(url)
                        case 'js':
                            return this.js(url)
                        default:
                            return Promise.reject(
                                new Error(`Unable to detect extension of '${url}'`)
                            )
                    }
                }
            )
        )
    }

    /**
     * Load a CSS URL
     *
     * @param {string} url
     * @return {Promise<HTMLElement>}
     */
    public css(url: string): Promise<HTMLElement> {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = url
        document.querySelector('head')!.appendChild(link)
        return this.promise(link)
    }

    /**
     * Load a JS URL
     *
     * @param {string} url
     * @return {Promise<HTMLElement>}
     */
    public js(url: string): Promise<HTMLElement> {
        const script = document.createElement('script')
        script.src = url
        document.querySelector('head')!.appendChild(script)
        return this.promise(script)
    }

    /**
     * Create a promise based on an HTMLElement
     * @param {HTMLElement} element
     * @return {Promise<HTMLElement>}
     */
    private promise(element: HTMLElement): Promise<HTMLElement> {
        return new Promise((resolve, reject): void => {
            element.addEventListener('load', (): void => {
                resolve(element)
            })
            element.addEventListener('error', (): void => {
                reject()
            })
        })
    }
}

export default new Toast()
