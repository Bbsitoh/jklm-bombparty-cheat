# jklm.fun BombParty Cheat Script

This is a cheat script for https://jklm.fun BombParty game
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

-   `autotype`: when set true, the word will be automatically typed in your game input, you just have to hit enter
-   `lang`: you can choose from the supported languages below:
    -   en: English
    -   es: Spanish
    -   it: Italian
    -   fr: French
    -   de: German
-   `lengths`: specifies the length of the words that will be attempted, increase lengths for more difficult words
-   `chunk`: specifies the number of words to fetch from the library on each attempt (keep default)
-   `attempts`: specifies the number of attemps (keep default)

## Dependencies

-   This project makes use of this [API](https://random-word-api.herokuapp.com/)
