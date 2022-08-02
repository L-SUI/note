const path = require("path");
const fs = require("fs");

const sidebarMap = require("./sidebar.js");

function handleFiles(dirpath) {
    return fs
        .readdirSync(dirpath)
        .filter(
            item =>
                item.endsWith(".md") &&
                fs.statSync(path.join(dirpath, item)).isFile()
        )
        .sort((prev, next) => (next.includes("README.md") ? 1 : 0))
        .map(item => item.replace(/(README)?(.md)$/, ""));
}
exports.inferSiderbars = () => {
    const sidebar = {
        '/note/': []
    };
    sidebarMap.forEach((rows) => {

        var { title, dirname, basePath, childrenDir } = rows
        if (!basePath) {
            const dirpath = path.resolve(__dirname, "../note/" + dirname);

            const parent = `/note/`;
            const children = handleFiles(dirpath).map(item => dirname+'/'+item);
            sidebar[parent].push({
                title,
                children,
                collapsable: true
            });
        } else {
            var dirList = childrenDir.map((row) => {
                const dirpath = path.resolve(__dirname, "../", basePath, row.path);
                const children = handleFiles(dirpath).map((url) => { return row.path + url })

                row.children = children;
                row.collapsable = false;
                row.sidebarDepth = 3;
                return row;
            })
            const parent = `/${basePath}/`;
            sidebar[parent] = dirList;
        }




    });

    return sidebar;
};