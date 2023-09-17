import { unistUtilVisit } from 'dumi';

function remarkPlugin() {
  return (tree: any) => {
    unistUtilVisit.visit(tree, 'inlineCode', (node, index, parent) => {

    });
  };
}

export default remarkPlugin;
