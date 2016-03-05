@ $mol_replace
class $mol_switcher extends $mol.$mol_switcher {
	
	@ $jin2_grab
	checked() { return this.prop(
		() => this.selected().get() === this.value().get() ,
		next => {
			this.selected().set( next ? this.value().get() : null )
			return next
		}
	) }
	
	@ $jin2_grab
	link() { return this.prop( () => {
		var prop = this.selected()
		return prop['link'] && prop['link']( this.value().get() ).get() || null
	} ) }
	
}