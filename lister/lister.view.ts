@ $mol_replace
class $mol_lister extends $mol.$mol_lister {
	
	@ $jin2_grab
	scroller() { return this.atom( () => {
		var scroller = this
		while( scroller && !scroller['scrollTop'] ) scroller = scroller.objectOwner
		return scroller
	} ) }
	
	@ $jin2_grab
	limitStart() { return this.prop( () => {
		return 0
		// var offset = 0
		
		// var scroller = this.scroller().get()
		// if( scroller ) offset += scroller['scrollTop']().get()
		
		// var limit = Math.floor( offset / this.rowMinHeight().get() )
		// return limit
	} ) }
	
	@ $jin2_grab
	limitEnd() { return this.atom( () => {
		var offset = screen.height
		
		var scroller = this.scroller().get()
		if( scroller ) offset += scroller['scrollTop']().get()
		
		var limit = Math.ceil( offset / this.rowMinHeight().get() )
		return limit
	} ) }
	
	@ $jin2_grab
	itemsVisible() { return $jin2_atom_list.prop( () => {
		var items = this.items().get()
		if( !items ) return []
		
		return items.slice( this.limitStart().get() , this.limitEnd().get() )
	} ) }
	
	@ $jin2_grab
	fillerStartHeight() { return this.atom(
		() => this.limitStart().get() * this.rowMinHeight().get() + 'px'
	) }
	
	@ $jin2_grab
	fillerEndHeight() { return this.atom(
		() => this.items().get()
			? ( this.items().get().length - this.limitEnd().get() ) * this.rowMinHeight().get() + 'px'
			: '0'
	) }
	
}