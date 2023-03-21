    //get DOM
    const clockBlock: HTMLDivElement = document.querySelector('[data-clock]');
    const clockToggler: HTMLDivElement = document.querySelector('[data-start]');
    const timeMinutes: HTMLInputElement = document.querySelector('[data-time="minutes"]')
    const timeSeconds: HTMLInputElement = document.querySelector('[data-time="seconds"]')
    const clockSettings: HTMLElement = document.querySelector('[data-settings]')
    const clockCircle: HTMLElement = document.querySelector('svg circle');
    const clockBell: HTMLAudioElement = document.querySelector('[data-bell]')
    const clockInputs = document.querySelectorAll<HTMLInputElement>('[data-time]')
    const restartButton = document.querySelector<HTMLButtonElement>('[data-restart]')

    //declare vars
    let interval:number = null
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

    //start or stop timer
    clockToggler?.addEventListener('click', () => {
        if(clockBlock.dataset.clock == '0') {

            //set time if inputs are 00:00
            if(+timeMinutes.value <= 0 && +timeSeconds.value <= 0) {
                enableInputs()
                return
            }
            //set last timer
            lastTimer.minutes = +timeMinutes.value
            lastTimer.seconds = +timeSeconds.value

            startTimer()
            return
        }

        if(clockBlock.dataset.clock == '1') {
            stopTimer()
        }
    })

    //set new time
    clockSettings.addEventListener('click', () => {
        stopTimer()

        //enable inputs
        enableInputs()

        timeMinutes.focus()
    })

    //restart event 
    restartButton.addEventListener('click', () => {
        timeMinutes.value = lastTimer.minutes < 10 ? String('0' + lastTimer.minutes) : String(lastTimer.minutes)
        timeSeconds.value = lastTimer.seconds < 10 ? String('0' + lastTimer.seconds) : String(lastTimer.seconds)
            
        startTimer()
    })

    //declare functions
    const calcTime = () => {
    
        currentMinutes = Number(timeMinutes?.value)
        currentSeconds = Number(timeSeconds?.value) //because we skip first iteration

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

        //draw circle
        strokeOffestCopy = Math.round(strokeOffestCopy - drawSize)
        drawCircle(strokeOffestCopy)

        //stop the watch
        if(newSeconds == 0 && newMinutes == 0) {
            
            clockBell.play()
            stopTimer()

            setTimeout(() => {
                restartButton.classList.add('active')},
            1000)
            
            return
        }

    }

    const startTimer = () => {

        clockBlock.dataset.clock = '1'
        restartButton.classList.remove('active')
        clockToggler.innerText = 'STOP'
        setCircleColor('#09A65A')
        
        //disable inputs
        enableInputs(false)
        
        allTimeInSeconds  = lastTimer.minutes * 60 + lastTimer.seconds;
        drawSize =  strokeOffest / allTimeInSeconds
        
        //start to draw first
        strokeOffestCopy = Math.round(strokeOffestCopy - drawSize)
        drawCircle(strokeOffestCopy)
        
        interval = setInterval(() => { calcTime() }, 1000)
    }

    const stopTimer = () => {
        clearInterval(interval)
        clockBlock.dataset.clock = '2'
        
        setCircleColor('red')

        setTimeout(() => {
            setCircleColor('transparent')
        }, 1000)

        setTimeout(() => {
            clockBlock.dataset.clock = '0'
            resetCircle()
            clockToggler.innerText = 'START'
        }, 2000)

    }

    const drawCircle = (value: number) => {

        //on last draw, reset circle
        if(value <= 0) {
            value = 0;
        }

        clockCircle.setAttribute('stroke-dashoffset', String(value))
    }

    const resetCircle = () => {
        strokeOffestCopy = 1596
        clockCircle.setAttribute('stroke-dashoffset', String(1596))
    }

    const setCircleColor = (color: string) => {
        clockCircle.setAttribute('stroke', color)
    }

    const enableInputs = (active = true) => {
        timeMinutes.disabled = active ? false : true
        timeSeconds.disabled = active ? false : true

        active && timeMinutes.focus()

        //toggle class
        active ? timeMinutes.classList.add('active') : timeMinutes.classList.remove('active')
        active ? timeSeconds.classList.add('active') : timeSeconds.classList.remove('active')

    }

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
            
            resetCircle()
            strokeOffestCopy = strokeOffest
            
        })

        item.addEventListener('focus', () => {
            //move the cursor at the end of the input
            let currentVal = item.value
            item.value = ''
            item.value = currentVal
        })

    });


    document.addEventListener('click', () => {
        //if click outside inputs, disable them
        if(document.activeElement != timeMinutes && document.activeElement != timeSeconds) {
            enableInputs(false)
        }

     })


    export {}
