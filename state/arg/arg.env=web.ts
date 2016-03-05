class $mol_state_arg extends $jin2_atom<string> {

	key() { return new $jin2_prop( '' ) }

    item( key : string ) {
		var prefix = this.key().get()
		return $mol_state_arg.item( prefix ? ( prefix + '.' + key ) : key )
    }
	
    @ $jin2_grab
	link( next : string ) {
		return new $jin2_prop( () => $mol_state_arg.make({ [ this.key().get() ] : next }) )
	}

	pull_() {
		return $mol_state_arg.dict().get()[ this.key().get() ] || null
	}

	put_( next : string ) {
		$mol_state_arg.dict().set({ [ this.key().get() ] : next })
		return next
	}

    @ $jin2_grab
    static item( key? : string ) {
		return (new this).setup( _ => {
			_.key = () => new $jin2_prop( key ) 
		} )
    }

    @ $jin2_grab
    static href() {
        return new $jin2_atom(
            () => window.location.search + window.location.hash,
            next => document.location.href = next
        )
    }

    @ $jin2_grab
    static dict() {
        return new $jin2_atom(
            () => {
                var href = this.href().get()
                var chunks = href.split( /[\/\?#!&;]/g )
                var params = <{ [ index : string ] : string }> {}
                chunks.forEach( chunk => {
                    if( !chunk ) return
                    var vals = chunk.split( /[:=]/ ).map( decodeURIComponent )
                    params[ vals[0] ] = vals[1] || ''
                })
                return params
            },
            next  => {
                this.href().set( this.make( next ) )
            }
        )
    }

    static make( next : { [ index : string ] : any } ) {
        var params = {}

        var prev = this.dict().get()
        for( var key in prev ) {
            if( key in next ) continue
            params[ key ] = prev[ key ]
        }

        for( var key in next ) {
            params[ key ] = next[ key ]
        }

        var chunks = []
        for( var key in params ) {
            if( null == params[key] ) continue
            chunks.push( [ key ].concat( params[key] ).map( encodeURIComponent ).join( '=' ) )
        }
		chunks.sort()

        return '#' + chunks.join( '#' )
    }
	
}

window.addEventListener( 'hashchange' , () => $mol_state_arg.href().update() )
