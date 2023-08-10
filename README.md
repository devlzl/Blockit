# Blockit

Block-based collaborative rich text editor with whiteboard.


## Features
- [x] Text editing
  - [x] Inline style
  - [x] Format Bar
- [x] Block operation
  - [x] Cross-block selection and format
  - [x] API for add / update / delete block
- [x] Whiteboard
  - [x] Pen element
  - [x] Shape element
  - [x] NoteBlock for blending document mode
  - [x] Selection, Move, Resize
- [x] collaborative
  - [x] CRDT(Yjs) data structure
  - [x] undo / redo


## Source Code Structure
```
├── blocks                # built-in blocks
  ├── page-block          # top-level container
      ├── docs
      └── whiteboard
  ├── note-block          # for blending docs and whiteboard
  └── text-block          # plain text and heading
├── editor
  └── Editor.vue          # out-of-the-box editor
├── kernel
    ├── Kernel.js         # rich-text editing kernel, natively CRDT
    ├── RichText.vue      # minimized rich text editing component
    └── service
        ├── EventService  # handle various input event
        └── RangeService  # handle selection and range
├── store
    ├── Block             # block model stored as Y.Map
    ├── EventEmitter      # simplified event emitter
    └── Page              # highest level container, provides a set of APIs for operating block
├── visual
    ├── SurfaceManager    # manage visual elements
    ├── Renderer          # canvas renderer
    ├── GridManager       # manage elements by grid coordinate
    └── elements          # element model stored as Y.Map
```
