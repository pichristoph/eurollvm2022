swiftFile = Polyglot.evalFile("llvm", "Inherit");

parentObj = swiftFile.ObjectCreator.requestParent()
childObj = swiftFile.ObjectCreator.requestChild()


print("16 ", parentObj.square(4))
print("25 ", childObj.square(4))
print("3.5", parentObj.get3P5())
print("3.5", childObj.get3P5())
