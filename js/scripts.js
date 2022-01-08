const nav = document.querySelector('.nav'); //nav
const menu_btn = document.querySelector('.nav__menu'); //boton
const menu = document.querySelector('.nav__list'); //ul
const secciones = document.querySelectorAll('section'); //secciones

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

//Codigo Modo Oscuro

const btnSwitch = document.querySelector('#checkTheme');

let ButtonThemeActive=()=>btnSwitch.classList.toggle('checkTheme--dark');

let ButtonThemeDesactive=()=>btnSwitch.classList.remove('checkTheme--dark');

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

const maquina1= document.getElementById('machineTipe')
const texto = maquina1.textContent ? maquina1.textContent : maquina1.innerText;

const maquinaEscribir1 =( text ='',tiempo, etiqueta ='') =>{
    let arrayCaracteres =text.split('')
    etiqueta.innerHTML =''
    let cont=0
    let escribir = setInterval(function(){
        etiqueta.innerHTML+=arrayCaracteres[cont]
        cont++
        if(cont===arrayCaracteres.length){
            clearInterval(escribir)
        }
    },tiempo)
}
maquinaEscribir1(texto,120,maquina1)
