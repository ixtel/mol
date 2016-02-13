@ $mol_replace
class $mol_stringer extends $mol.$mol_stringer {
	
	@ $jin2_grab
	presses() {
		return new $jin2_atom( () => null , next => {
			
			switch( next.keyCode ) {
				case 13 : // enter
					this.commits().set( next )
					break
				case 27 : // escape
					this.reverts().set( next )
					next.target.blur()
					break
				default : return
			}
			
			next.preventDefault()
			
		} )
	}

	@ $jin2_grab
	changes() {
		return new $jin2_atom( null , next => {
			this.valueChanged().set( next.target.textContent.trim() )
		} )
	}

	@ $jin2_grab
	commits() {
		return new $jin2_atom( null , next => {
			this.value().set( next.target.textContent.trim() )
			this.reverts().set( next )
		} )
	}

	@ $jin2_grab
	reverts() {
		return new $jin2_atom( null , next => {
			next.target.textContent = this.value().get()
			this.changes().set( next )
		} )
	}

}

