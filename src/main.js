import './style.css'

const menuButton = document.querySelector('.menu-button')
const menu = document.querySelector('.menu')
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true'
  menuButton.setAttribute('aria-expanded', String(!open))
  menu.classList.toggle('open', !open)
})
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false')
  menu.classList.remove('open')
}))

const loadMore = document.querySelector('.load-more')
loadMore.addEventListener('click', () => {
  document.querySelector('.extra-project').classList.add('visible')
  loadMore.hidden = true
})

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.1, rootMargin: '0px 0px -50px' })
document.querySelectorAll('.reveal').forEach(section => observer.observe(section))

const updateScroll = () => {
  const scrollable = document.documentElement.scrollHeight - innerHeight
  const progress = scrollable > 0 ? (scrollY / scrollable) * 100 : 0
  document.documentElement.style.setProperty('--scroll', `${progress}%`)
}
addEventListener('scroll', updateScroll, { passive: true })
updateScroll()
