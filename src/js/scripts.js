function getUIPref() {
    return new Promise( (resolve, reject) => {
        chrome.storage.sync.get({"enableFlatUI": ''}, pref => {
            if(!chrome.runtime.error) {
                resolve(pref);
            } else {
                console.log("Runtime error.");
                reject(Error("Pref could not be loaded."));
            }
        });
    });
}

function updateUIPref(UIPref) {
    chrome.storage.sync.set({"enableFlatUI": UIPref}, () => {
        chrome.runtime.error && console.log("Runtime error.");
    });
}

function toggleUI() {
    const bodyContainer = document.querySelector('body');
    
    if (bodyContainer.classList.contains('flatUI')) {
        bodyContainer.classList.remove('flatUI');
        updateUIPref(false);
    } else {
        bodyContainer.classList.add('flatUI');
        updateUIPref(true);
    }
    return false;
}

chrome.runtime.sendMessage({}, () => {
    let readyStateCheckInterval = setInterval( () => {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            const bodyContainer = document.getElementsByTagName('body')[0],
                  toggleButton = document.createElement('span'),
                  buttonText = document.createElement('span');
            
            toggleButton.setAttribute('id', 'toggleButton');
            toggleButton.setAttribute('class','toggleButton');

            buttonText.setAttribute('class','toggleText');
            buttonText.innerHTML = 'IRC';

            bodyContainer.appendChild(toggleButton);
            toggleButton.appendChild(buttonText);

            getUIPref().then( pref => {
                if(pref.enableFlatUI) {
                    document.querySelector('body').classList.add('flatUI');
                } else {
                    document.querySelector('body').classList.remove('flatUI');
                }
                document.getElementById('toggleButton').onclick = toggleUI;
            });
        }
    }, 10);
});
