export default interface ResourceInterface {
    load(url: string): Promise<string>;
}
