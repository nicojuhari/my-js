
    const timeToggler: HTMLElement | null = document.querySelector('[data-start');
    
    console.log(timeToggler);


    timeToggler?.addEventListener('click', (ev: Event) => {
        console.log(ev.target)
    })

    
    export {}
