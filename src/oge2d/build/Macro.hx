package oge2d.build;

import haxe.Json;
import haxe.io.Bytes;
import haxe.io.BytesInput;
import haxe.io.BytesOutput;
import haxe.zip.Entry;
import haxe.zip.Reader;
import haxe.zip.Tools;
import haxe.zip.Writer;
import haxe.crypto.Crc32;

/**
 * ...
 * @author JoeLam
 */
class Macro {

	public function new() {
		
	}
	
	public static function encrypt(bytes: Bytes, key: String) {
		if (key != null && key.length > 0 && bytes != null) {
			for (i in 0...bytes.length) {
				bytes.set(i, bytes.get(i) ^ key.charCodeAt(i % key.length));
			}
		}
	}
	public static function decrypt(bytes: Bytes, key: String) {
		encrypt(bytes, key);
	}
	
	
	#if macro
	
	private static function getFolderFiles(folder: String, parent: String, dirs: Map<String, String>, files: Map<String, String>) {
		var items = sys.FileSystem.readDirectory(folder);
		for (item in items) {
			var fullPath = folder + "/" + item;
			var relPath = parent.length > 0 ? parent + "/" + item : item;
			if (sys.FileSystem.isDirectory(fullPath)) {
				dirs.set(relPath, fullPath);
				getFolderFiles(fullPath, relPath, dirs, files);
			} else {
				files.set(relPath, fullPath);
			}
		}
	}
	
	public static function compileScripts(folder: String) {
		var fromFolder = sys.FileSystem.absolutePath(folder);
		if (!sys.FileSystem.exists(fromFolder)) return;
		
		var dirs: Map<String, String> = new Map<String, String>();
		var files: Map<String, String> = new Map<String, String>();
		
		getFolderFiles(fromFolder, "", dirs, files);
		
		var total: Int = 0;
		for (fileName in files.keys()) {
			var filepath = fromFolder + "/" + fileName;
			if (filepath.indexOf(".hs") > 0) {
				var compiler = new oge2d.script.BytecodeInterp();
				if (compiler.compile(sys.io.File.getContent(filepath))) {
					var binfile = StringTools.replace(filepath, ".hs", ".bin");
					if (sys.FileSystem.exists(binfile)) sys.FileSystem.deleteFile(binfile);
					sys.io.File.saveContent(binfile, compiler.save());
					total++;
				}
			}
		}
		
		trace("Compiled " + total + " script file(s)");
	}
	
	public static function cleanup(folder: String) {
		var fromFolder = sys.FileSystem.absolutePath(folder);
		if (!sys.FileSystem.exists(fromFolder)) return;
		
		var dirs: Map<String, String> = new Map<String, String>();
		var files: Map<String, String> = new Map<String, String>();
		
		getFolderFiles(fromFolder, "", dirs, files);
		
		for (fileName in files.keys()) {
			var filepath = fromFolder + "/" + fileName;
			if (filepath.indexOf(".bin") > 0) {
				sys.FileSystem.deleteFile(filepath);
			}
		}
		
		trace("Cleanup done");
	}
	
	public static function copyFiles(src: String, dst: String, exclude: String = "", settingFile: String = "") {
		
		var fromFolder = sys.FileSystem.absolutePath(src);
		var toFolder = sys.FileSystem.absolutePath(dst);
		if (!sys.FileSystem.exists(fromFolder)) return;
		if (!sys.FileSystem.exists(toFolder)) sys.FileSystem.createDirectory(toFolder);
		
		var dirs: Map<String, String> = new Map<String, String>();
		var files: Map<String, String> = new Map<String, String>();
		var validFiles: Map<String, String> = new Map<String, String>();
		
		getFolderFiles(fromFolder, "", dirs, files);
		
		var excludes: Array<String> = exclude != null && exclude.length > 0 ? exclude.split(";") : [];
		
		var settings = settingFile != null && settingFile.length > 0 ? 
						Json.parse(sys.io.File.getContent(sys.FileSystem.absolutePath(settingFile))) : null;
						
		var includes: Array<String> = settings != null && settings.include != null ? cast settings.include : [];
		var extmap: Array<Dynamic> = settings != null && settings.extmap != null ? cast settings.extmap : [];
		
		if (includes == null || includes.length <= 0) {
			for (fileName in files.keys()) validFiles.set(fileName, files[fileName]);
		} else {
			for (fileName in files.keys()) {
				var isIncluded: Bool = false;
				var fromFileName = fromFolder + "/" + fileName;
				for (item in includes) {
					if (fromFileName.indexOf(item) >= 0) {
						isIncluded = true;
						break;
					}
				}
				if (isIncluded) validFiles.set(fileName, files[fileName]);
			}
		}
		
		if (excludes != null && excludes.length > 0) {
			for (fileName in files.keys()) {
				var isExcluded: Bool = false;
				var fromFileName = fromFolder + "/" + fileName;
				for (item in excludes) {
					if (fromFileName.indexOf(item) >= 0) {
						isExcluded = true;
						break;
					}
				}
				if (isExcluded) validFiles.remove(fileName);
			}
		}
		
		for (dirName in dirs.keys()) {
			var targetDir = toFolder + "/" + dirName;
			if (!sys.FileSystem.exists(targetDir)) sys.FileSystem.createDirectory(targetDir);
		}
		
		var total: Int = 0;
		for (fileName in validFiles.keys()) {
			var targetFile = fileName;
			for (item in extmap) {
				if (targetFile.indexOf(item.key) > 0) {
					targetFile = StringTools.replace(targetFile, item.key, item.value);
					break; // only replace one time
				}
			}
			sys.io.File.copy(validFiles[fileName], toFolder + "/" + targetFile);
			total++;
		}
		
		trace("Copied " + total + " file(s) to " + toFolder);
		
	}
	
