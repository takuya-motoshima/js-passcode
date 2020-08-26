# js-passcode

This is a custom element V1-based Passcode authentication.

![passcode.jpg](https://raw.githubusercontent.com/takuya-motoshima/js-passcode/master/screencap/passcode.jpg)

## Examples

There are some examples in "./examples" in this package.Here is the first one to get you started.

## Installation

```sh
npm install js-passcode;
```

## Usage

Add passcode element to HTML.

```html
<js-passcode id="passcode"></js-passcode>
```

Perform passcode authentication with JS.

```js
import 'js-passcode';

// Correct passcode
const correctPasscode = '1234';

// Passcode authentication
document.querySelector('#passcode').authenticate(correctPasscode, success => {
  // If the passcode is correct, the callback function argument returns true.
  if (success) alert('Authenticated Successfully');
  else alert('Authentication Failed');
});
```

## License

[MIT licensed](./LICENSE.txt)