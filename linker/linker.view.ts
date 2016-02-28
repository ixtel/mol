@ $mol_replace
class $mol_linker extends $mol.$mol_linker {
	
	current() { return this.prop( () => {
		return this.argument().link({}).get() === this.link().get()
	} ) }
	
}