/** examples **/

// import popup from "./js/popup.js"
import form from "./js/form.js"

/** Main code **/

// import { jarallax } from "jarallax";

import './styles/main.scss'
import {logPlugin} from "@babel/preset-env/lib/debug";

// jarallax(document.querySelectorAll('.jarallax'), {
//     speed: 0.3
// });


document.addEventListener('DOMContentLoaded', () => {

/**
 * Проверка на мобильные устройства
 */
    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (
                isMobile.Android()
                || isMobile.BlackBerry()
                || isMobile.iOS()
                || isMobile.Opera()
                || isMobile.Windows()
            );
        }
    };

    if (isMobile.any()) {
        document.body.classList.add('_mobile')
    } else {
        document.body.classList.add('_desktop')
    }


/**
 * Прокуратка при клике
 */

//основное меню
    const menuLinks = document.querySelectorAll('.nav__link[data-goto]')

    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener('click', onMenuLinkClick)
        })

        function onMenuLinkClick(e) {
            const menuLink = e.target

            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {

                const gotoBlock = document.querySelector(menuLink.dataset.goto)

                //pageYOffset - количество прокрученных пикселей
                //необходимо заминусовать размер шапки элемента - ДОЕЗД

                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.nav').offsetHeight

                window.scrollTo({
                    top: gotoBlockValue,
                    //Плавная прократука
                    behavior: 'smooth'
                })
                e.preventDefault()
                changeMenuIcon()
                closeList()

            }
        }
    }
    //Проверка на скролл -> анимация первого экрана
    window.addEventListener('scroll', () => {

        // console.log(document.body.scrollTop)
        if (pageYOffset > 0) {
            document.body.classList.add('_scrolled')
        } else {
            document.body.classList.remove('_scrolled')

        }

    })

})


let hamburger = document.querySelector('.hamburger')
let icon = document.querySelector('.hamburger__icon')
let xClass = 'bx-x'
let menuClass = 'bx-menu'
let open = false

let menuList = document.querySelector('.nav__list_main')
let menuElements = menuList.children

let menuArray = Array.from(menuElements)

console.log(menuElements)


function changeMenuIcon(){
    if (open) {
        icon.classList.remove(xClass)
        icon.classList.add(menuClass)

    } else {
        icon.classList.remove(menuClass)
        icon.classList.add(xClass)
    }
}

function closeList(){
    menuArray.forEach((element) => {
        element.classList.add('nav__element_closed')
    })
    menuList.classList.add('nav__list_closed')

    open = false
    console.log('list closed')
}

function openList(){

    menuArray.forEach((element) => {
        element.classList.remove('nav__element_closed')
    })
    menuList.classList.remove('nav__list_closed')

    open = true

    console.log('list opened')

}


hamburger.addEventListener('click',()=> {

    changeMenuIcon()
    if (open) {
        closeList()
    } else {
        openList()
    }








})


