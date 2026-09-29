const fs = require('fs');
let c = fs.readFileSync('src/pages/FacultyPage.jsx', 'utf8');

const unclosed = `  const facultyUser = currentUser || {
    name: "Prof. Meenakshi Joshi",`;

const proper = `  const facultyUser = currentUser || {
    name: "Prof. Meenakshi Joshi",
    role: "Professor & HOD (Dravyaguna)",
    id: "FAC-AIIA-7712",
    email: "prof.mjoshi@aiia.gov.in",
    institution: "All India Institute of Ayurveda (AIIA), New Delhi",
    avatar: "MJ"
  };`;

const normalizedC = c.replace(/\r?\n/g, '\n');
const normalizedSearch = unclosed.replace(/\r?\n/g, '\n');

if (normalizedC.includes(normalizedSearch)) {
  const updated = normalizedC.replace(normalizedSearch, proper);
  fs.writeFileSync('src/pages/FacultyPage.jsx', updated, 'utf8');
  console.log("Successfully fixed facultyUser definition!");
} else {
  console.error("Unclosed facultyUser not found!");
}
