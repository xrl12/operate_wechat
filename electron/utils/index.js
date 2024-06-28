import * as fs from "fs"


export const createFolderIfNotExist = (file_path) => {
    // 判断文件夹是否存在
    if (!fs.existsSync(file_path)) {
        // 如果不存在，创建文件夹
        fs.mkdirSync(file_path, {recursive: true});
    } else {
    }
}
