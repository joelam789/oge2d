package oge2d.script;

import hscript.Expr;
import hscript.Parser;

@:enum
abstract AstExprType(Int) {
	var AEUndefined = 0;
	var AEConstInt = 1;
	var AEConstFloat = 2;
	var AEConstString = 3;
	var AEConst = 4;
	var AEIdent = 5;
	var AEVar = 6;
	var AEParent = 7;
	var AEBlock = 8;
	var AEField = 9;
	var AEBinop = 10;
	var AEUnop = 11;
	var AECall = 12;
	var AEIf = 13;
	var AEWhile = 14;
	var AEFor = 15;
	var AEBreak = 16;
	var AEContinue = 17;
	var AEFunction = 18;
	var AEReturn = 19;
	var AEArray = 20;
	var AEArrayDecl = 21;
	var AENew = 22;
	var AEThrow = 23;
	var AETry = 24;
	var AEObject = 25;
	var AETernary = 26;
	var AESwitch = 27;
}

@:enum
abstract InstrOp(Int) {
	var INS_NOP = 0;
	var INS_PUSH = 1;
	var INS_LOAD = 2;
	var INS_DEFINE = 3;
	var INS_ASSIGN = 4;
	var INS_BEGIN = 5;
	var INS_END = 6;
	var INS_GET = 7;
	var INS_BINARY_OP = 8;
	var INS_UNARY_OP = 9;
	var INS_RETURN = 10;
	var INS_CHECK = 11;
	var INS_GOTO = 12;
	var INS_WHILE = 13;
	var INS_WHILE_END = 14;
	var INS_FOR = 15;
	var INS_FOR_END = 16;
	var INS_BREAK = 17;
	var INS_CONTINUE = 18;
	var INS_ARRAY_BEGIN = 19;
	var INS_ARRAY_DEFINE = 20;
	var INS_ARRAY_END = 21;
	var INS_ARRAY_ITEM = 22;
	var INS_FUNC = 23;
	var INS_FUNC_END = 24;
	var INS_CALL = 25;
	var INS_NEW = 26;
	var INS_THROW = 27;
	var INS_TRY = 28;
	var INS_TRY_END = 29;
	var INS_CATCH = 30;
	var INS_CATCH_END = 31;
	var INS_OBJECT = 32;
}

@:enum
abstract BlockType(Int) {
	var BLK_NORMAL = 0;
	var BLK_WHILE = 1;
	var BLK_FOR = 2;
	var BLK_FUNC = 3;
	var BLK_TRY = 4;
	var BLK_CATCH = 5;
}

class AstExpr {
	public var maintype: AstExprType = AEUndefined;
	public var subtype: AstExprType = AEUndefined;
	public var boolval: Bool = false;
	public var intval: Int = 0;
	public var floatval: Float = 0;
	public var strval: String = "";
	public var tmpval: String = "";
	public var arrval: Array<String> = new Array<String>();
	public function new() { };
}

class AstNode {
	public var expr: AstExpr = null;
	public var line: Int = 0;
	public function new(astExpr: AstExpr, lineNumber: Int) {
		expr = astExpr;
		line = lineNumber;
	}
}

class Instr {
	public var opcode: InstrOp = INS_NOP; // op code
	public var index: Int = 0;            // instruction index in the intermediate code
	public var node: AstNode = null;      // dst ast node
	public var related: Int = -1;         // the index of the related instruction
	public var pcount: Int = 0;           // the total number of the params
	public var target: Int = -1;          // the index of the target to jump
	public function new() { };
}

class Block {
	public var type: BlockType = BLK_NORMAL; // block type
	public var begin: Int = 0;               // instruction index of the entry
	public var end: Int = 0;                 // instruction index of the end
	public var next: Int = 0;                // next entry
	public function new() { };
}

class Call {
	public var from: Int = 0;          // instruction index of the call
	public var entry: Int = 0;         // instruction index of the function's entry
	public var end: Int = 0;           // instruction index of the function's end
	public function new() { };
}

class Func {
	public var name: String = "";          // function name
	public var begin: Int = 0;             // instruction index of the entry
	public var end: Int = 0;               // instruction index of the end
	public var args: Array<String> = new Array<String>(); // names of the params
	public function new() { };
}

class IntRange {
	public var begin(default, null): Int;
	public var end(default, null): Int;
	public function new(v1:Int, v2:Int) {
		begin = v1;
		end = v2;
	}
}

typedef InterpContext = {
	var stack: List<Dynamic>;
	var sizes: List<Int>;
	var containers: List<Dynamic>;
	var arrays: List<Dynamic>;
	var calls: List<Call>;
	var blocks: List<Block>;
	var localmaps: List<Map<String, Dynamic>>;
	var cursor: Int;
	var state: Int;
}

class BytecodeInterp {
	
	public static inline var STATE_UNRUNNABLE =  0;
	public static inline var STATE_READY      =  1;
	public static inline var STATE_SUSPENDED  =  2;
	public static inline var STATE_ACTIVATED  =  3;
	public static inline var STATE_RUNNING    =  4;
	public static inline var STATE_FAIL       =  5;
	public static inline var STATE_SUCCESS    =  6;
	
	var parser: Parser = null;
	
	var code: Array<Instr> = new Array<Instr>();
	
	var stack: List<Dynamic> = new List<Dynamic>();
	var sizes: List<Int> = new List<Int>();
	
	var looptimes: Map<Int, Int> = new Map<Int, Int>();
	var containers: List<Dynamic> = new List<Dynamic>();
	var arrays: List<Dynamic> = new List<Dynamic>();
	
	var calls: List<Call> = new List<Call>();
	var funcs: Map<String, Func> = new Map<String, Func>();
	
	var blocks: List<Block> = new List<Block>();
	var endmap: Map<Int, Int> = new Map<Int, Int>();
	
	var localmaps: List<Map<String, Dynamic>> = new List<Map<String, Dynamic>>();
	
	var varmap: Map<String, Dynamic> = new Map<String, Dynamic>();
	
	var newlinepos: List<Int> = new List<Int>();
	
	var state:Int = STATE_UNRUNNABLE;
	
	var cursor:Int = 0;
	
