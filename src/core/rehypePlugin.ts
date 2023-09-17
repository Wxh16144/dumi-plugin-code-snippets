import { unistUtilVisit } from 'dumi';

function rehypePlugin() {
  return (tree: any) => {
    unistUtilVisit.visit(tree, 'element', (node, index, parent) => {

    });
  };
}

export default rehypePlugin;
