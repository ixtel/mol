@ $mol_replace
class $mol_app_demo extends $mol.$mol_app_demo {
	
	@ $jin2_grab
	child() {
		return this.atom( () => {
			var screens = []
			for( var id in $mol ) {
				if( id === '$mol_app_demo' ) continue
				if( !/_demo$/.test( id ) ) continue
				screens.push( this.screen( id ).get() )
			}
			return screens
		} )
	}
	
	screenEpanded() { return this.argument('expanded') }
	
	@ $jin2_grab
	screen( id : string ) { return (new $mol.$mol_app_demo_screen).setup( _ => {
		_.title = () => this.prop( id )
		_.content = () => this.widget( id )
		_.expanded = () => this.prop(
			() => this.screenEpanded().get() == id ,
			next => { this.screenEpanded().set( next ? id : null ) }
		)
	} ) }
	
	@ $jin2_grab
	widget( id : string ) { return new $mol[ id ] }
	
}
