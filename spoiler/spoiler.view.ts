@ $mol_replace
class $mol_spoiler extends $mol.$mol_spoiler {

	@ $jin2_grab
	child() { return new $jin2_atom( () => [
		this.switcher().get() ,
		this.expanded().get() ? this.contenter().get() : null ,
	] ) }
		
}