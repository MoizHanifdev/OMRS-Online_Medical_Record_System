const fs = require('fs');
const path = require('path');

const tabs = [
  'problems', 'allergies', 'vitals', 'medications', 'labs', 
  'radiology', 'notes', 'history', 'care-plans', 'insurance', 'instructions'
];

const content = `import PatientPlaceholderTab from '../_components/TabPlaceholder';
export default PatientPlaceholderTab;
`;

tabs.forEach(tab => {
  const dir = path.join(__dirname, 'src', 'app', '(dashboard)', 'patients', '[id]', tab);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});
console.log('Placeholders created.');