	public var vars(get, null): Map<String, Dynamic>;
	
	public var onLine(null, default): Int->Void = null;

	public function new(scriptParser: Parser = null) {
		// set parser
		if (scriptParser != null) parser = scriptParser;
		else parser = new Parser();
		// init some necessary const values (hscript.Parser dose not know them by default)
		varmap.set("null", null);
		varmap.set("true", true);
		varmap.set("false", false);
	}
	
	function get_vars(): Map<String, Dynamic> {
		return varmap;
	}
	
	public function getState(): Int {
		return state;
	}
	
	public function getResult(): Dynamic {
		if (stack.length > 0) return stack.first();
		else return null;
	}
	
	public function getLocalVars(): List<Map<String, Dynamic>> {
		var result = new List<Map<String, Dynamic>>();
		for (localmap in localmaps) {
			var localvars = new Map<String, Dynamic>();
			for (name in localmap.keys()) {
				localvars.set(name, localmap[name]);
			}
			result.add(localvars);
		}
		return result;
	}
	
	function clear() {
		
		var intKeys: List<Int> = new List<Int>();
		var strKeys: List<String> = new List<String>();
		
		code.splice(0, code.length);
		stack.clear();
		sizes.clear();
		
		intKeys.clear();
		for (k in looptimes.keys()) intKeys.add(k);
		for (k in intKeys) looptimes.remove(k);
		
		containers.clear();
		arrays.clear();
		calls.clear();
		
		strKeys.clear();
		for (k in funcs.keys()) strKeys.add(k);
		for (k in strKeys) funcs.remove(k);
		
		blocks.clear();
		
		intKeys.clear();
		for (k in endmap.keys()) intKeys.add(k);
		for (k in intKeys) endmap.remove(k);
		
		localmaps.clear();
		
		newlinepos.clear();
		
		state = STATE_UNRUNNABLE;
		
		cursor = 0;
		
	}
	
	inline function edef( e : Expr ) {
		#if hscriptPos
		return e.e;
		#else
		return e;
		#end
	}
	
	function markNewLinePos(src: String) {
		newlinepos.clear();
		var pos = src.indexOf("\n");
		while (pos >= 0) {
			newlinepos.add(pos);
			pos = src.indexOf("\n", pos+1);
		}
	}
	
	function getLineNumber(e: Expr): Int {
		var line = 0;
		#if hscriptPos
		var idx = 0;
		for (pos in newlinepos) {
			idx++;
			if (e.pmin < pos) {
				line = idx;
				break;
			}
		}
		#end
		return line;
	}
	
	function newAstExpr(?mainType: AstExprType): AstExpr {
		var astExpr:AstExpr = new AstExpr();
		astExpr.maintype = mainType == null ? AEUndefined : mainType;
		return astExpr;
	}
	
	function newInstr(astNode:AstNode, op:InstrOp): Instr {
		var instr:Instr = new Instr();
		instr.opcode = op;
		instr.node = astNode;
		return instr;
	}
	
	function newBlock(op:InstrOp): Block {
		var block:Block = new Block();
		if (op == INS_WHILE) block.type = BLK_WHILE;
		else if (op == INS_FOR) block.type = BLK_FOR;
		block.begin = cursor;
		if (endmap.exists(block.begin)) block.end = endmap[block.begin];
		else block.end = code.length + 1;
		return block;
	}
	
	function newFunc(fn:String): Func {
		var func:Func = new Func();
		func.name = fn;
		return func;
	}
	
	function newCall(fn:Func): Call {
		var call:Call = new Call();
		call.from = cursor;
		call.entry = fn.begin + 1;
		call.end = fn.end;
		return call;
	}
	
	function genCodeError(errMsg:String, lineNumber:Int): String {
		
		var codeError = {
			msg: errMsg,
			line: lineNumber
		}
		var result = haxe.Json.stringify(codeError);
		
		#if (debug && hscriptPos)
		trace(result);
		#end
		
		return result;
	}
	
	function addInstr(instr:Instr): Instr {
		code.push(instr);
		instr.index = code.length;
		return instr;
	}
	
