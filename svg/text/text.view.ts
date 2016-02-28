@ $mol_replace
class $mol_svg_text extends $mol.$mol_svg_text {
	
	offsetLeft() { return this.prop( () => this.position().get()[0] * 100 + '%' ) }
	offsetTop() { return this.prop( () => this.position().get()[1] * 100 + '%' ) }
	
}