@ $mol_replace
class $mol_stringer extends $mol.$mol_stringer {
    
    @ $jin2_grab
    presses() {
        return new $jin2_atom( () => null , next => {
            
            var text = next.target.textContent.trim()
            
            if( next.keyCode === 13 ) {
                next.preventDefault()
                
                this.value().set( text )
                text = this.value().get()
                next.target.textContent = text
            }
            
            this.valueView().set( text )
            
        } )
    }

}

