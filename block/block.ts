/** Реактивная модель отображения, представляет один элемент дерева (reactive virtual dom). */
class $mol_block extends $jin2_atom<any> {

    /** Любой компонент может быть отдельным приложением, доступным по пути вида: klassName.app(id?) */
	@ $jin2_grab
	static app( id : string ) {
		return new this()
	}
	
	get() : this {
		return super.get()
	}
	
	_ = this
	error = null

    /** Имя элемента (используется для создания, если элемент не найден в дереве). */
    tagName() {
        return new $jin2_prop( 'div' )
    }
    
    /** Пространсто имён элемента (используется для создания, если элемент не найден в дереве). */
    nameSpace() {
        return new $jin2_prop( 'http://www.w3.org/1999/xhtml' )
    }

    /** Список дочерних элементов. */
    child() {
        return new $jin2_atom( () => null )
    }

    childNodes() {
        return this.child()
    }

    /** Словарь аттрибутов. */
    attr() {
        var attr = <{ [ index : string ] : $jin2_prop_iface<string> }> {}
        for( var key in this ) {
            if( typeof this[ key ] !== 'function' ) continue
            if( key.substring( 0 , 5 ) !== 'attr_' ) continue
            attr[ key.substring( 5 ) ] = this[ key ]()
        }
        return attr
    }
    
    /** Словарь полей элемента (поддерживаются ключи вида "style.top"). */
    field() {
        var field = <{ [ index : string ] : $jin2_prop_iface<any> }> {}
        for( var key in this ) {
            if( typeof this[ key ] !== 'function' ) continue
            if( key.substring( 0 , 6 ) !== 'field_' ) continue
            field[ key.substring( 6 ) ] = this[ key ]()
        }
        return field
    }
    
    /** Словарь обработчиков событий (объект события помещается в соответствующее свойство). */
    event() {
        var event = <{ [ index : string ] : $jin2_prop_iface<Event> }> {}
        for( var key in this ) {
            if( typeof this[ key ] !== 'function' ) continue
            if( key.substring( 0 , 6 ) !== 'event_' ) continue
            event[ key.substring( 6 ) ] = this[ key ]()
        }
        return event
    }
    
    /** DOM-элемент. Если не находится в дереве по objectPath, то создаётся. */
    @ $jin2_grab
    node() {
        return new $jin2_vary( () => {
            var id = this.objectPath
            var prev = <Element> document.getElementById( id )
            
            if( !prev ) {
                prev = document.createElementNS( this.nameSpace().get() , this.tagName().get() )
                prev.setAttribute( 'id' , id )
            }
            
            // Навешиваем обработчики событий
            var router = prev // ( document.body === prev ) ? document : prev
            var events = this.event()
            for( var name in events ) ( name => {
                var prop = events[ name ]
                router.addEventListener( name , event => {
                    prop.set( event )
                    requestAnimationFrame( $jin2_atom.induce.bind( $jin2_atom ) ) 
                } , false )
            } )( name )
            
            //Устанавливаем аттрибуты элемента (БЭМ) для стилизации
            var proto1 = this.objectOwner
            while( proto1 && ( proto1.constructor !== $mol_block ) && ( proto1.constructor !== Function ) ) {
                var className = $jin2_object_path( proto1.constructor )
                if( !className ) continue
                prev.setAttribute( className.replace( /\$/g , '' ) + '_' + this.objectName , '' )
                proto1 = Object.getPrototypeOf( proto1 )
            }
    
            // Устанавливаем аттрибуты блока (БЭМ) для стилизации
            var proto2 = this
            while( proto2 && ( proto2.constructor !== $mol_block ) ) {
                var className = $jin2_object_path( proto2.constructor )
                if( !className ) continue
                prev.setAttribute( className.replace( /\$/g , '' ) , "" )
                proto2 = Object.getPrototypeOf( proto2 )
            }
            
            var onAttach = event => {
                prev.removeEventListener( 'DOMNodeInserted' , onAttach )
                this.version().pull()
            }
            if( prev.parentNode ) {
                setTimeout( onAttach )
            } else {
                prev.addEventListener( 'DOMNodeInserted' , onAttach )
            }
            
            return prev
        } )
    }

    @ $jin2_grab
    version( ) { 
        var prop = new $jin2_atom( () => {
        var prev = this.node().get()
        
        // Устанавливаем пользовательские аттрибуты 
        var attrs = this.attr()
        for( var name in attrs ) {
            var p = prev.getAttribute( name )
            var n = String( attrs[ name ].get() )
            if( p !== n ) {
                prev.setAttribute( name , n )
            }
        }

        // Рендерим дочерние элементы
        var childs = this.childNodes().get()
        if( childs != null ) {
            var childViews = [].concat.apply( [] , [].concat( childs ) )
            var childNodes = prev.childNodes

            var nextNode = prev.firstChild
            for( var i = 0 ; i < childViews.length ; ++i ) {
                var view = childViews[i]

                if( typeof view === 'object' ) {
                    if( view ) {
                        var existsNode = view.node().get()
                        while( true ) {
                            if( !nextNode ) {
                                prev.appendChild(existsNode)
                                break
                            }
                            if( nextNode == existsNode ) {
                                nextNode = nextNode.nextSibling
                                break
                            } else {
                                if( childViews.indexOf( nextNode ) === -1 ) {
                                    var nn = nextNode.nextSibling
                                    prev.removeChild( nextNode )
                                    nextNode = nn
                                } else {
                                    prev.insertBefore(existsNode, nextNode)
                                    break
                                }
                            }
                        }
                    } 
                } else {
                    if( nextNode && nextNode.nodeName === '#text' ) {
                        nextNode.nodeValue = String( view )
                        nextNode = nextNode.nextSibling
                    } else {
                        var textNode = document.createTextNode( String( view ) )
                        prev.insertBefore( textNode , nextNode )
                    }
                }
            }

            while( nextNode ) {
                var currNode = nextNode
                nextNode = currNode.nextSibling
                prev.removeChild( currNode )
            }
        }

        // Убновляем поля элемента
        var fields = this.field()
        for( var path in fields ) {
            var names = path.split( '_' )
            var obj = prev 
            for( var i = 0 ; i < names.length - 1 ; ++i ) {
               if( names[i] ) obj = obj[ names[i] ]
            }
            obj[names[names.length-1]] = fields[path].get()
        }
        
        prev.removeAttribute( 'mol_error' )
        
        return prev
    })
    prop.fail_ = ( error ) => {
        var node = this.node().get()
        if( error === $jin2_atom.wait ) {
            node.setAttribute( 'mol_error' , 'wait' )
        } else {
            node.setAttribute( 'mol_error' , 'fail' )
        }
        return node
    } 
    return prop
    }
    
}

module $mol {}

function $mol_replace( Class ) {
    $mol[ Class.name ] = Class
    window[ Class.name ] = Class
    return Class
}