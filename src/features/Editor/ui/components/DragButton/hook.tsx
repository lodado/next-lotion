import { Fragment } from 'prosemirror-model'
import { ReactNode, useState } from 'react'

type FragmentToReactNodeProps = {
  fragment: Fragment;
};

const FragmentToReactNode = ({ fragment }: FragmentToReactNodeProps): ReactNode => {
  const renderNode = (node: any, index: number): ReactNode => {
    if (node.type.name === "image") {
      return (
        <img
          key={node.type.name + index}
          src={node.attrs.src}
          alt={node.attrs.alt || "Content"}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      );
    } else if (node.type.name === "br") {
      return <br key={node.type.name + index} />;
    } else if (node.isText) {
      return <span key={node.type.name + index} dangerouslySetInnerHTML={{ __html: node.text }} />;
    } else if (node.isBlock) {
      return <div key={node.type.name + index}>{renderFragment(node.content)}</div>;
    } else {
      return <span key={node.type.name + index}>Unsupported content</span>;
    }
  };

  const renderFragment = (fragment: Fragment): ReactNode => {
    const children: ReactNode[] = [];
    fragment.forEach((node, offset, index) => {
      children.push(renderNode(node, index));
    });

    return <>{children}</>;
  };

  return renderFragment(fragment);
};
 
export const useNodeDnDPlaceHolder = () => {
  const [placeholderPos, setPlaceholderPos] = useState({ x: 0, y: 0 })
  const [showPlaceholder, setShowPlaceholder] = useState(false)
  const [nodeContent, setNodeContent] = useState<ReactNode>(null)

  const handleNodeContent = (content: Fragment | null) => {
    if (content === null) {
      setNodeContent(null)

      return
    }

    setNodeContent(FragmentToReactNode({ fragment: content }));
  }

  const handlePlaceholderPos = ({ x, y }: { x: number; y: number }) => {
    setPlaceholderPos({ x, y })
  }

  const handleShowPlaceholder = (flag: boolean) => {
    setShowPlaceholder(flag)
  }

  return {
    placeholderPos,
    showPlaceholder,
    nodeContent,
    handleNodeContent,
    handlePlaceholderPos,
    handleShowPlaceholder,
  }
}
