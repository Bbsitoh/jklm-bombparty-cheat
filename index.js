/*
This is a cheat script for https://jklm.fun BombParty game
Directly pasting the script in the console wont work, read the usage guide below

Script by Swordax (https://github.com/SwordaxSy)
*/

/*
Usage Guide:
1. Open devtools inspect
2. Open the console tab
3. Do one of the following options:
    - Set the Javascript context to bombparty/
    - Using the manual inspect element selection tool, select an element in the center of the game screen
4. Paste the script in the console tab and hit enter

Options Guide:
- `autotype`: when set true, the word will be automatically typed in your game input, you just have to hit enter
- `selfOnly`: when set true, words will be logged in console only when its your own turn
- `lang`: you can choose from the supported languages below:
    - en: English
    - es: Spanish
    - it: Italian
    - fr: French
    - de: German
- `lengths`: specifies the length of the words that will be attempted, increase lengths for more difficult words
- `chunk`: specifies the number of words to fetch from the library on each attempt (keep default)
- `attempts`: specifies the number of attemps (keep default)
*/

((
    autotype = true,
    selfOnly = false,
    lang = "en",
    lengths = [4, 5, 6],
    chunk = 100,
    attempts = 20
) => {
    // variables
    const api = `https://random-word-api.herokuapp.com/word?lang=${lang}&number=${chunk}`;
    const logFontSize = "font-size:16px;";
    const logStyles = {
        error: "color:red;" + logFontSize,
        welcome: "color:cyan;" + logFontSize,
        word: "color:green;" + logFontSize,
        myWord: "color:lime;" + logFontSize,
    };
    let myTurn = false;

    // welcome log
    console.log(
        "%cWelcome to jklm.fun BombParty cheat script",
        logStyles.welcome
    );
    console.log("%cBy Swordax: https://linktr.ee/swordax", logStyles.welcome);
    console.log(
        "%cGithub repo: https://github.com/SwordaxSy/jklm.fun-bombparty-cheat",
        logStyles.welcome
    );

    // elements
    const syllable = document.querySelector(".syllable");
    const selfTurn = document.querySelector(".selfTurn");
    const input = document.querySelector(".selfTurn input");

    // verify options & environment
    lang = lang.toLowerCase();
    let error;

    if (!syllable || !selfTurn)
        error =
            "Error: incorrect javascript context, please switch to 'bombparty/' javascript context";

    if (!["en", "es", "it", "fr", "de"].includes(lang))
        error = "Error: supported languages are: en, es, it, fr, de";

    if (
        !Array.isArray(lengths) ||
        !lengths.every((length) => Number.isInteger(length))
    )
        error = "Error: lengths must be an array of integers";

    if (!Number.isInteger(chunk)) error = "Error: chunk must be an integer";

    if (!Number.isInteger(attempts))
        error = "Error: attempts must be an integer";

    if (error) {
        console.log(`%c${error}`, logStyles.error);
        return;
    }

    // observer
    const observer = new MutationObserver(() => {
        myTurn = selfTurn.getAttribute("hidden") === null;
        cheat();
    });

    observer.observe(selfTurn, {
        attributes: true,
    });

    // fetch function
    function fetchWords() {
        return new Promise(async (resolve, reject) => {
            try {
                const responses = await Promise.all(
                    lengths.map((length) => fetch(api + `&length=${length}`))
                );

                const arrays = await Promise.all(
                    responses.map((res) => res.json())
                );

                resolve(arrays.flat(Infinity));
            } catch (err) {
                reject(err);
            }
        });
    }

    // cheat function
    function cheat(atmpts = 0) {
        if (atmpts >= attempts) {
            console.log("%cError: failed to find a word ;-;", logStyles.error);
            return;
        }

        const letters = syllable.innerText.toLowerCase();

        try {
            fetchWords().then((data) => {
                const word = data.find((el) => el.includes(letters));
                if (!word) return cheat(atmpts + 1);

                if (!selfOnly || myTurn) {
                    console.log(
                        `%c${word}`,
                        myTurn ? logStyles.myWord : logStyles.word
                    );
                }

                if (autotype) {
                    input.value = word;
                    input.select();
                }
            });
        } catch (err) {
            console.log("%cError: something went wrong! :(", logStyles.error);
        }
    }
})();
