import xslx from "xlsx"
import path from "path"
import fs from "fs"
import { fileURLToPath } from 'url';

function readExcel(relativePath, sheetIndex = 0) {
    const currentFilePath = fileURLToPath(import.meta.url);

    const filePath = path.resolve(path.dirname(currentFilePath), relativePath);

    if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist: ' + filePath);
    }

    const workbook = xslx.readFile(filePath);

    const sheetName = workbook.SheetNames[sheetIndex];
    if (!sheetName) {
        throw new Error(`Sheet index ${sheetIndex} not found`);
    }

    const sheet = workbook.Sheets[sheetName];
    const data = xslx.utils.sheet_to_json(sheet);


    return data;
}


export default readExcel