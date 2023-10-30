import * as path from 'path';
import { preprocess } from 'preprocess';
import * as compiler from '@vue/compiler-sfc';

export default function vitePreprocess(options = {}) {
  return {
    name: 'preprocess',
    async transform(code, id) {
      const extname = path.extname(id);

      function handleVue() {
        const compilerDOM = compiler.parse(code);
        const script = compilerDOM.descriptor.scriptSetup || compilerDOM.descriptor.script;
        const template = compilerDOM.descriptor.template;
        const styles = compilerDOM.descriptor.styles;
        let content = '';
        let compilerArr = [script, template, ...styles];
        let pointer = 0;
        let curCompiler = null;
        const typeEnum = {
          template: 'html',
          script: 'js',
          style: 'css',
        };
        for (var i = 1, len = compilerArr.length; i < len; i++) {
          pointer = i - 1;
          curCompiler = compilerArr[i];
          while (pointer >= 0 && compilerArr[pointer]?.loc.start.offset > curCompiler?.loc.start.offset) {
            compilerArr[pointer + 1] = compilerArr[pointer];
            pointer--;
          }
          compilerArr[pointer + 1] = curCompiler;
        }
        let curPointer = 0;
        const codeLen = code.length;
        for (var i = 0, len = compilerArr.length; i < len; i++) {
          const compilerDOM = compilerArr[i];
          if (null === compilerDOM) {
            continue;
          }
          const startPointer = compilerDOM.loc.start.offset;
          const endPointer = compilerDOM.loc.end.offset;
          content += code.substring(curPointer, startPointer);
          content += preprocess(compilerDOM.loc.source, options, { type: typeEnum[compilerDOM.type] });
          if (i === len - 1) {
            content += code.substring(endPointer, codeLen);
          }
          curPointer = endPointer;
        }
        return content;
      }
      switch (extname) {
        case '.js':
        case '.ts':
          let tsfResult = preprocess(code, options, { type: 'js' });
          return tsfResult;
        case '.vue':
          return handleVue();
        default:
          return code;
      }
    },
  };
}
