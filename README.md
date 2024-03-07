# jklm.fun BombParty Cheat Script

This is a cheat script for https://jklm.fun BombParty game<br />
Directly pasting the script in the console wont work, read the usage guide below

## Usage Guide:

-   Steps

1. Open devtools inspect
2. Open the console tab
3. Do one of the following options:
    - Set the Javascript context to bombparty/
    - Using the manual inspect element selection tool, select an element in the center of the game screen
4. Paste the [script](index.js) in the console tab and hit enter

-   Setting javascript context to bombparty/<br />
    <img src="./docs/screenshot-1.png" width="300" /> <img src="./docs/screenshot-2.png" width="300" />

## Options Guide:

-   `autotype` (boolean): when set true, the word will be automatically typed in your game input, you just have to hit enter
-   `selfOnly` (boolean): when set true, words will be logged in console only when its your own turn
-   `lang` (string): you can choose from the supported languages below:
    -   en: English
    -   es: Spanish
    -   it: Italian
    -   fr: French
    -   de: German
-   `lengths` (array): specifies the length of the words that will be attempted. Increase lengths for more difficult words. Order of the lengths specifies length priority.
-   `instant` (boolean): specifies typing mode; whether the word should be instantly pasted or slowly typed
-   `pause` (number): typing pause between letters (in milliseconds) (only effective if "instant" option is set to false)
-   `chunk` (number): specifies the number of words to fetch from the words library on each attempt (keep default)
-   `attempts` (number): specifies the number of attemps (keep default)

## Quick Usage

You can paste the script below to run the script quickly with the default options instead of having to copy paste the whole script code. Although, you still have to do the first three steps mentioned in [usage guide](#usage-guide)

```js
fetch(
    "https://raw.githubusercontent.com/SwordaxSy/jklm-bombparty-cheat/main/index.js"
)
    .then((res) => res.text())
    .then((data) => eval(data));
```

## Dependencies

-   This project makes use of this [API](https://random-word-api.herokuapp.com/)
