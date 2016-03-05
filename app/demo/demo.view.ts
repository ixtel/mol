@ $mol_replace
class $mol_app_demo extends $mol.$mol_app_demo {
	
	@ $jin2_grab
	tabs() {
		return this.atom( () => {
			var tabs = []
			for( var id in $mol ) {
				if( id === '$mol_app_demo' ) continue
				if( !/_demo$/.test( id ) ) continue
				tabs.push( this.tab( id.replace( /^\$/ , '' ) ).get() )
			}
			return tabs
		} )
	}
	
	@ $jin2_grab
	child() {
		return this.atom<$mol_view[]>( () => {
			var id = this.screenSelected().get()
			if( id ) return [ this.selector().get() , this.contenter().get() , this.graph( id ).get() ]
			
			return [ this.selector().get() , this.contenter().get() ]
		} )
	}
	
	@ $jin2_grab
	screens() {
		return this.atom( () => {
			var id = this.screenSelected().get()
			if( id ) return [ this.screen( id ).get() ]
			
			var screens = []
			for( var id in $mol ) {
				if( id === '$mol_app_demo' ) continue
				if( !/_demo$/.test( id ) ) continue
				screens.push( this.screen( id.replace( /^\$/ , '' ) ).get() )
			}
			return screens
		} )
	}
	
	screenSelected() { return this.argument().item('screen') }
	single() { return this.prop( () => !!this.screenSelected().get() ) }
	
	@ $jin2_grab
	tab( id : string ) { return (new $mol_switcher).setup( _ => {
		_.selected = () => this.screenSelected()
		_.value = () => this.prop( id )
		_.child = () => this.prop( '$' + id )
	}) }
	
	@ $jin2_grab
	screen( id : string ) { return (new $mol.$mol_app_demo_screen).setup( _ => {
		_.title = () => this.prop( '$' + id )
		_.content = () => this.widget( id )
		_.screenSelected = () => this.screenSelected()
		_.name = () => this.prop( id )
	} ) }
	
	@ $jin2_grab
	widget( id : string ) { return (new $mol[ '$' + id ]).setup( _ => {
		_.argument = () => this.argument().item( id )
	}) }
	
	@ $jin2_grab
	graph( id : string ) { return (new $mol.$mol_app_demo_graph).setup( _ => {
		_.child = () => this.atom( () => {
			var nodes = new Set
			var edges = new Set
			
			var stack = [ this.widget( id ).get().version() ]
			var y = 1
			while( stack.length && ( y < 200 ) )  {
				var current = stack.shift()
				var node = this.graphNode( $jin2_object_path( current ) ).get()
				if( nodes.has( node ) ) continue
				current.get()
				let pos = [ ( 12 - current.mastersDeep ) / 32 , y++ / 64 ]
				node.position = () => this.prop( pos )
				nodes.add( node )
				if( current.masters ) current.masters.forEach( ( _ , master ) => {
					stack.push( master )
					edges.add( this.graphEdge([ $jin2_object_path( master ) , $jin2_object_path( current ) ]).get() )
				} )
				stack.sort( ( a , b ) => ( a.mastersDeep - b.mastersDeep ) ) 
				/*for( var field in current ) {
					var having = current[ field ]
					if( !having ) continue
					if( having.objectOwner !== current ) continue
					stack.push( having )
					edges.add( this.graphEdge([ current.objectPath , having.objectPath ]).get() )
				}*/
			}
			
			var next = []
			edges.forEach( edge => next.push( edge ) )
			nodes.forEach( node => next.push( node ) )
			
			return next
		} )
	} ) }
	
	@ $jin2_grab
	graphNodePosition( id : string ) { return this.atom([ Math.random() * .8 , Math.random() ]) }
	
	@ $jin2_grab
	graphNode( id : string ) { return (new $mol.$mol_app_demo_node).setup( _ => {
		_.value = () => this.prop( id )
		//_.position = () => this.graphNodePosition( id )
	} ) }
	
	@ $jin2_grab
	graphEdge( ids : string[] ) { return (new $mol.$mol_app_demo_edge).setup( _ => {
		_.start = () => this.graphNode( ids[0] ).position()
		_.end = () => this.graphNode( ids[1] ).position()
	} ) }
	
}
