// scrolling appearance code start

const options = {
    root: null,
    rootMargin: '0px',
    threshold: .1
}

/**
 * @param {IntersectionObserverEntry[]} entries
 * @param {IntersectionObserver} observer
 */

const handleIntersect = function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.intersectionRatio > options.threshold) {
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
        }
    })
}

const observer = new IntersectionObserver(handleIntersect, options)
document.querySelectorAll('[class*="reveal-"]').forEach(function (r) {
    observer.observe(r)
})

// scrolling appearance code end


const scrollSpyOptions = {
    root: null,
    rootMargin: '0px',
    threshold: .4
}

//scroll spy code start

/**
 * @param {HTMLElement} elem
 */

const activate = function (elem) {
    const id = elem.getAttribute('id')
    const anchor = document.querySelector(`a[href="#${id}"]`)

    if (anchor === null) {
        return null
    }

    anchor.parentElement
        .querySelectorAll('.active')
        .forEach(function (node) {
            node.classList.remove('active')
        })

    anchor.classList.add('active')
}


/**
 * @param {IntersectionObserverEntry[]} scrollSpyEntries
 * @param {IntersectionObserver} scrollSpyObserver
 */

const callback = function (scrollSpyEntries, scrollSpyObserver) {
    scrollSpyEntries.forEach(function (scrollSpyEntry) {
        if (scrollSpyEntry.intersectionRatio > scrollSpyOptions.threshold) {
            activate(scrollSpyEntry.target)
        }
    })
}

const spies = document.querySelectorAll('[data-spy]')

if (spies.length > 0) {
    const scrollSpyObserver = new IntersectionObserver(callback, scrollSpyOptions)

    spies.forEach(function (spy) {
        scrollSpyObserver.observe(spy)
    })
}

//scroll spy code end