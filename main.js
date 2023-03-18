try {

    let codeInput = document.getElementById('codeInput'),
        runBtn = document.getElementById('runBtn'),
        clearConsoleBtn = document.getElementById('clearConsoleBtn'),
        darkModeOption = document.getElementById('skotadi');

    codeInput.value = localStorage.getItem('codikasPouGraftike') != null ? localStorage.getItem('codikasPouGraftike') : '';

    function writeResultOnOutput(text) {
        let h1 = document.createElement('h1');

        h1.appendChild(document.createTextNode(text));


        document.getElementById('outputArea').appendChild(h1);
    }

    codeInput.addEventListener('input', () => {
        localStorage.setItem('codikasPouGraftike', codeInput.value);
    });

    const setDarkMode = state => {
        if (state) { // dark
            codeInput.style.backgroundColor = 'black';
            codeInput.style.color = 'green';
            outputArea.style.backgroundColor = 'black';
            outputArea.style.color = 'green';
        }

        else { // light
            codeInput.style.backgroundColor = 'white';
            codeInput.style.color = 'black';
            outputArea.style.backgroundColor = 'white';
            outputArea.style.color = 'black';
        }
    }
    setDarkMode(false);

    // Αν έγινε κλικ στο checkbox
    darkModeOption.onclick = () => setDarkMode(darkModeOption.checked);

    clearConsoleBtn.onclick = () => {
        let breakLoopFlag = false;

        let checkLoop = setInterval(() => {
            for (var childIndex = 0; childIndex < document.getElementById('outputArea').children.length; childIndex++) {
                let child = document.getElementById('outputArea').children[childIndex];
                if (child) {
                    document.getElementById('outputArea').removeChild(child);

                    if (document.getElementById('outputArea').children.length == 0) breakLoopFlag = true;
                }
            }

            if (breakLoopFlag) {
                clearInterval(checkLoop);
            }
        }, 50);
    }

    // Συνάρτηση αφαίρεσης άχρηστων κενών
    const removeRedundantSpaces = str => {
        const searchTerm2 = "   ", // Triple spaces.
            searchTerm = "  ", // Double spaces.
            replaceTerm = " "; // Single space.
        let tmpStr = str,
            index = tmpStr.indexOf(searchTerm);

        while (index >= 0) {
            tmpStr = tmpStr.replace(searchTerm, replaceTerm);
            index = tmpStr.indexOf(searchTerm);
        }

        return tmpStr;
    };

    // Όταν πατηθεί το κουμπί "ΕΚΤΕΛΕΣΗ"
    runBtn.onclick = () => {

        // -------------------------------------------------------------------------------------------------------------------
        // BUG FIX: Βγάλε τα άχρηστα κενά του χρήστη
        // -------------------------------------------------------------------------------------------------------------------
        codeInput.value = removeRedundantSpaces(codeInput.value);
        if (codeInput.value.includes('\n')) {
            codeInput.value = codeInput.value.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, ""); // RegEx usage. (\n είναι το enter)
        }
        // -------------------------------------------------------------------------------------------------------------------

        if (codeInput.value == '') {
            writeResultOnOutput('Ε φίλε πρέπει να γράψεις και κάτι');
            return;
        }

        // Εντολές.
        switch (true) {
            case codeInput.value == 'papagianneos': // easter egg lol
                window.open('https://papagianneos-game.surge.sh/');
                writeResultOnOutput('THE MIGHTY GAME OF PAPAGIANNEOS');
                return

            case codeInput.value.startsWith('πές('):
            case codeInput.value.startsWith('πες('): {
                const valueToReplaceCuzYes = codeInput.value.startsWith('πές(\'') ? 'πές(\'' : 'πες(\'';
                let message = codeInput.value.replace(valueToReplaceCuzYes, '');

                message = message.replace("')", '');
                alert(message);
                return
            }

            case codeInput.value.startsWith('πράξη('):
            case codeInput.value.startsWith('πραξη('): {
                const valueToReplaceCuzYes = codeInput.value.startsWith('πράξη(\'') ? 'πράξη(\'' : 'πραξη(\'';
                let math = codeInput.value.replace(valueToReplaceCuzYes, '');

                math = math.replace('\')', '');

                const resultString = `${math} = ${eval(math)}`;

                alert(resultString);
                writeResultOnOutput(resultString);
                return
            }

            case codeInput.value.startsWith('γράψε('):
            case codeInput.value.startsWith('γραψε('): {
                const valueToReplaceCuzYes = codeInput.value.startsWith('γράψε(\'') ? 'γράψε(\'' : 'γραψε(\'';
                let message = codeInput.value.replace(valueToReplaceCuzYes, '');

                message = message.replace("')", '');
                writeResultOnOutput(message);
                return
            }


            case codeInput.value == 'κανα λολακι παιζεις;': {
                writeResultOnOutput('Φυσικά μπρο μου!')

                let tempIframe = document.createElement('iframe');

                tempIframe.src = 'https://www.op.gg/summoners/eune/fapa%20ksapla%20mixa';
                tempIframe.style.border = 'none';
                tempIframe.style.width = '100%';
                tempIframe.style.height = '1000px';
                tempIframe.id = 'coolLolakiStatusLOL';
                tempIframe.style.zIndex = '999';
                document.getElementById('pateras').style.display = 'none';
                document.body.appendChild(tempIframe);

                window.addEventListener('keydown', (event) => {
                    if (event.keyCode == 27 && document.getElementById('coolLolakiStatusLOL')) {
                        document.body.removeChild(tempIframe);
                        document.getElementById('pateras').style.display = '';
                    }
                });
                return;
            }

        }

        try {
            let result = eval(codeInput.value);
            writeResultOnOutput(String(result));
        } catch (error) {
            writeResultOnOutput(String(error));
        }
    }

    // Πλήκτρο που τρέχει τον κώδικα
    window.addEventListener('keydown', (event) => {
        if (!event.shiftKey && event.keyCode == 13) {
            runBtn.onclick();
        }
    });


} catch (error) {
    alert(error);
    console.error(error);
}
