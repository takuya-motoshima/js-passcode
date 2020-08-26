import './styles/passcode.css';
declare class Passcode extends HTMLElement {
    private passcode;
    private resolve;
    /**
     * Called every time the element is inserted into the DOM.
     *
     * @return {void}
     */
    protected connectedCallback(): void;
    /**
     * Define elements
     *
     * @return {this}
     */
    static define(): any;
    /**
     * Generate elements
     *
     * @return {this}
     */
    static createElement(): any;
    /**
     * Authenticate with passcode
     *
     * @param {string}            passcode
     * @param {(boolean) => void} resolve
     */
    authenticate(passcode: string, resolve: (success: boolean) => void): void;
}
export default Passcode;
