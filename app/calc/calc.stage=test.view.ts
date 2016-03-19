@ $mol_replace
class $mol_app_calc_demo extends $mol.$mol_app_calc_demo {

	@ $jin2_grab
	value( id : (string|number)[] ) {
		var state = this.persist<string>( 'value_' + id )
		return this.prop(
			() => {
				var next = state.get()
				if( next == null ) {
					var source = id[1] > 1 ? id[0] + String( Number( id[1] ) - 1 ) : '0'
					next = `= ${source} + 1`
				}
				return next
			} ,
			next => {
				var numb = Number( next ) 
				if( numb.toString() == next ) return state.set( numb )
				return state.set( next )
			}
		)
	}
	
}