	function genCode(e: Expr) {
		
		if (e == null) return;
		
		var nodeExpr = edef(e);
		
		var node:AstNode = new AstNode(newAstExpr(), getLineNumber(e));
		
		switch(nodeExpr) {
			
		case EConst(c):
			node.expr.maintype = AEConst;
			switch(c) {
				case CInt(v): 
					node.expr.subtype = AEConstInt;
					node.expr.intval = v;
				case CFloat(f): 
					node.expr.subtype = AEConstFloat;
					node.expr.floatval = f;
				case CString(s): 
					node.expr.subtype = AEConstString;
					node.expr.strval = s;
			}
			addInstr(newInstr(node, INS_PUSH));
			
		case EIdent(id):
			node.expr.maintype = AEIdent;
			node.expr.strval = id;
			addInstr(newInstr(node, INS_LOAD));
			
		case EVar(n, _, e):
			node.expr.maintype = AEVar;
			node.expr.strval = n;
			addInstr(newInstr(node, INS_DEFINE));
			if (e != null) {
				genCode(e);
				addInstr(newInstr(node, INS_ASSIGN));
			}
		case EParent(e):
			genCode(e);
			
		case EBlock(exprs):
			var last:Instr = null;
			if (code.length > 0) last = code[code.length - 1];
			var instr = addInstr(newInstr(node, INS_BEGIN));
			if (last != null) {
				if (last.opcode == INS_FUNC 
					|| last.opcode == INS_TRY 
					|| last.opcode == INS_CATCH) {
					instr.related = last.index;
				}
			}
			var bidx = instr.index;
			for (e in exprs) genCode(e);
			var eidx = addInstr(newInstr(node, INS_END)).index;
			endmap[bidx] = eidx;
			
		case EField(e, f):
			genCode(e);
			node.expr.maintype = AEField;
			node.expr.strval = f;
			addInstr(newInstr(node, INS_GET));
			
		case EBinop(op, e1, e2):
			switch(op) {
			case "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "&=" | "|=" | "^=" | "<<=" | ">>=" | ">>>=": 
				genCode(e2);
				genCode(e1);
				node.expr.maintype = AEBinop;
				node.expr.tmpval = op;
				switch ( edef(e1) ) {
					case EIdent(id):
						node.expr.subtype = AEIdent;
						node.expr.strval = id;
					case EField(e,f):
						node.expr.subtype = AEField;
						node.expr.strval = f;
					case EArray(e,index):
						node.expr.subtype = AEArray;
					default:
						node.expr.subtype = AEUndefined;
				}
				addInstr(newInstr(node, INS_ASSIGN));
			default:
				genCode(e2);
				genCode(e1);
				node.expr.maintype = AEBinop;
				node.expr.strval = op;
				addInstr(newInstr(node, INS_BINARY_OP));
			}
		case EUnop(op, prefix, e1):
			genCode(e1);
			node.expr.maintype = AEUnop;
			node.expr.boolval = prefix;
			node.expr.tmpval = op;
			switch ( edef(e1) ) {
				case EIdent(id):
					node.expr.subtype = AEIdent;
					node.expr.strval = id;
				case EField(e,f):
					node.expr.subtype = AEField;
					node.expr.strval = f;
				case EArray(e,index):
					node.expr.subtype = AEArray;
				default:
					node.expr.subtype = AEUndefined;
			}
			addInstr(newInstr(node, INS_ASSIGN));
			
		case ECall(e, params):
			for (p in params) genCode(p);
			genCode(e);
			node.expr.maintype = AECall;
			node.expr.intval = params.length;
			switch ( edef(e) ) {
			case EIdent(id):
				node.expr.subtype = AEIdent;
				node.expr.strval = id;
			case EField(e, f):
				node.expr.subtype = AEField;
				node.expr.strval = f;
			default:
				node.expr.subtype = AEUndefined;
			}
			addInstr(newInstr(node, INS_CALL));
			
		case EIf(econd, e1, e2):
			genCode(econd);
			node.expr.maintype = AEIf;
			var instr1 = addInstr(newInstr(node, INS_CHECK));
			genCode(e1);
			instr1.target = code.length + 1;
			if (e2 != null) {
				var instr2 = addInstr(newInstr(node, INS_GOTO));
				instr1.target = code.length + 1;
				genCode(e2);
				instr2.target = code.length + 1;
			}
			
		case EWhile(econd, e):
			node.expr.maintype = AEWhile;
			var bidx = addInstr(newInstr(node, INS_WHILE)).index;
			genCode(econd);
			var instr1 = addInstr(newInstr(node, INS_CHECK));
			genCode(e);
			var instr2 = addInstr(newInstr(node, INS_WHILE_END));
			var eidx = instr2.index;
			endmap[bidx] = eidx;
			instr1.target = eidx + 1;
			instr2.target = bidx + 1;
			
		case EFor(v, it, e):
			node.expr.maintype = AEFor;
			node.expr.strval = v;
			var instr = addInstr(newInstr(node, INS_FOR));
			var bidx = instr.index;
			looptimes.set(bidx, 0);
			addInstr(newInstr(node, INS_LOAD));
			genCode(it);
			var instr1 = addInstr(newInstr(node, INS_CHECK));
			instr1.related = instr.index;
			genCode(e);
			var instr2 = addInstr(newInstr(node, INS_FOR_END));
			var eidx = instr2.index;
			endmap[bidx] = eidx;
			instr1.target = eidx + 1;
			instr2.target = bidx + 1;
			
		case EBreak:
			addInstr(newInstr(node, INS_BREAK));

		case EContinue:
			addInstr(newInstr(node, INS_CONTINUE));
			
		case EReturn(e):
			genCode(e);
			node.expr.maintype = AEReturn;
			addInstr(newInstr(node, INS_RETURN));
			
		case EFunction(params, fexpr, name, _):
			node.expr.maintype = AEFunction;
			var jumper = addInstr(newInstr(node, INS_GOTO));
			var bidx = addInstr(newInstr(node, INS_FUNC)).index;
			genCode(fexpr);
			var ending = addInstr(newInstr(node, INS_FUNC_END));
			var eidx = ending.index;
			endmap[bidx] = eidx;
			jumper.target = eidx + 1;
			var func = newFunc(name);
			func.begin = bidx;
			func.end = eidx;
			for (p in params) func.args.push(p.name);
			funcs[name] = func;
			
		case EArrayDecl(arr):
			node.expr.maintype = AEArrayDecl;
			addInstr(newInstr(node, INS_ARRAY_BEGIN));
			for (e in arr) {
				genCode(e);
				addInstr(newInstr(node, INS_ARRAY_DEFINE));
			}
			addInstr(newInstr(node, INS_ARRAY_END));
			
		case EArray(e,index):
			genCode(index);
			genCode(e);
			node.expr.maintype = AEArray;
			addInstr(newInstr(node, INS_ARRAY_ITEM));
			
		case ENew(cl,params):
			for (p in params) genCode(p);
			node.expr.maintype = AENew;
			node.expr.strval = cl;
			node.expr.intval = params.length;
			addInstr(newInstr(node, INS_NEW));
			
		case EThrow(e):
			genCode(e);
			node.expr.maintype = AEThrow;
			addInstr(newInstr(node, INS_THROW));
			
		case ETry(e, n, _, ecatch):
			switch( edef(e) ) {
			case EBlock(exprs):
				//...
			default:
				throw genCodeError("[try/catch] should be followed by a block", node.line);
			}
			switch( edef(ecatch) ) {
			case EBlock(exprs):
				//...
			default:
				throw genCodeError("[try/catch] should be followed by a block", node.line);
			}
			node.expr.maintype = AETry;
			node.expr.strval = n;
			var instr1 = addInstr(newInstr(node, INS_TRY));
			genCode(e);
			var instr2 = addInstr(newInstr(node, INS_TRY_END));
			var instr3 = addInstr(newInstr(node, INS_CATCH));
			genCode(ecatch);
			var instr4 = addInstr(newInstr(node, INS_CATCH_END));
			instr1.target = instr3.index;
			instr2.target = instr4.index + 1;
			
		case EObject(fl):
			for (f in fl) genCode(f.e);
			node.expr.maintype = AEObject;
			node.expr.arrval.splice(0, node.expr.arrval.length);
			for (f in fl) node.expr.arrval.push(f.name);
			addInstr(newInstr(node, INS_OBJECT));
			
		case ETernary(econd,e1,e2):
			genCode(econd);
			node.expr.maintype = AETernary;
			var instr1 = addInstr(newInstr(node, INS_CHECK));
			genCode(e1);
			instr1.target = code.length + 1;
			var instr2 = addInstr(newInstr(node, INS_GOTO));
			instr1.target = code.length + 1;
			genCode(e2);
			instr2.target = code.length + 1;
			
		case ESwitch(e, cases, def):
			genCode(e);
			var last:Instr = null; 
			var list: Array<Instr> = new Array<Instr>();
			node.expr.maintype = AESwitch;
			for (c in cases) {
				if (last != null) last.target = code.length + 1;
				for (v in c.values) genCode(v);
				last = addInstr(newInstr(node, INS_CHECK));
				last.pcount = c.values.length;
				genCode(c.expr);
				list.push(addInstr(newInstr(node, INS_GOTO)));
			}
			if (last != null) last.target = code.length + 1;
			genCode(def);
			for (instr in list) instr.target = code.length + 1;
			
		}
		
	}
	
