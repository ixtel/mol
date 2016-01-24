@ $mol_replace
class $mol_stringer extends $mol.$mol_stringer {
    
    @ $jin2_grab
    presses() {
        return new $jin2_atom( () => null , next => {
            
            if( next.keyCode === 13 ) {
                this.commits().set( next )
            }
            
            this.valueView().set( next.target.textContent.trim() )
            
        } )
    }

    @ $jin2_grab
    commits() {
        return new $jin2_atom( () => null , next => {

            var text = next.target.textContent.trim()
            next.preventDefault()

            this.value().set( text )
            text = this.value().get()
            next.target.textContent = text

        } )
    }

}

