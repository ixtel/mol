@ $mol_replace
class $mol_demo extends $mol.$mol_demo {
    
    @ $jin2_grab
    child() {
        return new $jin2_atom( () => {
            var screens = []
            for( var id in $mol ) {
                if( id === '$mol_demo_screen' ) continue
                if( !/_demo_/.test( id ) ) continue
                screens.push( this.screen( id ).get() )
            }
            return screens
        } )
    }
    
    @ $jin2_grab
    screen( id : string ) {
        return new $jin2_atom_own( () => {
            var view = new $mol_demo_screen
            view.content = () => this.widget( id )
            return view 
        })
    }
    
    @ $jin2_grab
    widget( id : string ) {
        return new $jin2_atom_own( () => new $mol[ id ] )
    }
    
}

@ $mol_replace
class $mol_demo_screen extends $mol.$mol_demo_screen {
    
    @ $jin2_grab
    title() {
        return new $jin2_atom( () => this.objectOwner.objectId )
    }
    
    @ $jin2_grab
    expanded() {
        var state = $jin2_state_local.item( this.objectPath + '.expanded_' )
        return new $jin2_atom( () => state.get() === 'true' , next => { state.set( next ); return next } )
    }
    
}