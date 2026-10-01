const fs = require('fs');

let content = fs.readFileSync('src/lib/i18n.tsx', 'utf8');

// The broken pattern is: },\n  , "key": "val"... or just ,\n  , "key"
// These were injected incorrectly - they should be inside the locale block
// Pattern: closing brace of locale block followed by loose comma-separated keys
// We need: the loose keys should be inside the previous block (before the closing })

// Find and fix all instances of:
//   readMore: '....',\n  , "key"  =>  readMore: '....', "key"
// OR
//   'key': '....',\n  , "key"  =>  'key': '....', "key"

// Remove the \n  , pattern (newline + 2 spaces + comma at start of line)
// This is the orphaned comma that appears before the extra keys
content = content.replace(/,\r?\n  , "/g, ', "');
content = content.replace(/,\r?\n  , '/g, ", '");

fs.writeFileSync('src/lib/i18n.tsx', content, 'utf8');
console.log('Done. Checking for remaining issues...');

// Verify
if (content.includes('\n  , "') || content.includes("\n  , '")) {
  console.log('WARNING: still has broken pattern!');
} else {
  console.log('All clean!');
}
