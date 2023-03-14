import './main.scss'

import { setupCounter } from './counter'

interface Projects {
  title: string,
  url: string,
  icon: string
}

const projects: Projects[] = [
  {
    title: 'Pomodoro Timer',
    url: 'pomodoro-timer',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#ef4d3c" d="M62 31.6C62.8 47 48.9 60 32.1 60S.4 46.2 2.1 30.9C4.5 9.4 20.4 8 32.1 8C39.2 8 60.2 1.8 62 31.6z"/><path fill="#8cc63e" d="M11 27c6.2-9.6 16.8-6.8 19.6-10.4c0 6.9 5 3.5 7.5 6.6c3.2 4 4.4 11.1 8.2 12.5c-3.7-7.9 2.3-7.6-6.1-18.2c4.5 2.8 6.8 0 12.9 2.5c-5.3-8.4-13.6-6-13.6-6s5.2-4.8 9.6-2.3c-4.6-6.8-17.9 1.8-17.9 1.8s-5.5-9.4-17.3.5c6.9-2.8 14.5 0 14.5 0S15.9 10.9 11 27"/><g fill="#64892f"><path d="M11 27s7.3-13.5 19.9-12.3C19.8 9.6 11 20.4 11 27z"/><path d="M13.9 14s9.2-6.9 17.3 0c-2.4-8.4-14.7-4.5-17.3 0m19.3.9c12.2 5.6 8.1 12 13.1 21c-3.4-7.5 5-21-13.1-21"/><path d="M28.4 14s2.8-4.2 3.8-9.4c.1-.7 3.1-.6 3 .1c-1 6.7 1.7 10.4 1.7 10.4s-2.1.7-4.7.7c-2.6.1-3.8-1.8-3.8-1.8"/></g><ellipse cx="33.7" cy="4.6" fill="#8cc63e" rx="1.5" ry=".6"/></svg>'
  }
]

const projectsHTML = projects.map( item => {
  return `<a href="/my-js/${item.url}/" class="card">
              <div class="card-icon">${item.icon}</div>
              <div class="card-title">${item.title }</div>
          </a>`;
}).join('')

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <h1 class="page-title">My <span class="js-logo">JS</span> Playground</h1>
    <div class="projects-list">
      ${projectsHTML}
    </div>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
