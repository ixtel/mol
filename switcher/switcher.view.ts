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
	
}