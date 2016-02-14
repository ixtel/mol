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
		return $jin2_state_arg.item( this.objectPath + ( path ? '.' + path : '' ) )
	}

	persist( path? : string ) {
		return $jin2_state_local.item( this.objectPath + '.' + ( path ? '.' + path : '' ) )
	}

}