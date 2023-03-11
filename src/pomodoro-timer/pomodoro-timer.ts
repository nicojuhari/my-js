    //get DOM
    const clockBlock: HTMLDivElement = document.querySelector('[data-clock]');
    const clockToggler: HTMLDivElement = document.querySelector('[data-start]');
    const timeMinutes: HTMLInputElement = document.querySelector('[data-time="minutes"]')
    const timeSeconds: HTMLInputElement = document.querySelector('[data-time="seconds"]')
    const clockSettings: HTMLElement = document.querySelector('[data-settings]')
    const clockCircle: HTMLElement = document.querySelector('svg circle');
    const clockBell: HTMLAudioElement = document.querySelector('[data-bell]')
    const clockInputs = document.querySelectorAll<HTMLInputElement>('[data-time]')

    //declare vars
    let interval: number = null
    // let strokeOffest = 2 * Math.PI * Number(clockCircle.getAttribute('r'));
    let strokeOffest = 1596;
    let strokeOffestCopy = 1596;
    let allTimeInSeconds = 0; 
    let drawSize = 0;


    let newMinutes = 0
    let newSeconds = 0

    let currentMinutes = 0
    let currentSeconds = 0

    let lastTimer = {
        minutes: 0,
        seconds: 0
    }

    //add Events
    clockToggler?.addEventListener('click', () => {
        if(clockBlock.dataset.clock == '0') {

            if(+timeMinutes.value <= 0 && +timeSeconds.value <= 0) return

            clockBlock.dataset.clock = '1'
            strokeOffestCopy = 1596
            
            timeMinutes.disabled = true;
            timeSeconds.disabled = true;

            timeMinutes.classList.remove('active')
            timeSeconds.classList.remove('active')

            lastTimer.minutes = +timeMinutes.value
            lastTimer.seconds = +timeSeconds.value
            
            allTimeInSeconds  = +timeMinutes.value * 60 + +timeSeconds.value;
            drawSize =  strokeOffest / allTimeInSeconds
            
            clockToggler.innerText = 'STOP'
            setCircleColor('#09A65A')
            startTimer()
            
            interval = setInterval(() => { startTimer() }, 1000)

        } else {
            stopTimer()
        }
    })

    clockSettings.addEventListener('click', () => {
        if(clockToggler.dataset.start = '1') {

        }
        stopTimer()
        clockToggler.innerText = 'START'
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
            clockCircle.setAttribute('stroke-dashoffset', '1596')
            strokeOffestCopy = strokeOffest
            
        })

        item.addEventListener('focus', () => {
            //move the cursor at the end
            let currentVal = item.value
            item.value = ''
            item.value = currentVal
        })
    });

    //declare functions
    const startTimer = () => {
    
        currentMinutes = Number(timeMinutes?.value)
        currentSeconds = Number(timeSeconds?.value)

        //stop the watch
        if(currentMinutes == 0 && currentSeconds == 0) {
            clockBell.play()
            stopTimer()
            
            timeMinutes.value = lastTimer.minutes < 10 ? String('0' + lastTimer.minutes) : String(lastTimer.minutes)
            timeSeconds.value = lastTimer.seconds < 10 ? String('0' + lastTimer.seconds) : String(lastTimer.seconds)

            return
        }

        //draw circle
        strokeOffestCopy = Math.round(strokeOffestCopy - drawSize)
        drawCircle(strokeOffestCopy)

        //calc newMinutes
        newMinutes = currentMinutes
        if(currentSeconds == 0 ) {
            newMinutes = currentMinutes - 1;
            currentSeconds = 60
        }
        //calc newSeconds
        newSeconds = currentSeconds - 1;

        //update inputs
        timeMinutes.value = newMinutes < 10 ? String('0' + newMinutes) : String(newMinutes)
        timeSeconds.value = newSeconds < 10 ? String('0' + newSeconds) : String(newSeconds)
    }
    const stopTimer = () => {
        clearInterval(interval)
        clockToggler.innerText = 'START'
        clockBlock.dataset.clock = '0'
    }

    const drawCircle = (value: number) => {
        if(value <= 0) {
            value = 0;
            setCircleColor('red')

            setTimeout(() => {
                setCircleColor('transparent')
            }, 1000)

             setTimeout(() => {
                clockCircle.setAttribute('stroke-dashoffset', String(1596))
            }, 2000)
        }
        clockCircle.setAttribute('stroke-dashoffset', String(value))
    }

    const setCircleColor = (color: string) => {
        clockCircle.setAttribute('stroke', color)
    }

    
    export {}
