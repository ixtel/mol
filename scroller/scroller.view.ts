@ $mol_replace
class $mol_scroller extends $mol.$mol_scroller {
	
	@ $jin2_grab
	scrollTop() {
		var state = this.persist<number>( 'scrollTop' )
		return this.atom(
			() => Number( state.get() ) || 0 ,
			next => ( state.set( next ) , next )
		)
	}

	@ $jin2_grab
	scrollLeft() {
		var state = this.persist<number>( 'scrollLeft' )
		return this.atom(
			() => Number( state.get() ) || 0 ,
			next => ( state.set( next ) , next )
		)
	}

	@ $jin2_grab
	scrollHeight() { return this.atom( () => this.node().get().scrollHeight ) }

	@ $jin2_grab
	scrollWidth() { return this.atom( () => this.node().get().scrollWidth ) }

	@ $jin2_grab
	offsetHeight() { return this.atom( () => (<HTMLElement>this.node().get()).offsetHeight ) }

	@ $jin2_grab
	offsetWidth() { return this.atom( () => (<HTMLElement>this.node().get()).offsetWidth ) }

	@ $jin2_grab
	scrolls() { return this.prop<Event>( null , event => {
		this.scrollTop().set( (<HTMLElement>event.target).scrollTop )
		this.scrollLeft().set( (<HTMLElement>event.target).scrollLeft )
		this.scrollHeight().set( (<HTMLElement>event.target).scrollHeight )
		this.scrollWidth().set( (<HTMLElement>event.target).scrollWidth )
		this.offsetHeight().set( (<HTMLElement>event.target).offsetHeight )
		this.offsetWidth().set( (<HTMLElement>event.target).offsetWidth )
	} ) }
	
	@ $jin2_grab
	overflowTop() { return this.prop( () => this.scrollTop().get() > 0 ) }
	
	@ $jin2_grab
	overflowLeft() { return this.prop( () => this.scrollLeft().get() > 0 ) }
	
	@ $jin2_grab
	overflowBottom() { return this.atom(
		() => ( this.scrollHeight().get() - this.scrollTop().get() - this.offsetHeight().get() ) > 0
	) }
	
	@ $jin2_grab
	overflowRight() { return this.atom(
		() => ( this.scrollWidth().get() - this.scrollLeft().get() - this.offsetWidth().get() ) > 0
	) }
	
}
