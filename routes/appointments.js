// routes/appointments.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all appointments
router.get('/', (req, res) => {
    db.query('SELECT * FROM appointments', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get an appointment by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM appointments WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Add a new appointment
router.post('/', (req, res) => {
    const { patient_id, date, time, treatment_type, status } = req.body;
    db.query('INSERT INTO appointments (patient_id, date, time, treatment_type, status) VALUES (?, ?, ?, ?, ?)', 
        [patient_id, date, time, treatment_type, status], (err, results) => {
        if (err) throw err;
        res.status(201).json({ id: results.insertId, ...req.body });
    });
});

// Update an appointment
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { patient_id, date, time, treatment_type, status } = req.body;
    db.query('UPDATE appointments SET patient_id = ?, date = ?, time = ?, treatment_type = ?, status = ? WHERE id = ?', 
        [patient_id, date, time, treatment_type, status, id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Appointment updated successfully' });
    });
});

// Delete an appointment
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM appointments WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Appointment deleted successfully' });
    });
});

module.exports = router;
