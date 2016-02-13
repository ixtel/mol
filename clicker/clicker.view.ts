@ $mol_replace
class $mol_clicker extends $mol.$mol_clicker {
	
	@ $jin2_grab
	clicks() { return new $jin2_atom<Event>( null , event => {
		alert( `Clicked "${this.objectName}""` )
	} ) }
	
}