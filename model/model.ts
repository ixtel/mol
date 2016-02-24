/// Reactive statefull lazy Model
class $mol_model extends $jin2_atom<any> {

    /// Quick Factory to make root of app like `$mol_model.app()`
	@ $jin2_grab
	static app( id : string ) {
		return new this()
	}
	
	get() : this {
		return super.get()
	}
	
	_ = this
	error = null

	prop<Value>(
		pull? : Value | ( ( prev? : Value ) => Value ) ,
		put? : ( next : Value , prev? : Value ) => any
	) : $jin2_prop_iface<Value> {
		return new $jin2_prop( pull , put )
	}	

	atom<Value>(
		pull? : Value | ( ( prev? : Value ) => Value ) ,
		put? : ( next : Value , prev? : Value ) => any ,
		reap? : () => boolean
	) : $jin2_prop_iface<Value> {
		return new $jin2_atom( pull , put , reap )
	}
	
	argument( path? : string ) {
		var chunk = this.objectName
		if( path ) chunk += '.' + path
		
		var owner = this.objectOwner
		if( owner && owner.argument ) return owner.argument( chunk )
		else return $jin2_state_arg.item( chunk )
	}

	persist<Value>( path? : string ) {
		var chunk = this.objectName
		if( path ) chunk += '.' + path
		
		var owner = this.objectOwner
		if( owner && owner.persist ) return owner.persist( chunk )
		else return $jin2_state_local.item<Value>( chunk )
	}

}