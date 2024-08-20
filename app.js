function incrementOdometer(target, current = 0) {
    if (target < current) {
        decrementOdometer(target, current)
        return;
    }
    const odometerContainer = document.querySelector(".odometer"); // Conteneur principal pour l'odomètre

    // Convertir target et current en chaînes pour manipulation
    let targetStr = target.toString();
    let currentStr = current.toString();

    // S'assurer que current a le même nombre de chiffres que target
    if (targetStr.length > currentStr.length) {
        currentStr = currentStr.padStart(targetStr.length, '0');
    }

    // Vider le conteneur de l'odomètre
    odometerContainer.innerHTML = '';

    // Boucle sur chaque chiffre
    for (let i = 0; i < targetStr.length; i++) {
        let startDigit = parseInt(currentStr[i]);
        let endDigit = parseInt(targetStr[i]);
        let numberOfDigit = 1

        // Créer un élément div pour chaque chiffre
        let digitDiv = document.createElement('span');
        digitDiv.classList.add('digit');
        digitDiv.style.setProperty("--delay", `${i * 400}ms`)

        // Si le chiffre de départ est inférieur au chiffre de fin
        if (startDigit <= endDigit) {
            // Ajouter les spans pour chaque chiffre entre startDigit et endDigit
            for (let j = startDigit; j <= endDigit; j++) {
                let span = document.createElement('div');
                span.textContent = j;
                digitDiv.appendChild(span);
                numberOfDigit--
            }
        } else {
            // Si startDigit est supérieur à endDigit, compter de startDigit à 9, puis de 0 à endDigit
            for (let j = startDigit; j <= 9; j++) {
                let span = document.createElement('div');
                span.textContent = j;
                digitDiv.appendChild(span);
                numberOfDigit--
            }
            for (let j = 0; j <= endDigit; j++) {
                let span = document.createElement('div');
                span.textContent = j;
                digitDiv.appendChild(span);
                numberOfDigit--
            }
        }

        digitDiv.style.setProperty("--nbrs", numberOfDigit)

        // Ajouter le div à l'odomètre
        odometerContainer.appendChild(digitDiv);
    }
    odometerContainer.classList.remove("increment")
    setTimeout(() => {
        odometerContainer.classList.add("increment")
        odometerContainer.setAttribute("data-number", target)
    }, 400)
}

function decrementOdometer(target, current = 0) {
    if (target > current) {
        incrementOdometer(target, current)
        return;
    }
    const odometerContainer = document.querySelector(".odometer"); // Conteneur principal pour l'odomètre

    // Convertir target et current en chaînes pour manipulation
    let targetStr = target.toString();
    let currentStr = current.toString();

    // S'assurer que current a le même nombre de chiffres que target
    if (targetStr.length < currentStr.length) {
        targetStr = targetStr.padStart(currentStr.length, '0');
    }

    // Vider le conteneur de l'odomètre
    odometerContainer.innerHTML = '';

    // Boucle sur chaque chiffre
    for (let i = 0; i < targetStr.length; i++) {
        let startDigit = parseInt(currentStr[i]);
        let endDigit = parseInt(targetStr[i]);

        // Créer un élément span pour chaque chiffre
        let digitSpan = document.createElement('span');
        digitSpan.classList.add('digit');
        digitSpan.style.setProperty("--delay", `${i * 400}ms`)

        let numberOfDigit = 1

        // Si le chiffre de départ est supérieur au chiffre de fin
        if (startDigit >= endDigit) {
            // Ajouter les divs pour chaque chiffre entre startDigit et endDigit
            for (let j = startDigit; j >= endDigit; j--) {
                let div = document.createElement('div');
                div.textContent = j;
                digitSpan.prepend(div);
                numberOfDigit--
            }
        } else {
            // Si startDigit est inférieur à endDigit, compter de startDigit à 0, puis de 9 à endDigit
            for (let j = startDigit; j >= 0; j--) {
                let div = document.createElement('div');
                div.textContent = j;
                digitSpan.prepend(div);
                numberOfDigit--
            }
            for (let j = 9; j >= endDigit; j--) {
                let div = document.createElement('div');
                div.textContent = j;
                digitSpan.prepend(div);
                numberOfDigit--
            }
        }

        digitSpan.style.setProperty("--nbrs", numberOfDigit)

        // Ajouter le span à l'odomètre
        odometerContainer.appendChild(digitSpan);
    }
    odometerContainer.classList.add("increment")
    odometerContainer.setAttribute("data-number", target)
    setTimeout(() => {
        odometerContainer.classList.remove("increment")
    }, 400)
}

const numberInput = document.getElementById('number');
numberInput.addEventListener('input', () => {
    const number = parseInt(numberInput.value)
    let currentNumber = +document.querySelector(".odometer").getAttribute("data-number") ?? 0;
    document.querySelector(".odometer").innerHTML = currentNumber
    if (number < 0) {
        document.querySelector(".odometer").innerHTML = 0;
        return;
    }
    odometer(currentNumber, number)
})

function odometer(currentNumber, number) {
    if (isNaN(currentNumber) || isNaN(number)) {
        return;
    }
    if (currentNumber > number) {
        decrementOdometer(number, currentNumber)
    }else if(currentNumber < number){
        incrementOdometer(number, currentNumber)
    }
}