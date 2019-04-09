export default interface ResourcesInterface {
    load(urls: string[]): Promise<string[]>;
}
