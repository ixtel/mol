@ $mol_replace
class $mol_tabler_demo extends $mol.$mol_tabler_demo {
	
	@ $jin2_grab
	rowsCount() { return this.prop( 200 ) }
	
	@ $jin2_grab
	rowsVisible() { return this.atom( () => {
		var limit = Math.min( this.rowsCount().get() , this.lister().limitEnd().get() )
		var rows = []
		rows.push( this.header().get() )
		for( var i = 0 ; i < limit ; ++i ) {
			rows.push( this.row( i ).get() )
		}
		return rows
	} ) }
	
	@ $jin2_grab
	row( id : number ) { return (new $mol_tabler_demo_row).setup( _ => {
		_.id = () => this.prop( String( id ) )
	} ) }
	
}

@ $mol_replace
class $mol_tabler_demo_row extends $mol.$mol_tabler_demo_row {
	
	@ $jin2_grab
	stringContent() {
		var name = '00000000000000000000'.substring( Math.round( Math.random() * 20 ) ) + '7'
		return this.atom( `Hello, Mister ${name}!` ) 
	}

}