	function loadIdent(id: String): Map<String, Dynamic> {
		
		var matchedMap: Map<String, Dynamic> = null;
					
		// first, try to find it in locals
		for (localmap in localmaps) {
			if (localmap.exists(id)) {
				matchedMap = localmap;
				break;
			}
		}
		
		if (matchedMap == null) {
			// then, try to find it in vars
			if (varmap.exists(id)) {
				matchedMap = varmap;
			}
		}
		
		return matchedMap;
	}
	
	function evalBinop(op:String, v1: Dynamic, v2: Dynamic): Dynamic {
		
		var ret: Dynamic = null;
		
		switch(op) {
			case "+": ret = v1 + v2;
			case "-": ret = v1 - v2;
			case "*": ret = v1 * v2;
			case "/": ret = v1 / v2;
			case "%": ret = v1 % v2;
			case "&": ret = v1 & v2;
			case "|": ret = v1 | v2;
			case "^": ret = v1 ^ v2;
			case "<<": ret = v1 << v2;
			case ">>": ret = v1 >> v2;
			case ">>>": ret = v1 >>> v2;
			case "==": ret = v1 == v2;
			case "!=": ret = v1 != v2;
			case ">=": ret = v1 >= v2;
			case "<=": ret = v1 <= v2;
			case ">": ret = v1 > v2;
			case "<": ret = v1 < v2;
			case "||": ret = v1 || v2;
			case "&&": ret = v1 && v2;
			case "=": ret = v2;
			case "...": ret = new IntRange(v1, v2);
			
			case "+=": ret = v1 + v2;
			case "-=": ret = v1 - v2;
			case "*=": ret = v1 * v2;
			case "/=": ret = v1 / v2;
			case "%=": ret = v1 % v2;
			case "&=": ret = v1 & v2;
			case "|=": ret = v1 | v2;
			case "^=": ret = v1 ^ v2;
			case "<<=": ret = v1 << v2;
			case ">>=": ret = v1 >> v2;
			case ">>>=": ret = v1 >>> v2;
			
		}
		
		return ret;
	}
	
	function evalUnop(op:String, v: Dynamic): Dynamic {
		
		var ret: Dynamic = null;
		
		switch(op) {
			case "!": ret = v != true;
			case "-": ret = -v;
			case "++": ret = v + 1;
			case "--": ret = v - 1;
			case "~": ret = ~v;
		}
		
		return ret;
	}
	
