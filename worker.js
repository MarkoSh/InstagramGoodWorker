// ==UserScript==
// @name         Good worker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.instagram.com/*
// @grant        none
// ==/UserScript==

( function( dom, body, ls) {
    'use strict';

    if ( 'https://www.instagram.com/about/us/' == window.location.href ) {
        
        dom.head.innerHTML = '';
        dom.title = 'Отличный работник для инстаграма';
        
        body.innerHTML = '';
    
        let styles = [
            {
                href        : '//stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
                integrity   : 'sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO',
                crossorigin : 'anonymous'
            }, {
                href        : '//fonts.googleapis.com/icon?family=Material+Icons'
            }, {
                href        : '//use.fontawesome.com/releases/v5.8.1/css/all.css',
                integrity   : 'sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf',
                crossorigin : 'anonymous'
            }, {
                href        : '//cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css'
            }
        ];
    
        styles.forEach( style => {
            let link = dom.createElement( 'link' );
            Object.keys( style ).forEach( key => {
                link.setAttribute( key, style[ key ] );
            } );
            link.setAttribute( 'rel', 'stylesheet' );    
            dom.head.appendChild( link );
        } );    
    
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
            src         : '//cdn.jsdelivr.net/npm/vanilla-lazyload@11.0.6/dist/lazyload.min.js'
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
    }

    

} )( document, document.body, localStorage );

function startApplication( dom, body, ls ) {

    let application_el = dom.createElement( 'div' );
    body.appendChild( application_el );
    application_el.id = 'application';

    let nav = dom.createElement( 'nav' );
    application_el.appendChild( nav );
    nav.setAttribute( 'class', 'navbar navbar-expand-lg navbar-dark bg-dark' );

    let html = `
    <a class="navbar-brand" href="//www.instagram.com/about/us/">Работник для Инстаграма</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item" v-for="link in nav.links">
                <a class="nav-link" :href="link.href" :onclick="link.func">{{ link.text }}</a>
            </li>
        </ul>
    </div>
    `;
    nav.innerHTML = html;

    let container = dom.createElement( 'div' );
    application_el.appendChild( container );
    container.id = 'main';
    container.classList.add( 'container-fluid' );
    container.style[ 'padding-top' ] = '15px';
    container.style[ 'padding-bottom' ] = '15px';
    container.innerHTML      = '<div class="row" v-if="igs"><card v-for="card in cards" v-bind:title="card.title" v-bind:src="card.src" v-bind:text="card.text"></card></div>';
    container.innerHTML     += '<alert v-if="! igs" v-bind:message="alert.message"></alert>';

    let alert = dom.createElement( 'div' );
    alert.setAttribute( 'role', 'alert' );
    alert.setAttribute( 'class', 'alert alert-warning' );
    alert.innerHTML = '{{ message }}';

    Vue.component( 'alert', {
        props   : [
            'message'
        ],
        template: alert.outerHTML
    } );

    let col = dom.createElement( 'div' );
    col.classList.add( 'col-sm-2' );
    col.style[ 'padding-top' ] = '15px';
    col.style[ 'padding-bottom' ] = '15px';
    let card = dom.createElement( 'div' );
    col.appendChild( card );
    card.classList.add( 'card' );
    let img = dom.createElement( 'img' ); card.appendChild( img );
    img.classList.add( 'card-img-top' );
    img.setAttribute( ':data-src', 'src' );
    img.src = '//via.placeholder.com/300'
    img.alt = '...';
    let card_body = dom.createElement( 'div' ); card.appendChild( card_body );
    card_body.classList.add( 'card-body' );
    let card_title = dom.createElement( 'h5' ); card_body.appendChild( card_title );
    card_title.classList.add( 'card-title' );
    card_title.innerText = '{{ title }}';
    let card_text = dom.createElement( 'p' ); card_body.appendChild( card_text );
    card_text.classList.add( 'card-text' );
    card_text.innerText = '{{ text }}';

    Vue.component( 'card', {
        props   : [
            'src', 'title', 'text'
        ],
        template: col.outerHTML
    } );

    let application = new Vue( {
        el		: '#application',
        data 	: {
            igs     : ls.getItem( 'igs' ),
            cards   : ( () => {
                let cards = [];
                for ( let i = 0; i < 100; i++ ) {
                    cards.push( {
                        title: 'Тест',
                        src: '//via.placeholder.com/500'
                    } );
                }
                return cards;
            } )(),
            alert   : {
                message: 'В базе нет записей, посещайте интересующие вас профили и добавляйте их в базу'
            },
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

    Vue.nextTick( () => {
        let ll = new LazyLoad( {
            elements_selector: "img.card-img-top"
            // ... more custom settings?
        } );
    } );
}