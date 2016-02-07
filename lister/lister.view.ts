@ $mol_replace
class $mol_lister extends $mol.$mol_lister {
	
	@ $jin2_grab
	scroller() { return new $jin2_prop( () => {
		var scroller = this
		while( scroller && !scroller['scrollTop'] ) scroller = scroller.objectOwner
		return scroller
	} ) }
	
	@ $jin2_grab
	itemsVisible() { return new $jin2_atom( () => {
		var items = this.items().get()
		
		var scroller = this.scroller().get()
		if( !scroller ) return items
		
		var rowMinHeight = this.rowMinHeight().get()
		var limit = ( scroller['scrollTop']().get() + screen.height ) / rowMinHeight
		if( limit >= items.length ) return items
		
		var filler = this.filler().get()
		filler.height().set( rowMinHeight * ( items.length - limit ) + 'px' )
		return items.slice( 0 , limit ).concat( filler ) 
	} ) }
	
}