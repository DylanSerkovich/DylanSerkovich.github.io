import { getSkills, getProjects, sendMessage } from './firebase.js'

const nav = document.querySelector('.nav'); //nav
const menu_btn = document.querySelector('.nav__menu'); //boton
const menu = document.querySelector('.nav__list'); //ul
const secciones = document.querySelectorAll('section'); //secciones

const skillsContainer = document.getElementById('skillsContainer');
const projectsContainer = document.getElementById('projectsContainer');

const flagsElement = document.getElementById('flags');
const textsToChange = document.querySelectorAll("[data-section]");
let idioma = (window.navigator.language || navigator.userLanguage || navigator.browserLanguage).slice(0, 2);
const idiomas = ['es', 'en'];
const LanguageStatus = localStorage.getItem('language');

const btnSwitch = document.querySelector('#checkTheme');

const skills = null;

const projects = null;

const enlace = document.querySelector('.redeslist__link--gmail');

window.addEventListener('scroll', function () {
    nav.classList.toggle('nav--active', window.scrollY > 0)
})

function OcultarMenu() {
    menu.classList.toggle('nav__list--active')
}

menu_btn.addEventListener('click', OcultarMenu);
menu.addEventListener('click', OcultarMenu);

/**
 * Visualiza que interseccion esta identificando el observador
 */
const observer = new IntersectionObserver((entradas, observer) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            interseccionHandler(entrada);
        }
    });
}, {
    rootMargin: '-80px 0px 0px 0px',
    threshold: 0.8
});

/**
 * Asigna un observador a cada una de las secciones
 */
secciones.forEach(seccion => observer.observe(seccion));

/**
 * Funcion recibe la id de la intersección y agrega o remueve un modificador en los links de navegación
 * @param {Intersecting} entrada Valor de la intersección observada
 */
function interseccionHandler(entrada) {
    const id = entrada.target.id;

    const currentlyActive = document.querySelector(".nav__list .nav__item--active");
    const shouldbeActive = document.querySelector(".nav__list [data-ref=" + id + "]");

    if (currentlyActive) {
        currentlyActive.classList.remove('nav__item--active');
    }
    if (shouldbeActive) {
        shouldbeActive.classList.add('nav__item--active');
    }
}

const FlagsContainer = document.querySelector('.flags');

//Codigo Idiomas
const changeLanguage = async (language) => {
    const requestJson = await fetch(`./languages/${language}.json`)
    const texts = await requestJson.json();

    localStorage.setItem('language', language);
    for (const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        textToChange.innerHTML = texts[section][value];
    }
};

flagsElement.addEventListener('click', (e) => {
    if (!(localStorage.getItem('language') === e.target.parentElement.dataset.language)) {
        changeLanguage(e.target.parentElement.dataset.language);
    }
});

//Codigo Modo Oscuro
let ButtonThemeActive = () => btnSwitch.classList.toggle('checkTheme--dark');
let ButtonThemeDesactive = () => btnSwitch.classList.remove('checkTheme--dark');

const ThemeOptions = { 'dark': () => ThemeMode(ButtonThemeActive, 'dark'), 'light': () => ThemeMode(ButtonThemeDesactive, 'light'), null: () => AddNavigatorTheme() }

function ThemeMode(buttonBehaviur, theme) {
    document.documentElement.setAttribute('data-theme', theme);
    buttonBehaviur();
    localStorage.setItem('theme-mode', theme);
}

btnSwitch.addEventListener('click', () => {
    (document.documentElement.getAttribute('data-theme') === 'dark') ? ThemeOptions['light']() : ThemeOptions['dark']();
});

function AddNavigatorTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ThemeOptions['dark']()
}

const LanguageNav = (idiomas.includes(idioma)) ? idioma : 'en';

document.addEventListener('DOMContentLoaded', function () {
    let ThemeStatus = localStorage.getItem('theme-mode');
    ThemeOptions[ThemeStatus]();

    (!!LanguageStatus) ? changeLanguage(LanguageStatus) : changeLanguage(LanguageNav);
});

document.addEventListener('DOMContentLoaded', async () => {
    const querySnapshotSkills = await getSkills();
    const querySnapshotProjects = await getProjects();

    let htmlSkills = "";
    let htmlProjects = "";

    querySnapshotSkills.forEach(doc => {
        const skill = doc.data();
        const imgClass = skill.description === "JAVA" ? "skill__logo--java" : "";
        htmlSkills += `
        <div class="skill__item">
            <div class="skill__img">
                <img class="skill__logo ${imgClass}" src=${skill.img} alt=${skill.description}>
            </div>
            <span class="skill__name">${skill.description} </span>
        </div>
        `
    })

    skillsContainer.innerHTML = htmlSkills

    querySnapshotProjects.forEach(doc => {
        const project = doc.data();
        htmlProjects += `
        <div class="project__item">
            <div class="card">
                <img class="card__img" src=${project.img} alt="">
                <div class="card__side card__side--front">
                    <div class="bg"></div>
                    <div class="card__body-front">
                        <h3 class="card__title">${project.title.en}</h3>
                    </div>
                </div>
                <div class="card__side card__side--back card__side--back--proyecto-r">
                    <div class="card__body-back">
                        <h3 class="card__title-back">${project.reason}</h3>
                        <p  class="project__description">${project.description.en}</p>
                            <div class="card__links">
                                <form action=${project.demo_url} target="_blank">
                                    <input class="card__link card__link--demo" type="submit" value="Demo">
                                </form>
                                <form action=${project.code_url} target="_blank">
                                    <input class="card__link card__link--code" type="submit" value="Code">
                                </form>
                            
                            </div>
                    </div>
                </div>
            </div>
        </div>
        `
    })
    projectsContainer.innerHTML = htmlProjects;

    saveJsonToLocalStorage('skills', querySnapshotProjects)
        .then(message => console.log(message))
        .catch(error => console.error(error));
});

function saveJsonToLocalStorage(key, jsonData) {
    return new Promise((resolve, reject) => {
        try {
            const jsonString = JSON.stringify(jsonData);
            localStorage.setItem(key, jsonString);
            resolve('Guardado exitosamente en localStorage');
        } catch (error) {
            reject('Error al guardar en localStorage: ' + error.message);
        }
    });
}


// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
//     enlace.href="mailto:diland0206@gmail.com";
// }

const $form = document.querySelector('#form');

$form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(this);
    const messageData = {
        name: form.get('name'),
        email: form.get('email'),
        phone: form.get('phone'),
        company: form.get('company'),
        subject: form.get('subject'),
        message: form.get('message')
    };

    sendMessage(messageData)
        .then((response) => {
            if (response.success) {
                this.reset();
                Swal.fire({
                    toast: true,
                    icon: 'success',
                    title: '<center>Mensaje enviado</center><center>¡Le contestaremos pronto!</center>',
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                })
            } else {
                console.error(response.message);
            }
        }).catch((error) => {
            console.error("Error al enviar el mensaje:", error);
        });
}