
    const clockToggler: HTMLButtonElement = document.querySelector('[data-start]');
    const timeMinutes: HTMLInputElement = document.querySelector('[data-time="minutes"]')
    const timeSeconds: HTMLInputElement = document.querySelector('[data-time="seconds"]')
    const clockInputs = document.querySelectorAll<HTMLInputElement>('[data-time]')
    const clockSettings: HTMLElement = document.querySelector('[data-settings]')
    
    let interval: number = null


    clockToggler?.addEventListener('click', () => {
        if(clockToggler.dataset.start == '0') {
            clockToggler.dataset.start = '1'
            
            timeMinutes.disabled = true;
            timeSeconds.disabled = true;

            timeMinutes.classList.remove('active')
            timeSeconds.classList.remove('active')

            startTimer()
            
            interval = setInterval(() => {
                startTimer()
            }, 1000)
            clockToggler.innerText = 'STOP'
        } else {
            clockToggler.dataset.start = '0'
            stopTimer()
            clockToggler.innerText = 'START'
        }
    })

    clockSettings.addEventListener('click', () => {
        stopTimer()
        timeMinutes.disabled = false;
        timeSeconds.disabled = false;

        timeMinutes.classList.add('active')
        timeSeconds.classList.add('active')

        timeMinutes.focus()
    })

    Array.from(clockInputs).forEach(item => {
        item.addEventListener('input', () => {
            let currentVal = Number(item.value)

            //cut to 2 symbols
            if(item.value.length > 2) {
                currentVal = Number(item.value.substring(1,3))
            }
            
            //no number
            if(isNaN(Number(item.value)) == true) {
                currentVal = 0
            }
            
            //minutes
            if(item.dataset.time == 'minutes') {
                if(currentVal >= 60) {
                    currentVal = 60
                    timeSeconds.value = '00'
                }    
            }
            
            //seconds
            if(item.dataset.time == 'seconds') {
                currentVal >= 60 || Number(timeMinutes.value) == 60 ? currentVal = 0 : null
            }

            item.value = currentVal < 10 ? String('0' + currentVal) : String(currentVal)
            
        })

        item.addEventListener('focus', () => {
            let currentVal = item.value
            item.value = ''
            item.value = currentVal
            item.select()
        })
    });

     
    

    const startTimer = () => {
        let newMinutes = 60
        let newSeconds = 60

        let currentMinutes:number = Number(timeMinutes?.value)
        let currentSeconds:number = Number(timeSeconds?.value) 

        if(currentMinutes == 0 && currentSeconds == 0) {
            clearInterval(interval)
            return
        }
        
        newMinutes = currentMinutes

        //change minutes
        if(currentSeconds == 0 ) {
            newMinutes = currentMinutes - 1;
            currentSeconds = 60
        }

        newSeconds = currentSeconds - 1;
        
        timeMinutes.value = newMinutes < 10 ? String('0' + newMinutes) : String(newMinutes)
        timeSeconds.value = newSeconds < 10 ? String('0' + newSeconds) : String(newSeconds)
    }
    const stopTimer = () => {
        clearInterval(interval)
    }

    
    export {}
