const fs = require('fs');
const content = fs.readFileSync('src/pages/FacultyPage.jsx', 'utf8');
const csIdx = content.indexOf('ComingSoonView');
const endCs = content.indexOf(')}', csIdx) + 2;

// Find the start of `return (` for the main component
const returnMatch = content.match(/return\s*\(\s*<div className="min-h-screen/);
const returnIdx = returnMatch.index;

console.log('Return index:', returnIdx);
console.log('ComingSoonView end index:', endCs);

const snippetToReplace = content.substring(returnIdx, endCs);
console.log('Length of snippet:', snippetToReplace.length);
console.log('Start of snippet:', snippetToReplace.substring(0, 100));
console.log('End of snippet:', snippetToReplace.substring(snippetToReplace.length - 100));
