const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    },
    inputPath: { type: String, required:true },
    outPath: { type: String },
    error: { type: String },
    completeAt: { type: Date }

}, { timestamps: true });

module.exports = mongoose.model('Jobs', jobSchema);