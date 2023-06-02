let contenedor_nav = document.querySelectorAll('.contenedor-nav'); 
let foto = document.querySelector('.grid-item2');
let boton_hamburguesa = document.querySelector('.menu-mobile');
let menu = document.querySelector('.menu');
let items_menu = document.querySelectorAll('.item');
let titulo_items = document.querySelectorAll('.titulo-item');
let submenus = document.querySelectorAll('.submenu');


function ocultarElementos() {
    if (window.innerWidth <= 750) {
        contenedor_nav[2].classList.add('opcional');
        foto.classList.add('opcional');
        menu.classList.add('opcional');
        boton_hamburguesa.classList.toggle('opcional');
    }
}


ocultarElementos()

/* EVENTO RESIZE A LA VENTANA PARA Q EL BOTON HAMBURGUESA Y EL MENU SE ACOMODEN ENTRE VERSION MOBILE Y DESKTOP */
window.addEventListener("resize", function(){
    if (boton_hamburguesa.classList == 'menu-mobile opcional') {
        ocultarElementos();
    } else if (this.window.innerWidth > 750 && boton_hamburguesa.classList == 'menu-mobile') {
        contenedor_nav[2].classList.toggle('opcional');
        foto.classList.toggle('opcional');
        boton_hamburguesa.classList.add('opcional');
        // si el menu tiene la clase opcional entonces hay que sacarsela cuando se agrande la ventana
        if (menu.classList == 'menu opcional') {
            menu.classList.toggle('opcional');
        }
    } else {
        return
    }
})

/* EVENTO PARA QUE APAREZCA EL MENU AL CLIQUEAR EL BOTON */
boton_hamburguesa.addEventListener("click", function(){
    if (menu.classList == 'menu opcional') {
        menu.classList.toggle('opcional');
    } else {
        return
    }
    
})

/*EVENTO PARA QUE DESAPAREZCA EL MENU AL CLIQUEAR AFUERA DEL MISMO */
document.addEventListener("click", function(e){
    if (window.innerWidth <= 750) {
        switch (e.target.classList.value) {
            case "menu":
            case "menu-mobile":
            case "item":
            case "submenu":
            case "titulo-item":
            case "contenedor-equis":
            case "equis izquierda":
            case "equis derecha":
                break;
            default:
                menu.classList.add('opcional');
                break;    
        }
    }
})


/* EVENTO PARA QUE APAREZCA EL SUBMENU, QUITE EL TRIANGULO Y AGREGUE UNA EQUIS AL CLIQUEAR LOS ITEMS */

let num;

for (let i=0; i < items_menu.length; i++) {
    titulo_items[i].addEventListener("click", function(){
        if (submenus[i].style.maxHeight != '400px') {
            // transicion dragdown del submenu
            submenus[i].style.maxHeight = '400px';
            submenus[i].style.zIndex = '1';
            // desaparece el triangulo al cliquear
            titulo_items[i].style.setProperty('--colorTriangulo', 'transparent');
            // se crea la equis insertando codigo HTML al documento o se hace visible para poder cerrar el submenu
            titulo_items[i].insertAdjacentHTML('afterend', '<div class="contenedor-equis"><span class= "equis izquierda"></span><span class="equis derecha"></span></div>');
            num = i;
        } else {
            return
        }
    })
}

/* EVENTO PARA CERRAR EL SUBMENU AL CLIQUEAR LA EQUIS */
document.addEventListener("click", function(e){
    switch (e.target.classList.value) {
        case "contenedor-equis":
        case "equis izquierda":
        case "equis derecha":
            // transicion para retraer el submenu
            submenus[num].style.maxHeight = '0';
            // desaparece la equis
            document.querySelector('.contenedor-equis').remove();
            // reaparece el triangulo aplicando el color al borde de todos los triangulos
            titulo_items[num].style.setProperty('--colorTriangulo', '#6c6c6c');
            break;
        default:
            break;
    }
})