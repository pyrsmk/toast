export default interface ResourceInterface {
    load(url: string): Promise<HTMLElement>;
    listen(node: HTMLElement): Promise<HTMLElement>;
}
