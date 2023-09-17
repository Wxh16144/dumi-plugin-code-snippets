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
    expect(
      remark().use(core, {}).processSync(generateFile(`<<< ./say-hi.ts{1}`)).toString(),
    ).toMatchSnapshot();
  });

  it('支持tsx', () => {
    expect(
      remark().use(core, {}).processSync(generateFile(`<<< ./My.tsx`)).toString(),
    ).toMatchSnapshot();
  });

  it('支持 vscode region', () => {
    expect(
      remark().use(core, {}).processSync(generateFile(`<<< ./My.tsx#snippet`)).toString(),
    ).toMatchSnapshot();
  });

  it('支持 region + 高亮行', () => {
    expect(
      remark().use(core, {}).processSync(generateFile(`<<< ./My.tsx#snippet{4}`)).toString(),
    ).toMatchSnapshot();
  });

  it('支持 css 文件', () => {
    expect(
      remark().use(core, {}).processSync(generateFile(`<<< ./style.css`)).toString(),
    ).toMatchSnapshot();
  });

  it('支持 c# 文件', () => {
    expect(
      remark().use(core, {}).processSync(generateFile(`<<< ./say-hi.cs`)).toString(),
    ).toMatchSnapshot();
  });

  it('支持 c# 文件 region', () => {
    expect(
      remark().use(core, {}).processSync(generateFile(`<<< ./say-hi.cs#main`)).toString(),
    ).toMatchSnapshot();
  });

  it('路径错误返回错误信息', () => {
    expect(remark().use(core, {}).processSync(generateFile(`<<< ./aa/bb/style.css`)).toString())
      .toMatchInlineSnapshot(`
      "\`\`\`css | pure
      Code snippet path not found: aa/bb/style.css
      \`\`\`
      "
    `);
  });
});
