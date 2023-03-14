try {

    let codeInput = document.getElementById('codeInput'),
        runBtn = document.getElementById('runBtn'),
        clearConsoleBtn = document.getElementById('clearConsoleBtn');

    codeInput.value = localStorage.getItem('codikasPouGraftike') != null ? localStorage.getItem('codikasPouGraftike') : '';

    function writeResultOnOutput(text) {
        let h1 = document.createElement('h1');

        h1.appendChild(document.createTextNode(text));


        document.getElementById('outputArea').appendChild(h1);
    }

    codeInput.addEventListener('input', () => {
        localStorage.setItem('codikasPouGraftike', codeInput.value);
    });


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

	// Όταν πατηθεί το κουμπί "ΕΚΤΕΛΕΣΗ"
    runBtn.onclick = () => {
        if (codeInput.value.includes('  ')) codeInput.value = codeInput.value.replace('  ', ' ');

        if (codeInput.value.startsWith(' ')) {
            codeInput.value = codeInput.value.replace(' ', '');
        }

        if (codeInput.value == '') {
            writeResultOnOutput('Ε φίλε πρέπει να γράψεις και κάτι');
            return;
        }

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
	})


} catch (error) {
    alert(error);
    console.error(error);
}
