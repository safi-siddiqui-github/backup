import {
  DecoratorNode,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import { Suspense } from "react";
import { JSX } from 'react/jsx-runtime';

export interface YouTubePayload {
  videoID: string;
  key?: NodeKey;
}

export type SerializedYouTubeNode = Spread<
  {
    videoID: string;
  },
  SerializedLexicalNode
>;

function extractVideoID(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

function YouTubeComponent({ videoID }: { videoID: string }) {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden",
        maxWidth: "100%",
        margin: "1rem 0",
        borderRadius: "0.5rem",
      }}
    >
      <iframe
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
        src={`https://www.youtube.com/embed/${videoID}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video"
      />
    </div>
  );
}

export class YouTubeNode extends DecoratorNode<JSX.Element> {
  __videoID: string;

  static getType(): string {
    return "youtube";
  }

  static clone(node: YouTubeNode): YouTubeNode {
    return new YouTubeNode(node.__videoID, node.__key);
  }

  static importJSON(serializedNode: SerializedYouTubeNode): YouTubeNode {
    const node = $createYouTubeNode(serializedNode.videoID);
    return node;
  }

  exportJSON(): SerializedYouTubeNode {
    return {
      videoID: this.__videoID,
      type: "youtube",
      version: 1,
    };
  }

  constructor(videoID: string, key?: NodeKey) {
    super(key);
    this.__videoID = videoID;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("iframe");
    element.setAttribute("src", `https://www.youtube.com/embed/${this.__videoID}`);
    element.setAttribute("width", "560");
    element.setAttribute("height", "315");
    element.setAttribute("frameborder", "0");
    element.setAttribute("allowfullscreen", "true");
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {};
  }

  createDOM(): HTMLElement {
    const div = document.createElement("div");
    div.className = "editor-youtube";
    return div;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <YouTubeComponent videoID={this.__videoID} />
      </Suspense>
    );
  }
}

export function $createYouTubeNode(videoIDOrURL: string): YouTubeNode {
  const videoID = extractVideoID(videoIDOrURL) || videoIDOrURL;
  return new YouTubeNode(videoID);
}

export function $isYouTubeNode(
  node: LexicalNode | null | undefined
): node is YouTubeNode {
  return node instanceof YouTubeNode;
}