	function execInstr(instr: Instr) {
		
		switch(instr.opcode) {
		case INS_PUSH:
			var val:Dynamic = null;
			switch (instr.node.expr.maintype) {
			case AEConst:
				switch(instr.node.expr.subtype) {
				case AEConstInt: val = instr.node.expr.intval;
				case AEConstFloat: val = instr.node.expr.floatval;
				case AEConstString: val = instr.node.expr.strval;
				default: throw genCodeError("Invalid const", instr.node.line);
				}
			default: throw genCodeError("Invalid token", instr.node.line);
			}
			stack.push(val);
			cursor++;
		case INS_BEGIN:
			var localmap:Map<String, Dynamic> = null;
			var block = newBlock(instr.opcode);
			var relatedInstr = null;
			if (instr.related > 0) relatedInstr = code[instr.related - 1];
			if (relatedInstr != null) {
				var relatedOp = relatedInstr.opcode;
				if (relatedOp == INS_FUNC) {
					localmap = cast stack.pop();
					block.type = BLK_FUNC;
				} else if (relatedOp == INS_TRY) {
					block.type = BLK_TRY;
					block.next = relatedInstr.target;
				} else if (relatedOp == INS_CATCH) {
					localmap = cast stack.pop();
					block.type = BLK_CATCH;
				}
			}
			if (localmap == null) localmap = new Map<String, Dynamic>();
			localmaps.push(localmap);
			sizes.push(stack.length);
			blocks.push(block);
			cursor++;
		case INS_END:
			var ret:Dynamic = null;
			var oldsize = sizes.pop();
			if (stack.length > oldsize) ret = stack.pop();
			while (stack.length > oldsize) stack.pop(); // clean up stack ...
			if (ret != null) stack.push(ret);
			containers.clear();
			arrays.clear();
			localmaps.pop();
			blocks.pop();
			cursor++;
		case INS_GET:
			switch ( instr.node.expr.maintype ) {
			case AEField:
				var f = instr.node.expr.strval;
				var obj = stack.pop();
				var val = null;
				var fieldok = obj != null;
				if (fieldok) val = Reflect.field(obj, f);
				if (val == null && fieldok) {
					fieldok = Reflect.hasField(obj, f) || Type.getInstanceFields(Type.getClass(obj)).indexOf(f) >= 0;
				}
				if (fieldok) {
					containers.push(obj);
					stack.push(val);
				} else throw genCodeError("Invalid access field: " + f, instr.node.line);
				
			default: throw genCodeError("Invalid token", instr.node.line);
			}
			cursor++;
		case INS_LOAD:
			switch (instr.node.expr.maintype) {
			case AEIdent:
				var id = instr.node.expr.strval;
				var matchedMap: Map<String, Dynamic> = loadIdent(id);
				if (matchedMap == null) {
					// if not found, let's create a new noe
					matchedMap = localmaps.first();
					if (matchedMap == null) throw genCodeError("No local var map found", instr.node.line);
					matchedMap[id] = { }; // let it be "empty", but not "null", because it's existing ...
				}
				if (matchedMap != null) {
					containers.push(matchedMap);
					stack.push(matchedMap[id]);
				}
			
			case AEFor:
				var id = instr.node.expr.strval;
				var matchedMap: Map<String, Dynamic> = loadIdent(id);
				if (matchedMap == null) {
					// if not found, let's create a new noe
					matchedMap = localmaps.first();
					if (matchedMap == null) throw genCodeError("No local var map found", instr.node.line);
					matchedMap[id] = { }; // let it be "empty", but not "null", because it's existing ...
				}
				if (matchedMap != null) {
					stack.push(matchedMap[id]);
				}
			default: throw genCodeError("Invalid token", instr.node.line);
			}
			cursor++;
		case INS_DEFINE:
			switch ( instr.node.expr.maintype ) {
				case AEVar:
					var n = instr.node.expr.strval;
					var localmap = localmaps.first();
					if (localmap == null) throw genCodeError("No local var map found", instr.node.line);
					else {
						if (localmap.exists(n)) {
							throw genCodeError("Duplicate variable: " + n, instr.node.line);
						} else {
							localmap[n] = { };
						}
					}
				default: throw genCodeError("Invalid token", instr.node.line);
			}
			cursor++;
			
		case INS_ASSIGN:
			switch ( instr.node.expr.maintype ) {
				case AEVar:
					var n = instr.node.expr.strval;
					var localmap = localmaps.first();
					if (localmap == null) throw genCodeError("No local var map found", instr.node.line);
					else {
						if (!localmap.exists(n)) {
							throw genCodeError("Invalid variable: " + n, instr.node.line);
						} else {
							localmap[n] = stack.first();
						}
					}
				case AEBinop:
					var op = instr.node.expr.tmpval;
					var v1 = stack.pop();
					var v2 = stack.pop();
					v1 = evalBinop(op, v1, v2);
					stack.push(v1);
						
					switch (instr.node.expr.subtype) {
					case AEIdent:
						var id = instr.node.expr.strval;
						var matchedMap: Map<String, Dynamic> = cast containers.pop();
						if (matchedMap == null) throw genCodeError("No matched identifier map found", instr.node.line);
						matchedMap[id] = v1;
						
					case AEField:
						var f = instr.node.expr.strval;
						var obj = containers.pop();
						if (obj == null) throw genCodeError("No matched object found", instr.node.line);
						Reflect.setField(obj,f,v1);
						
					case AEArray:
						var arr = containers.pop();
						var idx = containers.pop();
						arr[idx] = v1;
						
					default:
						// will do nothing if it's just a value saved on the top of the stack simply
						// e.g. a value returned by a function
					}
					
				case AEUnop:
					var op = instr.node.expr.tmpval;
					var prefix = instr.node.expr.boolval;
					var v1 = stack.pop();
					var old = v1;
					v1 = evalUnop(op, v1);
					
					if (!prefix && (op == "++" || op == "--")) stack.push(old);
					else stack.push(v1);
					
					switch (instr.node.expr.subtype) {
					case AEIdent:
						var id = instr.node.expr.strval;
						var matchedMap: Map<String, Dynamic> = cast containers.pop();
						if (matchedMap == null) throw genCodeError("No matched identifier map found", instr.node.line);
						matchedMap[id] = v1;
					case AEField:
						var f = instr.node.expr.strval;
						var obj = containers.pop();
						if (obj == null) throw genCodeError("No matched object found", instr.node.line);
						Reflect.setField(obj,f,v1);
					case AEArray:
						var arr = containers.pop();
						var idx = containers.pop();
						arr[idx] = v1;
					default:
						// will do nothing if it's just a value saved on the top of the stack simply
						// e.g. a value returned by a function
					}
				default: throw genCodeError("Invalid token", instr.node.line);
			}
			cursor++;
			
		case INS_BINARY_OP:
			switch ( instr.node.expr.maintype ) {
				case AEBinop:
					var op = instr.node.expr.strval;
					var v1 = stack.pop();
					var v2 = stack.pop();
					v1 = evalBinop(op, v1, v2);
					stack.push(v1);
					
				default: throw genCodeError("Invalid token", instr.node.line);
			}
			cursor++;
		
		case INS_UNARY_OP:
			switch ( instr.node.expr.maintype ) {
				case AEUnop:
					// ...	
				default: throw genCodeError("Invalid token", instr.node.line);
			}
			cursor++;
			
		case INS_RETURN:
			
			var nextPos:Int = 0;
			
			if (calls.length > 0) {
				
				nextPos = calls.first().end;
				
				// clean up blocks in the function
				while (blocks.length > 0) {
					var block = blocks.first();
					if (block.type == BLK_WHILE) {
						blocks.pop();
						continue;
					} else if (block.type == BLK_FOR) {
						localmaps.pop();
						blocks.pop();
						continue;
					} else if (block.type == BLK_FUNC) {
						nextPos = block.end;
						break;
					} else {
						var ret:Dynamic = null;
						var oldsize = sizes.pop();
						if (stack.length > oldsize) ret = stack.pop();
						while (stack.length > oldsize) stack.pop(); // clean up stack ...
						if (ret != null) stack.push(ret);
						containers.clear();
						arrays.clear();
						localmaps.pop();
						blocks.pop();
						continue;
					}
				}
				
			}
			
			if (nextPos <= 0) {
				if (blocks.length == 1) {
					nextPos = blocks.first().end;
				}
			}
			
			if (nextPos > 0) cursor = nextPos;
			else throw genCodeError("Invalid token [return]", instr.node.line);
			
			
		case INS_CHECK:
			switch ( instr.node.expr.maintype ) {
			case AEIf, AETernary:
				if (stack.pop() == true) cursor++;
				else cursor = instr.target;
			case AEWhile:	
				if (stack.pop() == true) cursor++;
				else {
					blocks.pop();
					cursor = instr.target;
				}
			case AEFor:
				var id = instr.node.expr.strval;
				var relatedInstr = null;
				if (instr.related > 0) relatedInstr = code[instr.related - 1];
				if (relatedInstr == null) throw genCodeError("Invalid loop", instr.node.line);
				looptimes[relatedInstr.index] += 1;
				var matchedMap: Map<String, Dynamic> = loadIdent(id);
				if (matchedMap == null) throw genCodeError("Loop variable needs to be initialized", instr.node.line);
				else {
					var stay = true;
					var itValue = stack.pop();
					var currentValue = stack.pop();
					if (Std.is(itValue, IntRange)) {
						var range:IntRange = cast itValue;
						var current:Int = range.begin;
						if (Std.is(currentValue, Int)) {
							current = cast currentValue;
							current++;
						}
						stay = current < range.end;
						matchedMap[id] = current;
					} else {
						#if (flash && !flash9)
						if( itValue.iterator != null ) itValue = itValue.iterator();
						#else
						try itValue = itValue.iterator() catch( ex : Dynamic ) {};
						#end
						if ( itValue.hasNext == null || itValue.next == null ) throw genCodeError("Invalid iterator", instr.node.line);
						
						var current:Int = 1;
						while (itValue.hasNext() && current < looptimes[relatedInstr.index]) {
							itValue.next();
							current++;
						}
						
						stay = itValue.hasNext();
						if (stay) matchedMap[id] = itValue.next();
					}
					
					if (stay) cursor++;
					else {
						localmaps.pop();
						blocks.pop();
						cursor = instr.target;
					}
				}
			case AESwitch:
				var values:Array<Dynamic> = new Array<Dynamic>();
				for (pidx in 0...instr.pcount) values.push(stack.pop());
				var matched = false;
				var obj = stack.first();
				for (val in values) {
					if (obj == val) {
						matched = true;
						break;
					}
				}
				if (matched) cursor++;
				else cursor = instr.target;
			default: throw genCodeError("Invalid token", instr.node.line);
			}
			
		case INS_GOTO:
			cursor = instr.target;
			
		case INS_WHILE:
			blocks.push(newBlock(instr.opcode));
			cursor++;
			
		case INS_WHILE_END:
			cursor = instr.target;
			
		case INS_FOR:
			looptimes[instr.index] = 0; // reset loop times
			localmaps.push(new Map<String, Dynamic>());
			blocks.push(newBlock(instr.opcode));
			cursor++;
			
		case INS_FOR_END:
			cursor = instr.target;
			
		case INS_BREAK:
			
			var hasLoop = false;
			for (b in blocks) {
				if (b.type == BLK_FOR || b.type == BLK_WHILE) {
					hasLoop = true;
					break;
				} else if (b.type == BLK_FUNC) {
					hasLoop = false;
					break;
				}
			}
			if (hasLoop) {
				while (blocks.length > 0) {
					var block = blocks.first();
					if (block.type == BLK_WHILE) {
						blocks.pop();
						cursor = block.end + 1;
						break;
					} else if (block.type == BLK_FOR) {
						localmaps.pop();
						blocks.pop();
						cursor = block.end + 1;
						break;
					} else if (block.type == BLK_FUNC) {
						throw genCodeError("[break] should be put in loop", instr.node.line);
					} else {
						var ret:Dynamic = null;
						var oldsize = sizes.pop();
						if (stack.length > oldsize) ret = stack.pop();
						while (stack.length > oldsize) stack.pop(); // clean up stack ...
						if (ret != null) stack.push(ret);
						containers.clear();
						arrays.clear();
						localmaps.pop();
						blocks.pop();
						continue;
					}
				}
			} else throw genCodeError("[break] should be put in loop", instr.node.line);
			
		case INS_CONTINUE:
			
			var hasLoop = false;
			for (b in blocks) {
				if (b.type == BLK_FOR || b.type == BLK_WHILE) {
					hasLoop = true;
					break;
				} else if (b.type == BLK_FUNC) {
					hasLoop = false;
					break;
				}
			}
			if (hasLoop) {
				while (blocks.length > 0) {
					var block = blocks.first();
					if (block.type == BLK_WHILE) {
						cursor = block.begin + 1;
						break;
					} else if (block.type == BLK_FOR) {
						cursor = block.begin + 1;
						break;
					} else if (block.type == BLK_FUNC) {
						throw genCodeError("[continue] should be put in loop", instr.node.line);
					} else {
						var ret:Dynamic = null;
						var oldsize = sizes.pop();
						if (stack.length > oldsize) ret = stack.pop();
						while (stack.length > oldsize) stack.pop(); // clean up stack ...
						if (ret != null) stack.push(ret);
						containers.clear();
						arrays.clear();
						localmaps.pop();
						blocks.pop();
						continue;
					} 
				}
			} else throw genCodeError("[continue] should be put in loop", instr.node.line);
			
		case INS_ARRAY_BEGIN:
			arrays.push(new Array<Dynamic>());
			cursor++;
			
		case INS_ARRAY_DEFINE:
			arrays.first().push(stack.pop());
			cursor++;
			
		case INS_ARRAY_END:
			stack.push(arrays.pop());
			cursor++;
			
		case INS_ARRAY_ITEM:
			var arr = stack.pop();
			var idx = stack.pop();
			containers.push(idx);
			containers.push(arr);
			stack.push(arr[idx]);
			cursor++;
			
		case INS_FUNC:
			cursor++;
			
		case INS_FUNC_END:
			if (calls.length > 0) {
				var call = calls.pop();
				cursor = call.from + 1;
			} else throw genCodeError("Invalid function ending", instr.node.line);
			
		case INS_CALL:
			switch ( instr.node.expr.maintype ) {
			case AECall:
				var obj = stack.pop();
				var args:Array<Dynamic> = new Array<Dynamic>();
				for (p in 0...instr.node.expr.intval) args.push(stack.pop());
				args.reverse(); // reset params in right order
				var func:Func = null;
				var call:Call = null;
				switch ( instr.node.expr.subtype ) {
				case AEIdent:
					var id = instr.node.expr.strval;
					if (funcs.exists(id)) func = funcs[id];
					if (func != null) {
						call = newCall(func);
					} else throw genCodeError("Invalid function call: " + id, instr.node.line);
				case AEField:
					var f = instr.node.expr.strval;
					obj = containers.pop();
					var ret = Reflect.callMethod(obj, Reflect.field(obj, f), args);
					stack.push(ret);
				default:
					throw genCodeError("Invalid function call", instr.node.line);
				}
				
				if (func == null || call == null) cursor++;
				else {
					var localmap = new Map<String, Dynamic>();
					for (pidx in 0...instr.node.expr.intval) localmap.set(func.args[pidx], args[pidx]);
					stack.push(localmap);
					calls.push(call);
					cursor = call.entry;
				}
				
			default: throw genCodeError("Invalid token", instr.node.line);
			}
			
		case INS_NEW:
			switch ( instr.node.expr.maintype ) {
			case AENew:
				var cl = instr.node.expr.strval;
				var args:Array<Dynamic> = new Array<Dynamic>();
				for (p in 0...instr.node.expr.intval) args.push(stack.pop());
				args.reverse(); // reset params in right order
				
				var c = Type.resolveClass(cl);
				if (c == null) {
					var matchedMap: Map<String, Dynamic> = loadIdent(cl);
					if (matchedMap != null) c = matchedMap[cl];
				}
				
				if (c == null) throw genCodeError("Unknown type: " + cl, instr.node.line);
				else stack.push(Type.createInstance(c, args));
				
			default: throw genCodeError("Invalid token", instr.node.line);
			}
			cursor++;
			
		case INS_THROW:
			throw stack.pop();
		
		case INS_TRY:
			cursor++;
			
		case INS_TRY_END:
			cursor = instr.target;
			
		case INS_CATCH:
			switch ( instr.node.expr.maintype ) {
			case AETry:
				var n = instr.node.expr.strval;
				var localmap = new Map<String, Dynamic>();
				localmap.set(n, stack.pop());
				stack.push(localmap);
				
			default: throw genCodeError("Invalid token", instr.node.line);
			}
			cursor++;
			
		case INS_CATCH_END:
			cursor++;
			
		case INS_OBJECT:
			switch ( instr.node.expr.maintype ) {
			case AEObject:
				var names:Array<String> = instr.node.expr.arrval;
				var values:Array<Dynamic> = new Array<Dynamic>();
				for (n in names) values.push(stack.pop());
				values.reverse(); // reset values in right order
				var obj = { };
				for (idx in 0...names.length) Reflect.setField(obj, names[idx], values[idx]);
				stack.push(obj);
				
			default: throw genCodeError("Invalid token", instr.node.line);
			}
			cursor++;
			
		default:
			trace("Unhandled: " + instr.opcode);
			
		}
		
	}
	
