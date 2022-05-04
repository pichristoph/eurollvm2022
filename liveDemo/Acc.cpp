#include <iostream>

class Accumulator {
public:
	double accumulated;
	int nElems;

	Accumulator();
	virtual void accept(double x); 	//NEED TO BE VIRTUAL
	virtual double getMean(); 		//NEED TO BE VIRTUAL
};

Accumulator::Accumulator() {}

void Accumulator::accept(double x) {} //dummy implementation
double Accumulator::getMean() {return -1;} //dummy implementation

//------------------------------------------------------

double process(Accumulator* a) {
	for(int i=1;i<5;i++) {
		a->accept(i);
	}
	std::cout << "[C++] number of elements: " << a->nElems << std::endl;
	return a->getMean();
}
