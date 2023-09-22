import { dedent, rawPathToToken, resolvePath } from '../src/core/utils';

/* prettier-ignore */
const rawPathTokenMap: [string, Partial<{ filepath: string, extension: string, title: string, region: string, lines: string, lang: string }>][] = [
  ['/path/to/file.extension', { filepath: '/path/to/file.extension', extension: 'extension', title: 'file.extension' }],
  ['./path/to/file.extension', { filepath: './path/to/file.extension', extension: 'extension', title: 'file.extension' }],
  ['/path to/file.extension', { filepath: '/path to/file.extension', extension: 'extension', title: 'file.extension' }],
  ['./path to/file.extension', { filepath: './path to/file.extension', extension: 'extension', title: 'file.extension' }],
  ['/path.to/file.extension', { filepath: '/path.to/file.extension', extension: 'extension', title: 'file.extension' }],
  ['./path.to/file.extension', { filepath: './path.to/file.extension', extension: 'extension', title: 'file.extension' }],
  ['/path .to/file.extension', { filepath: '/path .to/file.extension', extension: 'extension', title: 'file.extension' }],
  ['./path .to/file.extension', { filepath: './path .to/file.extension', extension: 'extension', title: 'file.extension' }],
  ['/path/to/file', { filepath: '/path/to/file', title: 'file' }],
  ['./path/to/file', { filepath: './path/to/file', title: 'file' }],
  ['/path to/file', { filepath: '/path to/file', title: 'file' }],
  ['./path to/file', { filepath: './path to/file', title: 'file' }],
  ['/path.to/file', { filepath: '/path.to/file', title: 'file' }],
  ['./path.to/file', { filepath: './path.to/file', title: 'file' }],
  ['/path .to/file', { filepath: '/path .to/file', title: 'file' }],
  ['./path .to/file', { filepath: './path .to/file', title: 'file' }],
  ['/path/to/file.extension#region', { filepath: '/path/to/file.extension', extension: 'extension', title: 'file.extension', region: '#region' }],
  ['./path/to/file.extension {c#}', { filepath: './path/to/file.extension', extension: 'extension', title: 'file.extension', lang: 'c#' }],
  ['/path to/file.extension {1,2,4-6}', { filepath: '/path to/file.extension', extension: 'extension', title: 'file.extension', lines: '1,2,4-6' }],
  ['/path to/file.extension {1,2,4-6 c#}', { filepath: '/path to/file.extension', extension: 'extension', title: 'file.extension', lines: '1,2,4-6', lang: 'c#' }],
  ['/path.to/file.extension [title]', { filepath: '/path.to/file.extension', extension: 'extension', title: 'title' }],
  ['./path.to/file.extension#region {c#}', { filepath: './path.to/file.extension', extension: 'extension', title: 'file.extension', region: '#region', lang: 'c#' }],
  ['/path/to/file#region {1,2,4-6}', { filepath: '/path/to/file', title: 'file', region: '#region', lines: '1,2,4-6' }],
  ['./path/to/file#region {1,2,4-6 c#}', { filepath: './path/to/file', title: 'file', region: '#region', lines: '1,2,4-6', lang: 'c#' }],
  ['/path to/file {1,2,4-6 c#} [title]', { filepath: '/path to/file', title: 'title', lines: '1,2,4-6', lang: 'c#' }],
  ['./path to/file#region {1,2,4-6 c#} [title]', { filepath: './path to/file', title: 'title', region: '#region', lines: '1,2,4-6', lang: 'c#' }],
]

describe('core/utils', () => {
  describe('dedent', () => {
    it('when 0-level is minimal, do not remove spaces', () => {
      expect(
        dedent(
          [
            //
            'fn main() {',
            '  println!("Hello");',
            '}',
          ].join('\n'),
        ),
      ).toMatchInlineSnapshot(`
        "fn main() {
          println!(\\"Hello\\");
        }"
      `);
    });

    it('when 4-level is minimal, remove 4 spaces', () => {
      expect(
        dedent(
          [
            //
            '    let a = {',
            '        value: 42',
            '    };',
          ].join('\n'),
        ),
      ).toMatchInlineSnapshot(`
        "let a = {
            value: 42
        };"
      `);
    });

    it('when only 1 line is passed, dedent it', () => {
      expect(dedent('    let a = 42;')).toEqual('let a = 42;');
    });

    it('handle tabs as well', () => {
      expect(
        dedent(
          [
            //
            '	let a = {',
            '		value: 42',
            '	};',
          ].join('\n'),
        ),
      ).toMatchInlineSnapshot(`
        "let a = {
        	value: 42
        };"
      `);
    });
  });

  describe('rawPathToToken', () => {
    rawPathTokenMap.forEach(([rawPath, expected]) => {
      it(`when ${rawPath} is passed`, () => {
        expect(rawPathToToken(rawPath)).toMatchObject(expected);
      });
    });
  });

  describe('resolvePath', () => {
    const aliasMap = {
      'alias1/path/to': '/path/to/alias1',
      'alias2/some/subfolder': '/path/to/alias2',
      '@': '/path/to/alias1/path/to/alias2',
    };

    const testCases = [
      {
        input: 'alias1/path/to/utils/file.js',
        expected: '/path/to/alias1/utils/file.js',
      },
      {
        input: 'alias2/some/subfolder/style.css',
        expected: '/path/to/alias2/style.css',
      },
      {
        input: '@/style.css',
        expected: '/path/to/alias1/path/to/alias2/style.css',
      },
      {
        input: 'no/alias/here/file.txt',
        expected: 'no/alias/here/file.txt', // 无匹配别名
      },
      {
        input: 'alias1/path/to/alias2/file.js',
        expected: '/path/to/alias1/alias2/file.js', // 嵌套别名
      },
    ];

    testCases.forEach(({ input, expected }) => {
      it(`when ${input} is passed`, () => {
        expect(resolvePath(aliasMap, input)).toEqual(expected);
      });
    });
  });
});
