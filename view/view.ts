/// Reactive statefull lazy ViewModel 
class $mol_view extends $mol_model {

	/// Name of element that creates when element not found in DOM
	tagName() {
		return this.prop( 'div' )
	}
	
	/// Namespace of element that create when element not found in DOM
	nameSpace() {
		return this.prop( 'http://www.w3.org/1999/xhtml' )
	}

	/// Child ViewModels|Nodes|primitives
	child() { return this.prop( null ) }
	childNodes() { return this.child() }

	/// List of attribute names like [ 'type' , 'required' , 'mol_view_error' ]
	attrNames() {
		if( this.hasOwnProperty( '_attrNames' ) ) return this._attrNames
		var names = this._attrNames = []
		for( var key in this ) {
			if( key.substring( 0 , 5 ) !== 'attr_' ) continue
			if( typeof this[ key ] !== 'function' ) continue
			names.push( key.substring( 5 ) )
		}
		return names
	}
	_attrNames : string[]
	
	/// List of field names like [ 'value' , 'scrollTop' , 'style_top' ]
	fieldNames() {
		if( this.hasOwnProperty( '_fieldNames' ) ) return this._fieldNames
		var names = this._fieldNames = []
		for( var key in this ) {
			if( key.substring( 0 , 6 ) !== 'field_' ) continue
			if( typeof this[ key ] !== 'function' ) continue
			names.push( key.substring( 6 ) )
		}
		return names
	}
	_fieldNames : string[]
	
	/// List of event names  like [ 'click' , 'scroll' ]
	eventNames() {
		if( this.hasOwnProperty( '_eventNames' ) ) return this._eventNames
		var names = this._eventNames = []
		for( var key in this ) {
			if( key.substring( 0 , 6 ) !== 'event_' ) continue
			if( typeof this[ key ] !== 'function' ) continue
			names.push( key.substring( 6 ) )
		}
		return names
	}
	_eventNames : string[]
	
	/// DOM Node that creates when not fount in DOm by id = this.objectPath
	@ $jin2_grab
	node() {
		return new $jin2_vary( () => {
			var id = this.objectPath
			var prev = <Element> document.getElementById( id )
			
			if( !prev ) {
				prev = document.createElementNS( this.nameSpace().get() , this.tagName().get() )
				prev.setAttribute( 'id' , id )
			}
			
			/// Attah event handlers
			Object.getPrototypeOf( this ).eventNames().forEach( name => {
				var prop = this[ 'event_' + name ]()
				prev.addEventListener( name , event => {
					prop.set( event )
					$jin2_atom.induce()
				} )
			} )
			
			/// Set BEM-like block-attributes with inheritance support
			var proto1 = this.objectOwner
			while( proto1 && ( proto1.constructor !== $mol_view ) && ( proto1.constructor !== Function ) ) {
				var className = $jin2_object_path( proto1.constructor )
				if( !className ) continue
				prev.setAttribute( className.replace( /\$/g , '' ) + '_' + this.objectName.replace( /\(.*/g , '' ) , '' )
				proto1 = Object.getPrototypeOf( proto1 )
			}
	
			/// Set BEM-like element-attributes with inheritance support
			var proto2 = this
			while( proto2 && ( proto2.constructor !== $mol_view ) ) {
				var className = $jin2_object_path( proto2.constructor )
				if( !className ) continue
				prev.setAttribute( className.replace( /\$/g , '' ) , "" )
				proto2 = Object.getPrototypeOf( proto2 )
			}
			
			return prev
		} )
	}

	@ $jin2_grab
	version( ) { 
		var prop = this.atom( () => {
			var prev = this.node().get()
			
			/// Update dynamic attributes
			Object.getPrototypeOf( this ).attrNames().forEach( name => {
				var n = this[ 'attr_' + name ]().get()
				if( n == null ) {
					prev.removeAttribute( name )
				} else {
					prev.setAttribute( name , String( n ) )
				}
			} )

			/// Render child nodes
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
							view.version().get()
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

			// Update element fields
			Object.getPrototypeOf( this ).fieldNames().forEach( path => {
				var names = path.split( '_' )
				var obj = prev
				for( var i = 0 ; i < names.length - 1 ; ++i ) {
					if( names[i] ) obj = obj[ names[i] ]
				}
				obj[ names[ names.length - 1 ] ] = this[ 'field_' + path ]().get()
			} )
			
			prev.removeAttribute( 'mol_view_error' )
			
			return prev
		})
		prop['fail_'] = ( error ) => {
			var node = this.node().get()
			node.setAttribute( 'mol_view_error' , error.message )
			return node
		} 
		return prop
	}
	
}

/// Namespace for autogenerated from *.view.tree ViewModels
module $mol {}

/// Decorator that replaces autogenerated View Model by custom class
function $mol_replace( Class ) {
	$mol[ Class.name ] = Class
	window[ Class.name ] = Class
	return Class
}

/// Autorender views to dom
document.addEventListener( 'DOMContentLoaded' , event => {
	var nodes = document.querySelectorAll( '[mol_view_app]' )
	for( var i = nodes.length - 1 ; i >= 0 ; --i ) {
		var node = nodes[i]
		var klass = node.getAttribute( 'mol_view_app' )
		node.id = klass + '.app()'
		var app = $mol[klass].app() 
		app.node().get()
		app.version().get()
	}  
} )