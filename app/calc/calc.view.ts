@ $mol_replace
class $mol_app_calc extends $mol.$mol_app_calc {

	@ $jin2_grab
	rows() { return this.atom( () => {
		var rows = []
		//var limit = this.lister().get()['rowLimit']().get()
		for( var i = 0 ; i < 1001 ; ++i ) {
			rows.push( this.row( i ).get() )
		}
		return rows
	} ) }

	@ $jin2_grab
	row( id : number ) { return ( new $mol_view ).setup( _ => {
		_.child = () => this.prop( () => {
			var cells = []
			for( var i = 0 ; i < 27 ; ++i ) {
				if( i > 0 ) {
					if( id > 0 ) {
						cells.push( this.cell( this.number2string( i - 1 ) + id ).get() )
					} else {
						cells.push( this.header( this.number2string( i - 1 ) ).get() )
					}
				} else {
					if( id > 0 ) {
						cells.push( this.header( String( id ) ).get() )
					} else {
						cells.push( this.header( '' ).get() )
					}
				}
			}
			return cells
		} )
	} ) }

	@ $jin2_grab
	header( id : string ) { return ( new $mol.$mol_tabler_header ).setup( _ => {
		_.child = () => this.prop( id || '#' )
		_.floatVert = () => this.prop( !id || /^[A-Z]/.test( id ) )
		_.floatHor = () => this.prop( !id || /[0-9]$/.test( id ) )
	} ) }

	@ $jin2_grab
	cell( id : string ) { return ( new $mol.$mol_app_calc_cell ).setup( _ => {
		_.hint = () => this.prop( '' )
		_.result = () => this.result( id )
		_.value = () => this.value( id )
	} ) }

	@ $jin2_grab
	value( id : string ) {
		var state = this.persist<string>( 'value_' + id )
		return this.prop( () => state.get() , next => {
			var numb = Number( next ) 
			if( numb.toString() == next ) return state.set( numb )
			return state.set( next )
		} )
	}
	
	@ $jin2_grab
	func( id : string ) { return this.atom( () => {
		var code = this.value( id ).get()
			.replace( /^=/ , 'return ' )
			.replace( /#/ , 'Math.' )
			.replace( /\b([A-Z]+[0-9]+)\b/g , '_.result("$1").get()' )
		return new Function( '_' , code )
	} ) }
	
	@ $jin2_grab
	result( id : string ) { return this.atom( () => {
		var val = this.value( id ).get() 
		var res = ( val && ( val[0] === '=' ) ) ? this.func( id ).get()( this ) : val
		return res
	} ) }
	
	number2string( numb ) {
		var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		var str = ''
		do {
			str = letters[ numb % 26 ] + str
			numb = Math.floor( numb / 26 )
		} while( numb )
		return str
	}
}
