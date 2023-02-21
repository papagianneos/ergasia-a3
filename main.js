  try {

    let codeInput = document.getElementById('codeInput'),
        runBtn = document.getElementById('runBtn');

	codeInput.value = localStorage.getItem('codikasPouGraftike') != null ? localStorage.getItem('codikasPouGraftike') : '';

    function writeResultOnOutput(text) {
        let h1 = document.createElement('h1');

        h1.appendChild(document.createTextNode(text));


        document.getElementById('outputArea').appendChild(h1);
    }
    
    codeInput.addEventListener('input', () => {
        localStorage.setItem('codikasPouGraftike', codeInput.value);
    });


    runBtn.onclick = () => {
        if (codeInput.value == '') {
            writeResultOnOutput('� �� ���� ������ �� ������� ��� ����');
            return;
        }
        
        switch (true) {
        	case codeInput.value == 'papagianneos': // easter egg lol
        		window.open('https://papagianneos-game.surge.sh/');
        	    writeResultOnOutput('THE MIGHTY GAME OF PAPAGIANNEOS');
        	    return
                
            case codeInput.value.startsWith('���('): {
            	  let message = codeInput.value.replace('���(\'', '');
                
                  message = message.replace('\')', '');
            	  alert(message);
                  writeResultOnOutput(message);
                  return
                }
                
            case codeInput.value.startsWith('�����('): {
            	 let math = codeInput.value.replace('�����(\'', '');
                
                 math = math.replace('\')', '');
                 
                 const resultString = `${math} = ${eval(math)}`;
                 
            	 alert(resultString);
                 writeResultOnOutput(resultString);
                 return
                }
        }
        
        try {
            let result = eval(codeInput.value);
            writeResultOnOutput(String(result));
        }
        catch (error) {
            writeResultOnOutput(String(error));
        }
    }


} catch (error) {
    alert(error);
    console.error(error);
}