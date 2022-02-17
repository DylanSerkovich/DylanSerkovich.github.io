const nav = document.querySelector('.nav'); //nav
const menu_btn = document.querySelector('.nav__menu'); //boton
const menu = document.querySelector('.nav__list'); //ul
const secciones = document.querySelectorAll('section'); //secciones

const flagsElement =document.getElementById('flags');
const textsToChange = document.querySelectorAll("[data-section]");
let idioma = (window.navigator.language || navigator.userLanguage || navigator.browserLanguage).slice(0,2);
const idiomas=['es','en'];
const LanguageStatus =localStorage.getItem('language');

const btnSwitch = document.querySelector('#checkTheme');

const enlace= document.querySelector('.redeslist__link--gmail');

    window.addEventListener('scroll',function(){
        nav.classList.toggle('nav--active',window.scrollY >0)
    })

    function OcultarMenu(){
            menu.classList.toggle('nav__list--active')
    }

    menu_btn.addEventListener('click',OcultarMenu);
    menu.addEventListener('click',OcultarMenu);

/**
 * Visualiza que interseccion esta identificando el observador
 */
const observer =new IntersectionObserver((entradas, observer)=>{
    entradas.forEach(entrada =>{
        if(entrada.isIntersecting){
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
function interseccionHandler(entrada){
    const id = entrada.target.id;
    
    const currentlyActive = document.querySelector(".nav__list .nav__item--active");
    const shouldbeActive =document.querySelector(".nav__list [data-ref=" + id +"]");

    if (currentlyActive) {
        currentlyActive.classList.remove('nav__item--active');
      }
    if (shouldbeActive) {
        shouldbeActive.classList.add('nav__item--active');
    }
}

const FlagsContainer = document.querySelector('.flags');

//Codigo Idiomas
const changeLanguage = async (language) =>{
    const requestJson = await fetch(`./languages/${language}.json`)
    const texts = await requestJson.json();
    
    localStorage.setItem('language',language);
    for(const textToChange of textsToChange){
        const section =textToChange.dataset.section;
        const value =textToChange.dataset.value;
        textToChange.innerHTML = texts[section][value];
    }
};

flagsElement.addEventListener('click', (e)=>{
    if(!(localStorage.getItem('language')===e.target.parentElement.dataset.language)){
        changeLanguage(e.target.parentElement.dataset.language);
    }
});

//Codigo Modo Oscuro
let ButtonThemeActive=()=>btnSwitch.classList.toggle('checkTheme--dark');
let ButtonThemeDesactive=()=>btnSwitch.classList.remove('checkTheme--dark');

const ThemeOptions={'dark':  () => ThemeMode(ButtonThemeActive,'dark'),'light': () => ThemeMode(ButtonThemeDesactive,'light'), null: ()=> AddNavigatorTheme()}

function ThemeMode(buttonBehaviur,theme){
    document.documentElement.setAttribute('data-theme',theme);
    buttonBehaviur();
    localStorage.setItem('theme-mode',theme);
}

btnSwitch.addEventListener('click', () => {
    (document.documentElement.getAttribute('data-theme')==='dark') ? ThemeOptions['light'](): ThemeOptions['dark']();
});

function AddNavigatorTheme(){
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ThemeOptions['dark']()
}

const LanguageNav= (idiomas.includes(idioma))? idioma: 'en';

document.addEventListener('DOMContentLoaded', function(){
    let ThemeStatus = localStorage.getItem('theme-mode');
    ThemeOptions[ThemeStatus]();

    (!!LanguageStatus)? changeLanguage(LanguageStatus): changeLanguage(LanguageNav);
});


if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    enlace.href="mailto:diland0206@gmail.com";
}