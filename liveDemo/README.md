# Instructions
Instructions to run the examples that have been presented during the live demo. 

## Prerequisites

### System
* OS (one of the following): 
  * Linux: possible (tested with Ubuntu 20.04) 
  * Windows: possible with a linux subsystem (tested with Ubuntu 20.04 on Windows)
* Java version: tested with 11 and 17.
* Swift compiler: tested with 5.5.1
* Clang/LLVM: tested with 10.0.0 and 12.0.1

### Components

|Example   	|Sulong  	|GraalVM JavaScript   	|Clang compiler   	|Swift compiler   	|
|---	|---	|---	|---  	|--- |
|Acc   	|yes   	|yes   	|yes   	|no |
|Inherit   	|yes   	|yes   	|no   	|yes  | 

### Getting and building the basic engines

* [Building Sulong (LLVM engine)](https://github.com/oracle/graal/blob/master/sulong/docs/contributor/BUILDING.md)
* [Building GraalVM JavaScript (also called Graal.js)](https://github.com/oracle/graaljs/blob/master/docs/Building.md)

Make sure your project/folder hierarchy looks similar to this: 
```bash
├── graal
|   ├── compiler
|   ├── sdk
|   ├── sulong
|   ├── truffle
|   `── (some more directories here)
├── graaljs
|   ├── graal-js
|   ├── graal-nodejs
|   `── docs
`── mx
```

## Running the demo examples

### Preparing the environment
First, start a linux shell and move to the sulong folder within the graal github repository: 

```shell
$ cd <path-to-graal-github-repository>/sulong
```

For convenience, start a subshell that dynamically imports the following compoments: Sulong, Graal.js, Tools, Compiler, SubstrateVM

```shell
$ mx --dy /sulong,/graal-js,/tools,/compiler,/substratevm graalvm-enter
```
As a result, you should receive ```Entering GRAALVM_<hash>_JAVA<java version>... (close shell to leave, e.g. ``exit``)```. Then, you can build a GraalVM environment: 
```shell
$ mx build
```
After having built a GraalVM, make sure that the environment variable ```GRAALVM_HOME``` is set to the latest built GraalVM bin folder and added to the ```PATH``` variable:

```shell
$ cd ../sdk/latest_graalvm_home/bin
$ export GRAALVM_HOME=$(pwd)
$ PATH=$PATH:$(pwd)
$ cd ../../../sulong
```

Check if your GraalVM has been built correctly: ```mx lli --version``` and ```js --version``` should print the corresponding output including ```GraalVM```, e.g. ```GraalVM JavaScript (GraalVM CE JVM 22.0.0-dev)```.

### Compiling the source files to LLVM

#### Compiling Swift to LLVM
For the demo example, we need to compile the Swift code of ```Ìnherit.swift``` to LLVM code, thus the command is

```shell
$ swiftc -O -embed-bitcode -g Inherit.swift
```
which produces an object file called ```Inherit```. 

Optional (if you would like to inspect the LLVM code): Use ```$ mx llvm-dis Inherit Inherit.ll``` to get a file containing the LLVM code at instruction level.

#### Compiling C++ to LLVM
First, make sure the ```LLVM_TOOLCHAIN``` variable is set by executing
```shell
$ export LLVM_TOOLCHAIN=$(mx lli --print-toolchain-path)
```

Then, C++ files can be compiled to LLVM IR. In our case (for the demo), we need to compile ```Acc.cpp```: 

```shell
$ $LLVM_TOOLCHAIN/clang++ -g -fPIC -shared Acc.cpp -lgraalvm-llvm -o Acc.so
```

Again an option, but not necessary: Use ```$ mx llvm-dis Acc.so Acc.ll``` for getting an LLVM instruction level file. 


### Running the examples

Now, the examples can be run. Call the JavaScript files with the commands

```shell
js --polyglot --jvm --experimental-options --llvm.C++Interop Inherit.js
js --polyglot --jvm --experimental-options --llvm.C++Interop Acc.js
```

Feel free to use available features of GraalVM/Truffle such as GUI-supported debugging (```--inspect``` - you need to have Chromium Browser or Google Chrome installed) or profiling (```--cpusampler```) by adding the corresponding option!
