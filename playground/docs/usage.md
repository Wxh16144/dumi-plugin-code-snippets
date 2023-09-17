---
title: Documents
---

你可以通过以下语法从现有文件中导入代码片段：

```markdown
<<< @/filepath
```

支持 dumi 的语法高亮行, <i>dumi@2.1.16+</i>

```markdown
<<< @/filepath{highlightLines}
```

**Code file**

<<< ./snippets/install.bash

**Input**

```markdown
<<< ./snippets/install.bash{2}
```

**Output**

<<< ./snippets/install.bash{2}

---

你也可以使用 [VS Code region](https://code.visualstudio.com/docs/editor/codebasics#_folding) 来只包括代码文件的相应部分。然后就可以在文件路径后面的 `#`` 后面提供自定义区域名称

```markdown
<<< @/snippets/snippet-with-region.js#snippet{1}
```

**Code file**

<<< ./snippets/usage.region.ts

**Input**

```markdown
<<< ./snippets/usage.region.ts#snippet
```

**Output**

<<< ./snippets/usage.region.ts#snippet
