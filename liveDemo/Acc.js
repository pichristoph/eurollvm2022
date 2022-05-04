arithm = {accumulated: 0, nElems: 0}
arithm.accept = function (x) {
	this.accumulated+=x;
	this.nElems++;
}
arithm.getMean = function () {
	return this.accumulated/this.nElems;
}

geom = {accumulated: 1, nElems: 0}
geom.accept = function (x) {
	this.accumulated*=x;
	this.nElems++;
}
geom.getMean = function () {
	return Math.pow(this.accumulated, 1/this.nElems);
}

//--------------------------------

acc_cpp = Polyglot.evalFile("llvm", "Acc.so");

am = acc_cpp.process(arithm)
print("arithmetic mean:", am)
gm = acc_cpp.process(geom)
print("geometric mean:", gm)