	public static function pack(inputFolder: String, packFolderName: String, outputFile: String, exclude: String = "", settingFile: String = "", key: String = ""): Bool {
		
		var fromFolder = sys.FileSystem.absolutePath(inputFolder);
		var toFile = sys.FileSystem.absolutePath(outputFile);
		
		var folderName: String = packFolderName;
		if (folderName == null || folderName.length <= 0) {
			if (fromFolder.indexOf("/") < 0) folderName = fromFolder;
			else folderName = fromFolder.substr(fromFolder.lastIndexOf("/") + 1);
		}
		
		if (!sys.FileSystem.exists(fromFolder) || !sys.FileSystem.isDirectory(fromFolder)) return false;
		if (sys.FileSystem.exists(toFile) && sys.FileSystem.isDirectory(toFile)) return false;
		
		var dirs: Map<String, String> = new Map<String, String>();
		var files: Map<String, String> = new Map<String, String>();
		var validFiles: Map<String, String> = new Map<String, String>();
		
		getFolderFiles(fromFolder, "", dirs, files);
		
		var excludes: Array<String> = exclude != null && exclude.length > 0 ? exclude.split(";") : [];
		
		var settings = settingFile != null && settingFile.length > 0 ? 
						Json.parse(sys.io.File.getContent(sys.FileSystem.absolutePath(settingFile))) : null;
		var includes: Array<String> = settings != null && settings.include != null ? cast settings.include : [];
		var extmap: Array<Dynamic> = settings != null && settings.extmap != null ? cast settings.extmap : [];
		
		if (includes == null || includes.length <= 0) {
			for (fileName in files.keys()) validFiles.set(fileName, files[fileName]);
		} else {
			for (fileName in files.keys()) {
				var isIncluded: Bool = false;
				var fromFileName = fromFolder + "/" + fileName;
				for (item in includes) {
					if (fromFileName.indexOf(item) >= 0) {
						isIncluded = true;
						break;
					}
				}
				if (isIncluded) validFiles.set(fileName, files[fileName]);
			}
		}
		
		if (excludes != null && excludes.length > 0) {
			for (fileName in files.keys()) {
				var isExcluded: Bool = false;
				var fromFileName = fromFolder + "/" + fileName;
				for (item in excludes) {
					if (fromFileName.indexOf(item) >= 0) {
						isExcluded = true;
						break;
					}
				}
				if (isExcluded) validFiles.remove(fileName);
			}
		}
		
		var fileNames = validFiles.keys();
		if (!fileNames.hasNext()) return false;
		
		var entries: List<Entry> = new List<Entry>();
		
		for (fileName in fileNames) {
			
			var targetFile = fileName;
			for (item in extmap) {
				if (targetFile.indexOf(item.key) > 0) {
					targetFile = StringTools.replace(targetFile, item.key, item.value);
					break; // only replace one time
				}
			}
			
			var bytes: Bytes = sys.io.File.getBytes(validFiles[fileName]);
			
			var entry: Entry = {
				fileName: folderName + "/" + targetFile, 
				fileSize: bytes.length,
				fileTime: Date.now(),
				compressed: false,
				dataSize: 0,
				data: bytes,
				crc32: Crc32.make(bytes)
			};
			
			Tools.compress(entry, 2);
			
			entries.add(entry);
			
		}
		
		if (entries.length > 0) {
			
			var outputBytes: BytesOutput = new BytesOutput();
			var zipWriter: Writer = new Writer(outputBytes);
			
			zipWriter.write(entries);
			
			var bytes = outputBytes.getBytes();
			if (bytes.length <= 0) return false;
			
			encrypt(bytes, key);
			
			var toFolder: String = toFile.substring(0, toFile.lastIndexOf("/"));
			if (!sys.FileSystem.exists(toFolder)) sys.FileSystem.createDirectory(toFolder);
			
			if (sys.FileSystem.exists(toFile)) sys.FileSystem.deleteFile(toFile);
			sys.io.File.saveBytes(toFile, bytes);
			
			trace("Zipped to " + toFile);
			
			return true;
		}
		
		return false;
		
	}
	public static function unpack(inputFile: String, outputFolder: String, key: String = ""): Bool {
		
		if (!sys.FileSystem.exists(inputFile) || sys.FileSystem.isDirectory(inputFile)) return false;
		if (!sys.FileSystem.exists(outputFolder) || !sys.FileSystem.isDirectory(outputFolder)) return false;
		
		var bytes: Bytes = sys.io.File.getBytes(inputFile);
		if (bytes.length <= 0) return false;
		
		decrypt(bytes, key);
		
		var bytesInput: BytesInput = new BytesInput(bytes);
		var entries: List<Entry> = Reader.readZip(bytesInput);
		
		if (entries.length > 0) {
			for (entry in entries) {
				var fileName: String = entry.fileName;
				fileName = StringTools.replace(fileName, "/", "_");
				var fileBytes = Reader.unzip(entry);
				if (fileBytes != null && fileBytes.length > 0) {
					sys.io.File.saveBytes(outputFolder + "/" + fileName, fileBytes);
				}
			}
			trace("Unzipped to " + outputFolder);
			return true;
		}
		
		trace("Decompression done");
		return false;
		
	}
	
	#end
}
