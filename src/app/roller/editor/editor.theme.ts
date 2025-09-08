// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors

import { EditorView } from '@codemirror/view';

const chalky = "#e5c07b",
  coral = "#e06c75",
  cyan = "#56b6c2",
  invalid = "#ffffff",
  ivory = "#abb2bf",
  stone = "#7d8799", // Brightened compared to original to increase contrast
  malibu = "#61afef",
  sage = "#98c379",
  whiskey = "#d19a66",
  violet = "#c678dd",
  darkBackground = "#21252b",
  highlightBackground = "#4b5563",
  background = "#282c34",
  tooltipBackground = "#1E2939",
  selection = "#4b5563",
  cursor = "#528bff";

/// The editor theme styles for One Dark.
export const oneDarkTheme = EditorView.theme({
  "&": {
    color: ivory,
    colorScheme: "dark"
  },

  ".cm-scroller": {
    fontFamily: "Jetbrains Mono, monospace"
  },

  ".cm-content": {
    caretColor: cursor
  },

  "&.cm-focused": {
    outline: "none"
  },

  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: cursor
  },
  "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: selection
  },

  ".cm-panels": {
    backgroundColor: darkBackground,
    color: ivory
  },
  ".cm-panels.cm-panels-top": {
    borderBottom: "2px solid black"
  },
  ".cm-panels.cm-panels-bottom": {
    borderTop: "2px solid black"
  },

  ".cm-searchMatch": {
    backgroundColor: "#72a1ff59",
    outline: "1px solid #457dff"
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "#6199ff2f"
  },

  ".cm-activeLine": {
    backgroundColor: "#6699ff0b"
  },
  ".cm-selectionMatch": {
    backgroundColor: "#aafe661a"
  },

  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: "#bad0f847"
  },

  ".cm-gutters": {
    backgroundColor: background,
    color: stone,
    border: "none"
  },

  ".cm-activeLineGutter": {
    backgroundColor: highlightBackground
  },

  ".cm-placeholder": {
    color: "#99a1af"
  },

  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: "#99a1af"
  },

  ".cm-tooltip": {
    border: "1px solid #364153",
    borderRadius: ".5rem",
    backgroundColor: tooltipBackground,
    padding: "0.25rem",
    "&.cm-tooltip-autocomplete": {
      "& ul": {
        maxHeight: "20rem"
      },
      "& > ul > li": {
        padding: "0.25rem 0.5rem",
        borderRadius: ".25rem",
        "& .cm-completionDetail": {
          color: "#99A1AF"
        }
      },
      "& > ul > li[aria-selected]": {
        backgroundColor: highlightBackground
      }
    },
    "&.cm-tooltip-lint": {
      "& > ul > li[aria-selected]": {
        backgroundColor: highlightBackground
      }
    }
  },
  ".cm-tooltip .cm-tooltip-arrow:before": {
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  ".cm-tooltip .cm-tooltip-arrow:after": {
    borderTopColor: tooltipBackground,
    borderBottomColor: tooltipBackground
  },
  ".cm-diagnostic-error": {
    border: "none"
  }
}, { dark: true });
