/** examples **/

// import popup from "./js/popup.js"
// import form from "./js/form.js"

/** Main code **/

// import { jarallax } from "jarallax";

import './styles/main.scss'
import {logPlugin} from "@babel/preset-env/lib/debug";

// jarallax(document.querySelectorAll('.jarallax'), {
//     speed: 0.3
// });


document.addEventListener('DOMContentLoaded', () => {

//Проверка на мобильные устройства
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



//Прокуратка при клике
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

                /*
                if (iconMenu.classList.contains('_active')) {
                    document.body.classList.remove('_lock')
                    iconMenu.classList.remove('_active')
                    menuBody.classList.remove('_active')
                }

                */

                window.scrollTo({
                    top: gotoBlockValue,
                    //Плавная прократука
                    behavior: 'smooth'
                })
                e.preventDefault()
            }
        }
    }
    //Проверка на скролл -> анимация первого экрана
    window.addEventListener('scroll', () => {

        console.log(document.body.scrollTop)
        if (pageYOffset > 0) {
            document.body.classList.add('_scrolled')
        } else {
            document.body.classList.remove('_scrolled')

        }

    })

})