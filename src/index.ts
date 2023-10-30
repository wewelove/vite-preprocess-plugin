import * as path from 'path';
import { preprocess } from 'preprocess'

interface Options{
    [propName: string]: boolean;
}
export default function vitePreprocess(options: Options = {}) {
    return {
        name: "preprocess",
        async transform(code: string, id: string) {
            const extname = path.extname(id);
            switch(extname) {
                case '.js':
                case '.ts':
                    let tsfResult = preprocess(code, options, {type: "js"});
                    return tsfResult;
                case '.vue':
                case '.nvue':
                    let result = preprocess(code, options, {type: "html"});
                    result = preprocess(result, options, {type: "js"});
                    result = preprocess(result, options, {type: "css"});
                    return result;
                default:
                    return code;
            }
        }
    }
}