	private function tryToExec(justOneInstr: Bool = false) {
		if (state == STATE_READY || state == STATE_ACTIVATED) state = STATE_RUNNING;
		if (state != STATE_RUNNING) return;
		try {
			
			#if hscriptPos
			var lastLine = 0;
			var currentLine = 0;
			if (cursor <= code.length) lastLine = code[cursor - 1].node.line;
			#end
			
			if (justOneInstr) {
				
				if (cursor <= code.length) {
				
					execInstr(code[cursor - 1]);
					
					#if hscriptPos
					if (cursor <= code.length) {
						currentLine = code[cursor - 1].node.line;
						if (onLine != null && currentLine != lastLine) onLine(currentLine);
					}
					lastLine = currentLine;
					#end
				}
				
			} else {
				
				while (cursor <= code.length) {
				
					execInstr(code[cursor - 1]);
					
					#if hscriptPos
					if (cursor <= code.length) {
						currentLine = code[cursor - 1].node.line;
						if (onLine != null && currentLine != lastLine) onLine(currentLine);
					}
					lastLine = currentLine;
					#end
					
					if (state != STATE_RUNNING) break;
				}
			}
			
			
			
		} catch (err:Dynamic) {
			
			#if (debug && hscriptPos)
			trace("Exception found: " + err + " (line: " + code[cursor - 1].node.line + ")");
			#end
			
			var block:Block = null;
			for (b in blocks) {
				if (b.type == BLK_TRY) {
					block = b;
					break;
				}
			}
			
			if (block != null && block.next > 0) {
				
				// clean up blocks in try
				while (blocks.length > 0) {
					var block = blocks.first();
					if (block.type == BLK_WHILE) {
						blocks.pop();
						continue;
					} else if (block.type == BLK_FOR) {
						localmaps.pop();
						blocks.pop();
						continue;
					} else if (block.type == BLK_FUNC) {
						localmaps.pop();
						blocks.pop();
						calls.pop();
						continue;
					} else {
						var ret:Dynamic = null;
						var oldsize = sizes.pop();
						if (stack.length > oldsize) ret = stack.pop();
						while (stack.length > oldsize) stack.pop(); // clean up stack ...
						if (ret != null) stack.push(ret);
						containers.clear();
						arrays.clear();
						localmaps.pop();
						blocks.pop();
						if (block.type == BLK_TRY) break; else continue;
					}
				}
				
				stack.push(err);
				
				cursor = block.next;
				
				tryToExec(justOneInstr);
				
			} else {
				state = STATE_FAIL;
				throw err;
			}
		}
	}
	
