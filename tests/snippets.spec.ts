import { remark } from 'remark';
import { VFile } from 'vfile';

import { remarkPlugin as core } from '../src/core';

describe('snippet', () => {
  const generateFile = (content: string) =>
    new VFile({
      value: content.trim(),
      data: {
        frontmatter: {
          filename: './tests/__fixtures__/index.md',
        },
      },
      basename: 'index.md',
      extname: '.md',
    }) as unknown as string;

  it('基础功能', () => {
    expect(remark().use(core, {}).processSync(generateFile(`<<< ./say-hi.ts`)).toString())
      .toMatchInlineSnapshot(`
      "\`\`\`ts | pure
      console.log('Hello dumi-plugin-code-snippets!');

      export function doSomething() {
        return 1;
      }

      \`\`\`
      "
    `);
  });

  it('带高亮行', () => {
    expect(remark().use(core, {}).processSync(generateFile(`<<< ./say-hi.ts{1}`)).toString())
      .toMatchInlineSnapshot(`
      "\`\`\`ts {1}| pure
      console.log('Hello dumi-plugin-code-snippets!');

      export function doSomething() {
        return 1;
      }

      \`\`\`
      "
    `);
  });

  it('支持tsx', () => {
    expect(remark().use(core, {}).processSync(generateFile(`<<< ./My.tsx`)).toString())
      .toMatchInlineSnapshot(`
      "\`\`\`tsx | pure
      import * as React from 'react';

      export interface MyProps {
        slogan?: React.ReactNode;
      }

      // #region snippet
      function My(props: React.PropsWithChildren<MyProps>) {
        const { children } = props;
        return (
          <>
            <div className=\\"my-slogan\\">
              <p>魔法师正在进行最后的仪式，为您带来一项惊艳功能</p>
              <strong>TBD: The Brilliant Discovery!</strong>
            </div>
            {children}
            {/* This is my.tsx} */}
          </>
        );
      }
      // #endregion snippet

      export default My;

      \`\`\`
      "
    `);
  });

  it('支持 vscode region', () => {
    expect(remark().use(core, {}).processSync(generateFile(`<<< ./My.tsx#snippet`)).toString())
      .toMatchInlineSnapshot(`
      "\`\`\`tsx | pure
      function My(props: React.PropsWithChildren<MyProps>) {
        const { children } = props;
        return (
          <>
            <div className=\\"my-slogan\\">
              <p>魔法师正在进行最后的仪式，为您带来一项惊艳功能</p>
              <strong>TBD: The Brilliant Discovery!</strong>
            </div>
            {children}
            {/* This is my.tsx} */}
          </>
        );
      }
      \`\`\`
      "
    `);
  });

  it('支持 region + 高亮行', () => {
    expect(remark().use(core, {}).processSync(generateFile(`<<< ./My.tsx#snippet{4}`)).toString())
      .toMatchInlineSnapshot(`
      "\`\`\`tsx {4}| pure
      function My(props: React.PropsWithChildren<MyProps>) {
        const { children } = props;
        return (
          <>
            <div className=\\"my-slogan\\">
              <p>魔法师正在进行最后的仪式，为您带来一项惊艳功能</p>
              <strong>TBD: The Brilliant Discovery!</strong>
            </div>
            {children}
            {/* This is my.tsx} */}
          </>
        );
      }
      \`\`\`
      "
    `);
  });

  it('支持 css 文件', () => {
    expect(remark().use(core, {}).processSync(generateFile(`<<< ./style.css`)).toString())
      .toMatchInlineSnapshot(`
      "\`\`\`css | pure
      #App {
        color: red;
      }

      \`\`\`
      "
    `);
  });

  it.skip('路径错误返回错误信息', () => {
    expect(remark().use(core, {}).processSync(generateFile(`<<< ./aa/bb/style.css`)).toString())
      .toMatchInlineSnapshot(`
      "\`\`\`css | pure
      Code snippet path not found: /Users/wuxh/Code/SelfProject/dumi-plugin-code-snippets/tests/__fixtures__/aa/bb/style.css
      \`\`\`
      "
    `);
  });
});
