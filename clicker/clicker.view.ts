@ $mol_replace
class $mol_clicker extends $mol.$mol_clicker {
	
	@ $jin2_grab
	clicks() { return this.prop<Event>( null , event => {
		alert( `Clicked "${this.objectName}"` )
	} ) }
	
}