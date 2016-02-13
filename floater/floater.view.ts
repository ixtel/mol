@ $mol_replace
class $mol_floater extends $mol.$mol_floater {
	
	@ $jin2_grab
	scroller() { return this.atom( () => {
		var scroller = this
		while( scroller && !scroller['scrollTop'] ) scroller = scroller.objectOwner
		return scroller
	} ) }
	
	@ $jin2_grab
	offset() { return this.atom( () => {
		var scroller = this.scroller().get()
		if( !scroller ) return [ 0 , 0 ]
		
		return [
			this.floatHor().get() ? scroller['scrollLeft']().get() : 0 ,
			this.floatVert().get() ? scroller['scrollTop']().get() : 0 ,
		]
	} ) }
	
	@ $jin2_grab
	transform() { return this.prop( () => {
		var offset = this.offset().get()
		return `translate( ${offset[0]}px , ${offset[1]}px )`
	} ) }
	
	@ $jin2_grab
	floatingHor() { return this.prop( () => {
		return this.offset().get()[0] > 0
	} ) }
	
	@ $jin2_grab
	floatingVert() { return this.prop( () => {
		return this.offset().get()[1] > 0
	} ) }
	
}