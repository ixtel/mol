@ $mol_replace
class $mol_linker extends $mol.$mol_linker {
	
	current() { return this.prop( () => {
		return $jin2_state_arg.override({}) === this.link().get()
	} ) }
	
}