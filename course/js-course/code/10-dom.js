// Document Object Model
// manipulate html css via built-it browser apis 

// web browser
// most top header section is navigator with cancel and minimize
// Navigator
// represent the state and identity of browser ie user-agent
// Navigator object is used to retrieve things like user's preferred language, media stream from webcam, etc

// windows are browser tabs that a web apge is loaded into
// Window object having methods liek
// Window.innerWidth
// Window.innderHeight

// Document
// representation of dom, the actual page, by Document object
// each element in the dom is called a node

// Node
// Root node is the top node which is HTML 
// Child node, a node directly inside another node ike IMG inside SECTION
// Descendant node, a node anywhere inside the node, as IMG is descendant of BODY but a child of SECTION
// Parent node, a node having another node inside it, SECTION parent of IMG
// Sibling node, nodes that sits in sam elevel under same parent node, IMG and P are siblings
// NodeList is a reference of array-like object using querySelectorAll()
