const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'CoursesPage.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize CRLF to LF
content = content.replace(/\r\n/g, '\n');

// Find the misplaced modals at the end
const misplacedMarker = `{/* NON-STUDENT CURRICULUM & ACCREDITATION INSPECTION MODAL (FACULTY, COLLEGE, ADMIN) */}`;
const parts = content.split(misplacedMarker);

if (parts.length !== 2) {
  throw new Error("Could not find misplacedMarker in CoursesPage.jsx");
}

let beforeModals = parts[0];
let modalsAndExport = misplacedMarker + parts[1];

// Extract modals code before "export default CoursesPage;"
const exportMarker = "export default CoursesPage;";
const modalParts = modalsAndExport.split(exportMarker);
const modalsCode = modalParts[0].trim();

// In beforeModals, find the closing of CoursesPage:
//     </div>
//   );
// }
const targetClosing = `    </div>
  );
}`;

if (!beforeModals.includes(targetClosing)) {
  throw new Error("Could not find targetClosing in beforeModals");
}

// Move modalsCode INSIDE CoursesPage before </div>
const correctedClosing = `      ${modalsCode}

    </div>
  );
}

export default CoursesPage;
`;

content = beforeModals.replace(targetClosing, correctedClosing);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully moved modals INSIDE CoursesPage component!");
