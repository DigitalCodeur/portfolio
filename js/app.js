// ========== scrolling appearance code start ============

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

// ========= scrolling appearance code end ===============

//============== scroll spy code start =================

const scrollSpyOptions = {
    root: null,
    rootMargin: '0px',
    threshold: .4
}

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

// ================= scroll spy code end ============

// ============= Ajax Form start ===============

const myForm = document.getElementById("myform");

myForm.addEventListener("submit", function (e) {
    e.preventDefault();// Prevent page from reloading after submission

    const xhttp = new XMLHttpRequest();
    const data = new FormData(myForm);// Retrieve form data

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const object = document.getElementById("object").value;
    const message = document.getElementById("message").value;

    // We check if all the fields are filled

    if (name && email && object && message) {
        xhttp.onload = function () {
            const succesModal = document.querySelector(".success");
            succesModal.classList.add('success-show');

            setTimeout(() => {
                succesModal.classList.remove('success-show');
            }, 2000);
        }
        xhttp.open("POST", "./php/form.php"); // send to php without reloading the page
        xhttp.send(data);
        myForm.reset();
    } else {
        alert("Veillez remplir tous les champs");
    }

});


// ============= Ajax Form end ===============