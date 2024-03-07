/*
This is a cheat script for https://jklm.fun BombParty game
Directly pasting the script in the console wont work
Read the usage guide (https://github.com/SwordaxSy/jklm-bombparty-cheat)

Script by Swordax (https://linktr.ee/swordax)
*/

((
    autotype = true,
    selfOnly = false,
    lang = "en",
    lengths = [4, 5, 6],
    instant = false,
    pause = 150,
    initialPause = 1000,
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
        "%cGithub repo: https://github.com/SwordaxSy/jklm-bombparty-cheat",
        logStyles.welcome
    );

    // elements
    const syllable = document.querySelector(".syllable");
    const selfTurn = document.querySelector(".selfTurn");
    const seating = document.querySelector(".bottom .seating");
    const input = document.querySelector(".selfTurn input");

    // validate options & environment
    lang = lang.toLowerCase();
    let error;

    if (!syllable || !selfTurn)
        error =
            "incorrect javascript context, please switch to 'bombparty/' javascript context. Read the usage guide.";

    if (!["en", "es", "it", "fr", "de"].includes(lang))
        error = "supported languages are: en, es, it, fr, de";

    if (
        !Array.isArray(lengths) ||
        !lengths.every((length) => Number.isInteger(length))
    )
        error = "lengths must be an array of integers";

    if (isNaN(pause)) error = "pause must be a number";

    if (isNaN(initialPause)) error = "initialPause must be a number";

    if (!Number.isInteger(chunk)) error = "chunk must be an integer";

    if (!Number.isInteger(attempts)) error = "attempts must be an integer";

    if (error) {
        console.log(`%cError: ${error}`, logStyles.error);
        return;
    }

    /**
     * observer to detect changes in the .selfTurn and .seating elements attributes
     * we check the .seating element for `hidden` to make sure the game is started
     *
     * when own turn comes, a `hidden` attribute is removed from the .selfTurn element
     * we check that to determine if whether its own turn
     */
    const observer = new MutationObserver(() => {
        if (seating.getAttribute("hidden") === null) return;

        myTurn = selfTurn.getAttribute("hidden") === null;
        cheat();
    });

    observer.observe(selfTurn, {
        attributes: true,
    });

    observer.observe(seating, {
        attributes: true,
    });

    //
    /**
     * An asynchronous function to stop the code for a specified amount of time
     * @param {number} time - pause duration in milliseconds
     * @returns {Promise}
     */
    function sleep(time) {
        return new Promise((res) => {
            setTimeout(res, time);
        });
    }

    /**
     * Fetches the words library for a number of words and returns an array words
     * @returns {Promise<Array.<string>>}
     */
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

    /**
     * Types a word into the input letter by letter withg a pause in between to make it more human
     * @param {string} word - A string of letters to type
     */
    async function typeLetters(word) {
        // initial pause
        await sleep(initialPause);

        for (const char of word) {
            input.value = input.value + char;
            input.dispatchEvent(new Event("input", { bubbles: true }));

            // add margin in time to make it appear more human
            const margin = Math.random() * pause - pause / 2;
            await sleep(pause + margin);
        }
    }

    /**
     * A recursive function that keepts trying to find a word for a number of attempts
     * @param {number} atmpts - Current number of attempts
     * @returns
     */
    function cheat(atmpts = 0) {
        if (atmpts >= attempts) {
            console.log("%cError: failed to find a word ;-;", logStyles.error);
            return;
        }

        const letters = syllable.innerText.toLowerCase();

        try {
            fetchWords().then(async (data) => {
                const word = data.find((el) => el.includes(letters));

                if (!word) return cheat(atmpts + 1);

                if (!selfOnly || myTurn) {
                    console.log(
                        `%c${word}`,
                        myTurn ? logStyles.myWord : logStyles.word
                    );
                }

                if (autotype && myTurn) {
                    if (instant) {
                        input.value = word;
                    } else {
                        await typeLetters(word);
                    }

                    // select input text so user has the immediate option to overwrite
                    input.select();
                }
            });
        } catch (err) {
            console.log("%cError: something went wrong! :(", logStyles.error);
        }
    }
})();
