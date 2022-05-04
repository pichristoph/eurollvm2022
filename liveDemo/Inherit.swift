public class Parent {
	
	public func square(n: Int) -> Int {
		return n*n
	}
	
	public func get3P5() -> Double {
		return 3.5;
	}
}

public class Child: Parent {
	public override func square(n: Int) -> Int {
		return (n+1)*(n+1)
	}
}


public class ObjectCreator {
	public static func requestParent() -> Parent {
		return Parent()
	} 
	
	public static func requestChild() -> Parent {
		return Child()
	} 
}