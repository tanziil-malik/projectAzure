// index.js
// Simple Employee API for demo/deployment
const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

let employees = [
    { id: 1, name: "Ayesha Khan", role: "Web Developer", salary: 90000 },
    { id: 2, name: "Omar Ali", role: "Designer", salary: 65000 },
    { id: 3, name: "Sara Iqbal", role: "Manager", salary: 90000 }
];

app.get('/', (req, res) => {
    res.send('🚀 your Employee App (Node) - Running');
});

app.get('/employees', (req, res) => {
    res.json(employees);
});

app.get('/employee/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const emp = employees.find(e => e.id === id);
    if (!emp) return res.status(404).json({ error: 'Employee not found' });
    res.json(emp);
});

app.post('/employees', (req, res) => {
    const { name, role, salary } = req.body;
    if (!name || !role || !salary) return res.status(400).json({ error: 'name, role, salary required' });
    const newId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    const newEmp = { id: newId, name, role, salary };
    employees.push(newEmp);
    res.status(201).json(newEmp);
});

app.put('/employee/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = employees.findIndex(e => e.id === id);
    if (index === -1) return res.status(404).json({ error: 'Employee not found' });
    const { name, role, salary } = req.body;
    if (name !== undefined) employees[index].name = name;
    if (role !== undefined) employees[index].role = role;
    if (salary !== undefined) employees[index].salary = salary;
    res.json(employees[index]);
});

app.delete('/employee/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const prevLen = employees.length;
    employees = employees.filter(e => e.id !== id);
    if (employees.length === prevLen) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
});

app.listen(PORT, () => {
    console.log(`✅ Employee App running on http://localhost:${PORT}`);
});
