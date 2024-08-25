// routes/patients.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all patients
router.get('/', (req, res) => {
    db.query('SELECT * FROM patients', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a patient by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM patients WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

router.post('/', async (req, res) => {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        const newPatient = await db.query(
            'INSERT INTO patients (name, email, phone, address) VALUES (?, ?, ?, ?)',
            [name, email, phone, address]
        );

        res.status(201).json({ id: newPatient.insertId, name, email, phone, address });
    } catch (error) {
        console.error('Error inserting patient:', error);
        res.status(500).json({ error: 'Failed to create patient' });
    }
});


// Update a patient
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    db.query('UPDATE patients SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?', 
        [name, email, phone, address, id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Patient updated successfully' });
    });
});

// Delete a patient
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM patients WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Patient deleted successfully' });
    });
});

module.exports = router;
