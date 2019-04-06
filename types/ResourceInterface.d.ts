interface ResourceInterface {
    load(url: string): Promise<string>;
}
export default ResourceInterface;
