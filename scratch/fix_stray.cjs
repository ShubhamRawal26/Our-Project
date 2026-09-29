const fs = require('fs');
let c = fs.readFileSync('src/pages/FacultyPage.jsx', 'utf8');
const search = `    role: "Professor & HOD (Dravyaguna)",
    id: "FAC-AIIA-7712",
    email: "prof.mjoshi@aiia.gov.in",
    institution: "All India Institute of Ayurveda (AIIA), New Delhi",
    avatar: "MJ"
  };`;

const normalizedC = c.replace(/\r?\n/g, '\n');
const normalizedSearch = search.replace(/\r?\n/g, '\n');

if (normalizedC.includes(normalizedSearch)) {
  const updated = normalizedC.replace(normalizedSearch, '');
  fs.writeFileSync('src/pages/FacultyPage.jsx', updated, 'utf8');
  console.log("Successfully removed stray object fragment!");
} else {
  console.error("Search string not found!");
}
