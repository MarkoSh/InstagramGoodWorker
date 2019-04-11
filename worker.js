// ==UserScript==
// @name         Good worker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.instagram.com/about/us/
// @grant        none
// ==/UserScript==

( function( dom, body, ls) {
    'use strict';

    dom.head.innerHTML = '';
    dom.title = 'Отличный работник для инстаграма';
    
    body.innerHTML = '';

    let link = dom.createElement( 'link' );
    link.setAttribute( 'rel', 'stylesheet' );
    link.setAttribute( 'href', '//stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' );
    link.setAttribute( 'integrity', 'sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO' );
    link.setAttribute( 'crossorigin', 'anonymous' );

    dom.head.appendChild( link );

    let scripts = [ {
        src			: '//code.jquery.com/jquery-3.3.1.slim.min.js',
        integrity	: 'sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo',
    }, {
        src			: '//cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
        integrity	: 'sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49',
    }, {
        src			: '//stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
        integrity	: 'sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy'
    }, {
        src			: '//cdn.jsdelivr.net/npm/vue/dist/vue.js',
    } ];

    let index = 0;
    let scriptLoader = () => {
        if ( index < scripts.length ) {
            let js = dom.createElement( 'script' );
            Object.keys( scripts[ index ] ).forEach( key => {
                js.setAttribute( key, scripts[ index ][ key ] );
            } );
            js.setAttribute( 'crossorigin', 'anonymous' );
            js.setAttribute( 'onload', 'window.dispatchEvent( new Event( "scriptLoaded" ) )' );
            body.appendChild( js );
            index++;
        } else {
            window.dispatchEvent( new Event( "startApplication" ) );
        }        
    };
    scriptLoader();

    window.addEventListener( 'scriptLoaded', () => {
        scriptLoader();
    } );

    window.addEventListener( 'startApplication', () => {
        startApplication( dom, body, ls );
    } );

} )( document, document.body, localStorage );

function startApplication( dom, body, ls ) {

    let application_el = dom.createElement( 'div' );
    body.appendChild( application_el );
    application_el.id = 'application';

    
    let nav = dom.createElement( 'nav' );
    application_el.appendChild( nav );
    nav.setAttribute( 'class', 'navbar navbar-expand-lg navbar-dark bg-dark' );

    let html = '<a class="navbar-brand" href="//www.instagram.com/about/us/">Работник для Инстаграма</a>';
    html    += '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">';
    html    += '<span class="navbar-toggler-icon"></span>';
    html    += '</button>';
    html    += '<div class="collapse navbar-collapse" id="navbarSupportedContent">';
    html    += '<ul class="navbar-nav mr-auto">';
    html    += '<li class="nav-item" v-for="link in nav.links">';
    html    += '<a class="nav-link disabled" :href="link.href" :onclick="link.func">{{ link.text }}</a>';
    html    += '</li>';
    html    += '</ul>';
    html    += '</div>';
    nav.innerHTML = html;

    let container = dom.createElement( 'div' );
    application_el.appendChild( container );
    container.id = 'main';
    container.classList.add( 'container' );
    container.style[ 'padding-top' ] = '25px';
    container.style[ 'padding-bottom' ] = '25px';
    container.setAttribute( 'v-html', 'init' );

    let application = new Vue( {
        el		: '#application',
        data 	: {
            init   : '<div class="text-center">Загрузка...</div>',
            nav    : {
                links : [
                    {
                        href: '#',
                        text: 'Лайкер',
                        func: 'javascript:likerFunc()'
                    },
                    {
                        href: '#',
                        text: 'Комментер',
                        func: 'javascript:commenterFunc()'
                    },
                    {
                        href: '#',
                        text: 'Хештагер',
                        func: 'javascript:hashtagerFunc()'
                    }
                ]
            }
        }
    } );
}