	public function hasFunc(fn:String): Bool {
		return funcs.exists(fn);
	}
	
	public function getContext(): InterpContext {
		var ctx: InterpContext = {
			stack: this.stack.filter(function(x) { return true; }),
			sizes: this.sizes.filter(function(x) { return true; }),
			containers: this.containers.filter(function(x) { return true; } ),
			arrays: this.arrays.filter(function(x) { return true; } ),
			calls: this.calls.filter(function(x) { return true; }),
			blocks: this.blocks.filter(function(x) { return true; }),
			localmaps: this.localmaps.filter(function(x) { return true; }),
			cursor: this.cursor,
			state: this.state
		}
		return ctx;
	}
	
	public function setContext(ctx: InterpContext): Bool {
		if (this.state < STATE_READY) return false;
		//this.reset();
		this.stack = ctx.stack;
		this.sizes = ctx.sizes;
		this.containers = ctx.containers;
		this.arrays = ctx.arrays;
		this.calls = ctx.calls;
		this.blocks = ctx.blocks;
		this.localmaps = ctx.localmaps;
		this.cursor = ctx.cursor;
		this.state = ctx.state;
		return true;
	}
	
	private function prepareFunc(fn:String, args:Array<Dynamic> = null): Int {
		if (state < STATE_READY || state > STATE_RUNNING) return state;
		if (code.length <= 0) return STATE_UNRUNNABLE;
		if (!funcs.exists(fn)) return STATE_UNRUNNABLE;
		var func = funcs[fn];
		if (func != null) {
			var call = newCall(func);
			var localmap = new Map<String, Dynamic>();
			if (args != null && args.length > 0) {
				for (pidx in 0...args.length) localmap.set(func.args[pidx], args[pidx]);
			}
			stack.push(localmap);
			calls.push(call);
			cursor = call.entry;
			call.from = code.length + 1;
			return state;
		}
		return STATE_UNRUNNABLE;
	}
	
