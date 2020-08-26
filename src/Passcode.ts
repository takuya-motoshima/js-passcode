import './styles/passcode.css';

class Passcode extends HTMLElement {

  private passcode: string = '1234';
  private resolve!: (success: boolean) => void;

  /**
   * Called every time the element is inserted into the DOM.
   * 
   * @return {void}
   */
  protected connectedCallback(): void {
    this.classList.add('passcode');
    this.innerHTML = `
      <div class="passcode-dots">
        <div class="passcode-dot"></div>
        <div class="passcode-dot"></div>
        <div class="passcode-dot"></div>
        <div class="passcode-dot"></div>
      </div>
      <p>Enter the password</p>
      <div class="passcode-numbers">
        <div class="passcode-number"><span>1</span></div>
        <div class="passcode-number"><span>2</span></div>
        <div class="passcode-number"><span>3</span></div>
        <div class="passcode-number"><span>4</span></div>
        <div class="passcode-number"><span>5</span></div>
        <div class="passcode-number"><span>6</span></div>
        <div class="passcode-number"><span>7</span></div>
        <div class="passcode-number"><span>8</span></div>
        <div class="passcode-number"><span>9</span></div>
        <div class="passcode-number"><span>0</span></div>
      </div>`;
    let input = '';
    const dots = Array.from(this.querySelectorAll('.passcode-dot'));
    const numbers = Array.from(this.querySelectorAll('.passcode-number'));
    for (let number of numbers) {
      number.addEventListener('click', async event => {
        if (dots.length === input.length) return;
        number!.classList.add('passcode-number-grow');
        const target = event.currentTarget as HTMLElement;
        input += target.querySelector('span')!.textContent;
        dots[input.length - 1].classList.add('passcode-dot-active');
        if (input.length >= 4) {
          const success = this.passcode === input;
          if (success) {
            dots.forEach(dot => dot.classList.add('passcode-valid'));
            document.body.classList.add('passcode-valid');
          } else {
            dots.forEach(dot => dot.classList.add('passcode-invalid'));
            document.body.classList.add('passcode-invalid');
          }
          setTimeout(() => {
            dots.forEach(dot => dot.classList.remove('passcode-dot-active', 'passcode-invalid', 'passcode-valid'));
            input = '';
            this.resolve(success);
          }, 900);
          setTimeout(() => document.body.classList.remove('passcode-invalid', 'passcode-valid'), 1000);
        }
        setTimeout(() => number.classList.remove('passcode-number-grow'), 1000);
      });
    }
  }

  /**
   * Define elements
   *
   * @return {this}
   */
  public static define(): any {
    if (window.customElements.get('js-passcode')) return this;
    window.customElements.define('js-passcode', this);
    return this;
  }

  /**
   * Generate elements
   *
   * @return {this}
   */
  public static createElement(): any {
    this.define();
    return new (window.customElements.get('js-passcode'))()
  }

  /**
   * Authenticate with passcode
   *
   * @param {string}            passcode
   * @param {(boolean) => void} resolve
   */
  public authenticate(passcode: string, resolve: (success: boolean) => void): void {
    this.passcode = passcode;
    this.resolve = resolve;
  }
}

Passcode.define();
export default Passcode;