@ $mol_replace
class $mol_tabler_demo extends $mol.$mol_tabler_demo {
	
	@ $jin2_grab
	rows() { return new $jin2_atom( () => {
		var rows = []
		rows.push( this.header().get() )
		for( var i = 0 ; i < 1000 ; ++i ) {
			rows.push( this.row( i ).get() )
		}
		return rows
	} ) }

	@ $jin2_grab
	row( id : number ) { return new $jin2_atom_own( () => {
		var view = new $mol_tabler_demo_row
		return view
	} ) }
	
}

@ $mol_replace
class $mol_tabler_demo_row extends $mol.$mol_tabler_demo_row {
	
	@ $jin2_grab
	id() { return new $jin2_atom( () => this.objectOwner.objectId ) }

	@ $jin2_grab
	stringContent() { return new $jin2_atom(
		() => 'Hello, Mister ' + '00000000000000000000'.substring( Math.round( Math.random() * 20 ) )
	) }

}