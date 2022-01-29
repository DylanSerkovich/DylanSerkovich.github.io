const nav = document.querySelector('.nav'); //nav
const menu_btn = document.querySelector('.nav__menu'); //boton
const menu = document.querySelector('.nav__list'); //ul
const secciones = document.querySelectorAll('section'); //secciones

const flagsElement =document.getElementById('flags');
const textsToChange = document.querySelectorAll("[data-section]");
let idioma = window.navigator.language || navigator.userLanguage || navigator.browserLanguage;

const btnSwitch = document.querySelector('#checkTheme');
let ButtonThemeActive=()=>btnSwitch.classList.toggle('checkTheme--dark');
let ButtonThemeDesactive=()=>btnSwitch.classList.remove('checkTheme--dark');

const maquina1= document.getElementById('machineTipe')

// const texto = maquina1.textContent ? maquina1.textContent : maquina1.innerText;

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
        currentlyActive.classList.remove("nav__item--active");
      }
    if (shouldbeActive) {
        shouldbeActive.classList.add("nav__item--active");
    }
}


const FlagsContainer = document.querySelector(".flags");

function StylesFalgs(left,opacity){
    FlagsContainer.style.left=left;
    FlagsContainer.style.opacity=opacity;
}
//Funcion para maquina de escribir
let maquinaEscribir1 =( text ='',tiempo, etiqueta ='') =>{
    let arrayCaracteres =text.split('')
    etiqueta.innerHTML =''
    // maquina1.innerHTML ="";
    let cont=0;
    let escribir = setInterval(function(){
        etiqueta.innerHTML+=arrayCaracteres[cont]
        cont++
        if(cont===arrayCaracteres.length){
            clearInterval(escribir)
            StylesFalgs("15em","1");
        }
    },tiempo)
    
}

// window.addEventListener("load", function(){
//     maquinaEscribir1(texto,120,maquina1)
// });

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
    const texto = maquina1.textContent ? maquina1.textContent : maquina1.innerText;
    maquinaEscribir1(texto,120,maquina1);
};

flagsElement.addEventListener('click', (e)=>{
    StylesFalgs("-30px","0");
    changeLanguage(e.target.parentElement.dataset.language);
});

if(!!localStorage.getItem('language')){
    changeLanguage(localStorage.getItem('language'))
}else{
    if(idioma.slice(0,2)==='en'||idioma.slice(0,2)==='es'){
        changeLanguage(idioma.slice(0,2));
    }else{
        changeLanguage('es');
    }
    
}

//Codigo Modo Oscuro

function ThemeMode(buttonBehaviur,theme){
    document.documentElement.setAttribute('data-theme',theme);
    buttonBehaviur();
    localStorage.setItem('theme-mode',theme);
}

btnSwitch.addEventListener('click', () => {
    if(document.documentElement.getAttribute('data-theme')==='dark'){
        ThemeMode(ButtonThemeDesactive,'light');
    }else{
        ThemeMode(ButtonThemeActive,'dark');
    }
});

document.addEventListener("DOMContentLoaded", function(){

    if(!!localStorage.getItem('theme-mode')){
        if(localStorage.getItem('theme-mode') === 'dark'){
            ThemeMode(ButtonThemeActive,'dark');  
        }else{
            ThemeMode(ButtonThemeDesactive,'light'); 
        }
    }else{
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            ThemeMode(ButtonThemeActive,'dark');
        }
    }

});


if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    enlace.href="mailto:diland0206@gmail.com";
}