// Duplicate of: https://github.com/vuejs/vitepress/blob/f186901a5157c904b3593089d72f2bad3530e7a3/src/node/markdown/plugins/snippet.ts

/**
 * raw path format: "/path/to/file.extension#region {meta} [title]"
 *    where #region, {meta} and [title] are optional
 *    meta can be like '1,2,4-6 lang', 'lang' or '1,2,4-6'
 *    lang can contain special characters like C++, C#, F#, etc.
 *    path can be relative to the current file or absolute
 *    file extension is optional
 *    path can contain spaces and dots
 *
 * captures: ['/path/to/file.extension', 'extension', '#region', '{meta}', '[title]']
 */
export const rawPathRegexp =
  /^(.+?(?:(?:\.([a-z0-9]+))?))(?:(#[\w-]+))?(?: ?(?:{(\d+(?:[,-]\d+)*)? ?(\S+)?}))? ?(?:\[(.+)\])?$/;

export function rawPathToToken(rawPath: string) {
  const [filepath = '', extension = '', region = '', lines = '', lang = '', rawTitle = ''] = (
    rawPathRegexp.exec(rawPath) || []
  ).slice(1);

  const title = rawTitle || filepath.split('/').pop() || '';

  return { filepath, extension, region, lines, lang, title };
}

export function dedent(text: string): string {
  const lines = text.split('\n');

  const minIndentLength = lines.reduce((acc, line) => {
    for (let i = 0; i < line.length; i++) {
      if (line[i] !== ' ' && line[i] !== '\t') return Math.min(i, acc);
    }
    return acc;
  }, Infinity);

  if (minIndentLength < Infinity) {
    return lines.map((x) => x.slice(minIndentLength)).join('\n');
  }

  return text;
}

function testLine(line: string, regexp: RegExp, regionName: string, end: boolean = false) {
  const [full, tag, name] = regexp.exec(line.trim()) || [];

  return (
    full && tag && name === regionName && tag.match(end ? /^[Ee]nd ?[rR]egion$/ : /^[rR]egion$/)
  );
}

export function findRegion(lines: Array<string>, regionName: string) {
  const regionRegexps = [
    /^\/\/ ?#?((?:end)?region) ([\w*-]+)$/, // javascript, typescript, java
    /^\/\* ?#((?:end)?region) ([\w*-]+) ?\*\/$/, // css, less, scss
    /^#pragma ((?:end)?region) ([\w*-]+)$/, // C, C++
    /^<!-- #?((?:end)?region) ([\w*-]+) -->$/, // HTML, markdown
    /^#((?:End )Region) ([\w*-]+)$/, // Visual Basic
    /^::#((?:end)region) ([\w*-]+)$/, // Bat
    /^# ?((?:end)?region) ([\w*-]+)$/, // C#, PHP, Powershell, Python, perl & misc
  ];

  let regexp = null;
  let start = -1;

  // @ts-ignore
  for (const [lineId, line] of lines.entries()) {
    if (regexp === null) {
      for (const reg of regionRegexps) {
        if (testLine(line, reg, regionName)) {
          start = lineId + 1;
          regexp = reg;
          break;
        }
      }
    } else if (testLine(line, regexp, regionName, true)) {
      return { start, end: lineId, regexp };
    }
  }

  return null;
}

export function resolvePath(aliasMap: Record<string, string>, inputPath: string) {
  for (const alias in aliasMap) {
    if (inputPath.startsWith(alias)) {
      return inputPath.replace(alias, aliasMap[alias]);
    }
  }
  return inputPath;
}
