@ $mol_replace
class $mol_stringer extends $mol.$mol_stringer {
    
    @ $jin2_grab
    presses() {
        return new $jin2_atom( () => null , next => {
            
            if( next.keyCode === 13 ) {
                this.commits().set( next )
            }
            
            if( next.keyCode === 27 ) {
                this.reverts().set( next )
            }
            
            this.valueView().set( next.target.textContent.trim() )
            
        } )
    }

    @ $jin2_grab
    commits() {
        return new $jin2_atom( () => null , next => {
            next.preventDefault()

            var text = next.target.textContent.trim()
            this.value().set( text )
			
			this.reverts().set( next )
        } )
    }

    @ $jin2_grab
    reverts() {
        return new $jin2_atom( () => null , next => {
            next.preventDefault()

            var text = this.value().get()
            next.target.textContent = text
			
			next.target.blur()

        } )
    }

}

