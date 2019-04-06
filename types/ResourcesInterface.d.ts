interface ResourcesInterface {
    load(urls: Array<string>): Promise<string[]>;
}
export default ResourcesInterface;
