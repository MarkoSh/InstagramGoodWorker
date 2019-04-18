// ==UserScript==
// @name         Отличный работник для инстаграма
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.instagram.com/*
// @grant        none
// ==/UserScript==

( function( sd, dom, body, ls) {
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
            }, {
                href        : '//cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css'
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
            src         : '//cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/js/swiper.min.js'
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
    } else {
        if ( ! sd.entry_data.ProfilePage ) return true;
        let ig = sd.entry_data.ProfilePage[ 0 ].graphql.user;
        let igs = ls.getItem( 'igs' ) ? JSON.parse( ls.getItem( 'igs' ) ) : [];
        let checkLoaded = () => {
            let defaultBtn = document.querySelector( 'button' );
            if ( ! defaultBtn ) {
                setTimeout( checkLoaded, 500 );
            } else {
                let button = dom.createElement( 'button' );
                button.setAttribute( 'style', 'position: fixed; border-radius: 3px; cursor: pointer; top: 100px; right: 100px; width: 30px; height: 30px; border: none; background: #3897f0; color: white;' );
                button.innerHTML = igs.find( ig_ => {
                    return ig_.id == ig.id;
                } ) ? '-' : '+';
                button.onclick = e => {
                    if ( igs.find( ig_ => {
                        return ig_.id == ig.id;
                    } ) ) {
                        igs = igs.filter( ig_ => {
                            return ig_.id != ig.id;
                        } );
                    } else igs = [ ig ].concat( igs );
                    ls.setItem( 'igs', JSON.stringify( igs ) );
                    checkLoaded();
                };
                body.appendChild( button );
            }
        };
        checkLoaded();
    }

} )( window._sharedData, document, document.body, localStorage );

function getCookie( name ) {
    var matches = document.cookie.match( new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function startApplication( dom, body, ls ) {

    let application_el = dom.createElement( 'div' );
    body.appendChild( application_el );
    application_el.id = 'application';
    application_el.style[ 'padding-top' ] = '56px';

    let nav = dom.createElement( 'nav' );
    application_el.appendChild( nav );
    nav.setAttribute( 'class', 'navbar navbar-expand-lg navbar-dark bg-dark fixed-top' );

    let html = '<a class="navbar-brand" href="//www.instagram.com/about/us/">Работник для Инстаграма</a>';
    nav.innerHTML = html;

    let container = dom.createElement( 'div' );
    application_el.appendChild( container );
    container.id = 'main';
    container.classList.add( 'main' );
    container.style[ 'padding-top' ] = '15px';
    container.style[ 'padding-bottom' ] = '15px';
    container.innerHTML      = `
    <div class="container">
        <alert v-if="! cards" v-bind:message="alert.message"></alert>
        <div class="row" v-if="cards">
            <card v-for="card in cards" :key="card.id"

            v-bind:full_name="card.full_name" 
            v-bind:profile_pic_url="card.profile_pic_url" 
            v-bind:profile_pic_url_hd="card.profile_pic_url_hd"
            v-bind:biography="card.biography"
            v-bind:id="card.id"
            v-bind:url="card.url"

            ></card>
        </div>
    </div>
    `;

    let tasks_list = dom.createElement( 'div' );
    tasks_list.classList.add( 'list-group' );
    tasks_list.onmouseenter = e => {
        debugger;
    };
    tasks_list.onmouseleave = e => {
        debugger;
    };
    tasks_list.innerHTML = `
    <task v-for="task in tasks" :key="task.id" 

    v-bind:id="task.id"
    v-bind:node_id="task.node_id"
    v-bind:thumbnail_src="task.thumbnail_src"
    v-bind:url="task.url"
    v-bind:mode="task.mode"
    v-bind:status="task.task.status"
    >
    </task>
    `;
    application_el.appendChild( tasks_list );
    tasks_list.setAttribute( 'style', 'position: fixed; top: 100px; right: 0px; bottom: 15px; overflow: auto;' );

    let list_group_item = dom.createElement( 'a' );
    list_group_item.setAttribute( 'class', 'list-group-item list-group-item-action' );
    list_group_item.setAttribute( ':class', '{ "list-group-item-warning": status == "process" }' );
    list_group_item.setAttribute( ':href', 'url' );
    list_group_item.setAttribute( 'target', '_blank' );
    let thumbnail = dom.createElement( 'img' ); list_group_item.appendChild( thumbnail );
    thumbnail.setAttribute( ':src', 'thumbnail_src' );
    thumbnail.setAttribute( 'style', 'width: 50px;' );
    list_group_item.innerHTML += `
    <span style="display: inline-block; vertical-align: middle; padding: 0 10px;">Задача {{ id }} - режим {{ mode }}<br />
    Статус {{ status }}</span>
    `;

    let task_component = {
        props   : [ 'id', 'thumbnail_src', 'url', 'task', 'mode', 'status' ],
        template: list_group_item.outerHTML,
        data: function () {
            return {};
        }
    };

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
    col.classList.add( 'col-sm-4' );
    col.style[ 'padding-top' ] = '15px';
    col.style[ 'padding-bottom' ] = '15px';
    let card = dom.createElement( 'div' );
    col.appendChild( card );
    card.classList.add( 'card' );
    card.classList.add( 'shadow' );
    let img = dom.createElement( 'img' ); card.appendChild( img );
    img.classList.add( 'card-img-top' );
    img.setAttribute( ':data-src', 'profile_pic_url_hd' );
    img.setAttribute( ':src', 'profile_pic_url_' );
    img.setAttribute( 'v-on:mouseenter', 'startShow' );
    img.setAttribute( 'v-on:mouseleave', 'stopShow' );
    img.alt = '...';
    let card_body = dom.createElement( 'div' ); card.appendChild( card_body );
    card_body.classList.add( 'card-body' );
    let card_title = dom.createElement( 'h5' ); card_body.appendChild( card_title );
    card_title.classList.add( 'card-title' );
    card_title.innerHTML = '{{ full_name }}';
    let card_text = dom.createElement( 'p' ); card_body.appendChild( card_text );
    card_text.classList.add( 'card-text' );
    card_text.setAttribute( 'v-html', 'biography' );
    let card_link = dom.createElement( 'a' ); card_body.appendChild( card_link );
    card_link.classList.add( 'card-link' );
    card_link.innerHTML = '<i class="fas fa-user-minus fa-lg"></i>';
    card_link.setAttribute( 'href', '#' );
    card_link.setAttribute( 'title', 'Удалить из базы' );
    card_link.setAttribute( 'v-on:click.prevent', 'removeIg' );

    card_link = dom.createElement( 'a' ); card_body.appendChild( card_link );
    card_link.classList.add( 'card-link' );
    card_link.innerHTML = '<i class="fas fa-link fa-lg"></i>';
    card_link.setAttribute( ':href', 'url' );
    card_link.setAttribute( 'title', 'Перейти в профиль' );
    card_link.setAttribute( 'target', '_blank' );
    card_link.setAttribute( 'data-toggle', 'tooltip' );
    card_link.setAttribute( 'data-placement', 'bottom' );

    card_link = dom.createElement( 'a' ); card_body.appendChild( card_link );
    card_link.classList.add( 'card-link' );
    card_link.innerHTML      = '<i class="fas fa-heart fa-lg"></i>';
    card_link.setAttribute( 'href', '#' );
    card_link.setAttribute( 'title', 'Отправить лайк' );
    card_link.setAttribute( 'v-on:click.prevent', 'sendLike' );
    card_link.setAttribute( 'data-toggle', 'tooltip' );
    card_link.setAttribute( 'data-placement', 'bottom' );

    card_link = dom.createElement( 'a' ); card_body.appendChild( card_link );
    card_link.classList.add( 'card-link' );
    card_link.innerHTML      = '<i class="fas fa-heartbeat fa-lg"></i>';
    card_link.setAttribute( 'href', '#' );
    card_link.setAttribute( 'title', 'Отправить лайки' );
    card_link.setAttribute( 'v-on:click.prevent', 'sendLikes' );
    card_link.setAttribute( 'data-toggle', 'tooltip' );
    card_link.setAttribute( 'data-placement', 'bottom' );

    card_link = dom.createElement( 'a' ); card_body.appendChild( card_link );
    card_link.classList.add( 'card-link' );
    card_link.innerHTML      = '<i class="fas fa-comment fa-lg"></i>';
    card_link.setAttribute( 'href', '#' );
    card_link.setAttribute( 'title', 'Отправить комментарий' );
    card_link.setAttribute( 'v-on:click.prevent', 'sendComment' );
    card_link.setAttribute( 'v-on:dbkclick.native.prevent', 'sendComments' );
    card_link.setAttribute( 'data-toggle', 'tooltip' );
    card_link.setAttribute( 'data-placement', 'bottom' );

    card_link = dom.createElement( 'a' ); card_body.appendChild( card_link );
    card_link.classList.add( 'card-link' );
    card_link.innerHTML      = '<i class="fas fa-comments fa-lg"></i>';
    card_link.setAttribute( 'href', '#' );
    card_link.setAttribute( 'title', 'Отправить комментарии' );
    card_link.setAttribute( 'v-on:click.prevent', 'sendComments' );
    card_link.setAttribute( 'data-toggle', 'tooltip' );
    card_link.setAttribute( 'data-placement', 'bottom' );
    
    let card_component = {
        props   : [
            'profile_pic_url_hd',
            'profile_pic_url',
            'full_name',
            'biography',
            'id',
            'url'
        ],
        template: col.outerHTML,
        methods: {
            removeIg: function ( e ) {
                let id = this.id;
                application.cards = application.cards.filter( ig => {
                    return ig.id != id;
                } );
                application.tasks = tasks( application.cards );
                ls.setItem( 'igs', JSON.stringify( application.cards ) );
            },
            sendLike: function ( e ) {
                let id = this.id;
                let ig = application.cards.find( ig => {
                    return ig.id == id;
                } );
                let image = ig.edge_owner_to_timeline_media.edges[ 0 ].node;
                this.$parent.addTask( 'like', image, null );
            },
            sendLikes: function ( e ) {
                let id = this.id;
                let ig = application.cards.find( ig => {
                    return ig.id == id;
                } );
                let images = ig.edge_owner_to_timeline_media.edges;
                images.forEach( image => {
                    this.$parent.addTask( 'like', image.node, null );
                } );
            },
            sendComment: function ( e ) {
                let id = this.id;
                let ig = application.cards.find( ig => {
                    return ig.id == id;
                } );
                let image = ig.edge_owner_to_timeline_media.edges[ 0 ].node;
                this.$parent.addTask( 'comment', image, null );
            },
            sendComments: function ( e ) {
                let id = this.id;
                let ig = application.cards.find( ig => {
                    return ig.id == id;
                } );
                let images = ig.edge_owner_to_timeline_media.edges;
                images.forEach( image => {
                    this.$parent.addTask( 'comment', image.node, null );
                } );
            },
            startShow: function ( e ) {
                let id = this.id;
                let ig = application.cards.find( ig => {
                    return ig.id == id;
                } );
                let images = ig.edge_owner_to_timeline_media.edges;
                let index = 0;
                this.t = setInterval( () => {
                    let image_url = images[ index++ ].node.thumbnail_src;
                    this.profile_pic_url_ = image_url;
                    index = index < images.length ? index : 0;
                }, 1000 );
            },
            stopShow: function ( e ) {
                clearInterval( this.t );
            },
        },
        data: function () {
            return {
                profile_pic_url_: this.profile_pic_url
            };
        }
    };


    let igs     = ls.getItem( 'igs' ) ? JSON.parse( ls.getItem( 'igs' ) ) : false;
    let tasks   = ( igs ) => {
        let i = 0;
        let tasks = [];
        igs.forEach( ig => {
            ig.edge_owner_to_timeline_media.edges.forEach( edge => {
                if ( edge.node.tasks ) {
                    Object.keys( edge.node.tasks ).forEach( key => {
                        tasks.push( {
                            id              : i++,
                            node_id         : edge.node.id,
                            thumbnail_src   : edge.node.thumbnail_src,
                            url             : '//www.instagram.com/p/' + edge.node.shortcode + '/',
                            mode            : key,
                            task            : edge.node.tasks[ key ]
                        } );
                    } );
                    
                }
            } );
        } );
        shuffle( tasks );
        return tasks;
    };
    if ( igs ) {
        igs     = igs.map( ig => {
            ig[ 'url' ]     = '//www.instagram.com/' + ig.username + '/';
            ig.biography    = ig.biography.replace( /([^>])\n/g, "$1<br />" );
            return ig;
        } );
        
    }
    
    let application = new Vue( {
        el		: '#application',
        data 	: {
            t       : false,
            cards   : igs.length > 0 ? igs : false,
            tasks   : tasks( igs ),
            alert   : {
                message: 'В базе нет записей, посещайте интересующие вас профили и добавляйте их в базу'
            }
        },
        methods    : {
            addTask: function ( type, node, meta ) {
                let task = { status: 'pending', meta: meta };
                if ( ! node.tasks ) node[ 'tasks' ] = {};
                if ( ! node.tasks[ type ] ) {
                    node.tasks[ type ] = task;
                }
                application.tasks = tasks( application.cards );
                ls.setItem( 'igs', JSON.stringify( application.cards ) );
            }     
        },
        components : {
            'card'  : card_component,
            'task'  : task_component
        }
    } );

    Vue.nextTick( () => {
        let ll = new LazyLoad( {
            elements_selector: "img.card-img-top",
            load_delay: 1000
            // ... more custom settings?
        } );
        $( '[data-toggle="tooltip"]' ).tooltip();

        let i = 0;
        let t = setInterval( () => {
            let task = application.tasks[ i++ ];
            task.task.status = 'process';
            if ( i >= application.tasks.length ) clearInterval( t );
        }, 1000 );
    } );
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}