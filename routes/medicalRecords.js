// routes/medicalRecords.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all medical records
router.get('/', (req, res) => {
    db.query('SELECT * FROM medical_records', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a medical record by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM medical_records WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Get medical records by patient ID
router.get('/patient/:patient_id', (req, res) => {
    const { patient_id } = req.params;
    db.query('SELECT * FROM medical_records WHERE patient_id = ?', [patient_id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a new medical record
router.post('/', (req, res) => {
    const { patient_id, date, description } = req.body;
    db.query('INSERT INTO medical_records (patient_id, date, description) VALUES (?, ?, ?)', 
        [patient_id, date, description], (err, results) => {
        if (err) throw err;
        res.status(201).json({ id: results.insertId, ...req.body });
    });
});

// Update a medical record
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { patient_id, date, description } = req.body;
    db.query('UPDATE medical_records SET patient_id = ?, date = ?, description = ? WHERE id = ?', 
        [patient_id, date, description, id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Medical record updated successfully' });
    });
});

// Delete a medical record
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM medical_records WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Medical record deleted successfully' });
    });
});

module.exports = router;
