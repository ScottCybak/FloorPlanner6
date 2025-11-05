# FloorPlanner 6

## Mantra's
1. No additional npm modules
2. Performance is priority
3. Larger screens only

### Core Goals
1. Render everything from the top-down (planner) view
2. Selection based property editor on side, which typematically updates items on screen
3. Mouse based drag n drop to move, click to resize.
4. Ability to save a file to the drive, and upload files to load
5. Utilize local caching mechanisms to retain unsaved changes
6. Basic ui to load files
7. Ability to zoom
8. Retain coordinates when reloading the page
9. Basic navigation warnings, eg: You have unsaved changes, are you sure you want to leave?
10. Basic command palette that lets you use the mouse to create from a list of available items/objects
11. Look half-decent, at the very least.
12. Alternate viewpoints (eg, side, front)
13. Canvas3D walkthrough mode

### Additional Goals
1. Keyboard shortcuts
2. Upgrade the looks if need be
3. Light/Dark mode with toggle
4. Snap to grid/edges with mouse movements where relevant
5. Alternatve views (side, front, rear)
6. Electrical
7. Plumbing
8. Skybox

## Setup
1. `npm install`
2. `npm run dev`
3. Open your browser to http://localhost:6969

## Dev notes
- watches /assets folder for changes, and copies everything into the /dist folder when needed
- starts at src/main.ts
- there's a src/data/testData currently being bootstrapped, it will likely not exist, as it currently does, when this gets released later.  It only contains information to build my current house

## Dev best practices
- services should be handled as singletons
- any custom objects/items should handle their own styling, dependant on the VIEW_TYPE that it's being passed
