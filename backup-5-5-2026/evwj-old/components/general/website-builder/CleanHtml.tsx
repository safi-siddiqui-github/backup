// import sanitizeHtml from "sanitize-html";

// export function clean(dirty?: string | null) {
//     if (!dirty) return dirty;

//     const safe = sanitizeHtml(dirty, {
//         allowedTags: [
//             "p", "br", "hr",
//             "b", "strong", "i", "em", "u", "s", "strike", "span",
//             "ul", "ol", "li",
//             "table", "thead", "tbody", "tr", "th", "td",
//             "a", "blockquote",
//         ],
//         allowedAttributes: {
//             "*": ["style"],
//             a: ["href", "target"],
//             span: ["style"],
//         },
//         allowedStyles: {
//             "*": {
//                 "font-size": [/^\d+(px|em|rem|%)$/],
//                 "text-align": [/^(left|right|center|justify)$/],
//                 "color": [/.*/],
//                 "background-color": [/.*/],
//             },
//         },
//         transformTags: {
//             a: (_, attribs) => ({
//                 tagName: "a",
//                 attribs: {
//                     href: attribs.href,
//                     target: "_blank",
//                     rel: "noopener noreferrer",
//                 },
//             }),
//         },
//     });

//     return safe.trim();
// }
