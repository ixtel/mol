@ $mol_replace
class $mol_checker extends $mol.$mol_checker {
	
	@ $jin2_grab
	clicks() { return this.prop( null , next => {
		this.checked().set( !this.checked().get() )
	} ) }

}

