---
title: dumi-plugin-code-snippets
---

<br>

## 从现有文件中导入代码片段

> 该功能完全借鉴的 [VitePress - Import Code Snippets](https://vitepress.dev/guide/markdown#import-code-snippets)，理论上写法完全一致。

<br>

**Snippets** <i>./snippets/install.bash</i>

<<< ./snippets/install.bash

**Input**

```markdown
<<< ./snippets/install.bash{2}
```

**Output**

<<< ./snippets/install.bash{2}

---

### Enable

<<< @/../README.md#enable
