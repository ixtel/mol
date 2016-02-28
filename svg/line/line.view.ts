@ $mol_replace
class $mol_svg_line extends $mol.$mol_svg_line {
	
	start() { return this.prop([ 0 , 0 ]) }
	end() { return this.prop([ 0 , 0 ]) }
	
	startX() { return this.prop( () => this.start().get()[0] * 100 + '%' ) }
	startY() { return this.prop( () => this.start().get()[1] * 100 + '%' ) }
	
	endX() { return this.prop( () => this.end().get()[0] * 100 + '%' ) }
	endY() { return this.prop( () => this.end().get()[1] * 100 + '%' ) }
	
}