	private function getExecState(): Int {
		if (state == STATE_RUNNING && cursor > code.length && calls.length <= 0)
			state = STATE_SUCCESS;
		return state;
	}
	
	public function callFunc(fn:String, args:Array<Dynamic> = null, stepByStep: Bool = false): Int {
		
		var currentState = prepareFunc(fn, args);

		if (currentState < STATE_READY || currentState > STATE_RUNNING) return currentState;
			
		tryToExec(stepByStep);
		
		return getExecState();
	}
	
	public function compile(sourceCode:String): Bool {
		var ok = false;
		var ast = parser.parseString(sourceCode);
		if (ast != null) {
			clear();
			markNewLinePos(sourceCode);
			genCode(ast);
			state = STATE_READY;
			ok = true;
		}
		return ok;
	}
	
	public function reset(): Int {
		if (state >= STATE_READY) {
			stack.clear();
			sizes.clear();
			containers.clear();
			arrays.clear();
			calls.clear();
			blocks.clear();
			localmaps.clear();
			cursor = 0;
			state = STATE_READY;
		}
		return state;
	}

	public function suspend(): Int {
		if (state == STATE_RUNNING || state == STATE_ACTIVATED) state = STATE_SUSPENDED;
		return state;
	}
	
	public function resume(rightNow: Bool = false): Int {
		if (state == STATE_SUSPENDED) state = rightNow ? STATE_RUNNING : STATE_ACTIVATED;
		else if (state == STATE_ACTIVATED && rightNow) state = STATE_RUNNING;
		if (state == STATE_RUNNING && rightNow) {
			tryToExec();
			return getExecState();
		}
		return state;
	}
	
	private function prepare(): Int {
		if (state < STATE_READY || state > STATE_RUNNING) return state;
		if (code.length <= 0) return STATE_UNRUNNABLE;
		
		if (cursor <= 0) cursor = 1;
		
		return state;
	}
	
	public function run(): Int {
		
		var currentState = prepare();

		if (currentState < STATE_READY || currentState > STATE_RUNNING) return currentState;
			
		tryToExec();
			
		return getExecState();
		
	}
	
	public function proceed(): Int {
		if (state == STATE_READY || state == STATE_ACTIVATED || getExecState() == STATE_RUNNING) {
			if (cursor <= 0) prepare();
			tryToExec(true);
			return getExecState();
		}
		return state;
	}
	
	public function continues(): Int {
		if (state == STATE_READY || state == STATE_ACTIVATED || getExecState() == STATE_RUNNING) {
			tryToExec();
			return getExecState();
		}
		return state;
	}
	
	public function save(): String {
		
		var output = new Map<String, String>();
		if (output != null) {
			var serializer = new haxe.Serializer();
			serializer.serialize(code);
			output.set("code", serializer.toString());
		}
		if (output != null) {
			var serializer = new haxe.Serializer();
			serializer.serialize(funcs);
			output.set("function", serializer.toString());
		}
		if (output != null) {
			var serializer = new haxe.Serializer();
			serializer.serialize(endmap);
			output.set("block", serializer.toString());
		}
		if (output != null) {
			var serializer = new haxe.Serializer();
			serializer.serialize(looptimes);
			output.set("loop", serializer.toString());
		}
		if (output != null) {
			var serializer = new haxe.Serializer();
			serializer.serialize(newlinepos);
			output.set("line", serializer.toString());
		}
		if (output != null) {
			var serializer = new haxe.Serializer();
			serializer.serialize(output);
			return serializer.toString();
		}
		return "";
	}
	
	public function load(src: String): Bool {
		
		var ok = false;
		var input = new Map<String, String>();
		if (src != null && src.length > 0) {
			clear();
			if (src.length > 0) {
				var unserializer = new haxe.Unserializer(src);
				input = cast unserializer.unserialize();
				ok = true;
			}
			ok = ok && input.exists("code");
			if (ok) {
				var unserializer = new haxe.Unserializer(input.get("code"));
				code = cast unserializer.unserialize();
			}
			ok = ok && input.exists("function");
			if (ok) {
				var unserializer = new haxe.Unserializer(input.get("function"));
				funcs = cast unserializer.unserialize();
			}
			ok = ok && input.exists("block");
			if (ok) {
				var unserializer = new haxe.Unserializer(input.get("block"));
				endmap = cast unserializer.unserialize();
			}
			ok = ok && input.exists("loop");
			if (ok) {
				var unserializer = new haxe.Unserializer(input.get("loop"));
				looptimes = cast unserializer.unserialize();
			}
			ok = ok && input.exists("line");
			if (ok) {
				var unserializer = new haxe.Unserializer(input.get("line"));
				newlinepos = cast unserializer.unserialize();
			}
			
			if (ok) state = STATE_READY;
		}
		return ok;
	}
	
}
