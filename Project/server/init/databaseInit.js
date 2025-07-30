// seed.js
const mongoose = require('mongoose');
const { generateCouponCode } = require('./ArrayInit.js'); // Correctly imports function
const CouponCodes = require('../models/couponCode.js'); // Correctly imports Mongoose model (adjust path if needed, e.g., '../models/couponCode.js')

async function seedDatabase() {
    try {
        // 1. Connect to MongoDB
        await mongoose.connect('mongodb://127.0.0.1:27017/Internship');
        console.log('Connected to MongoDB!');

        // 2. Generate unique coupon documents
        const couponDocuments = [];
        const generatedCodes = new Set();

        while (couponDocuments.length < 50) {
            // Pass the desired length (e.g., 6) to generateCouponCode
            const code = generateCouponCode(6);
            if (!generatedCodes.has(code)) {
                generatedCodes.add(code);
                const type = Math.random() < 0.5 ? 'gift' : 'cashback';
                couponDocuments.push({
                    code: code,
                    type: type
                });
            }
        }
        console.log(`Generated ${couponDocuments.length} unique coupon codes in memory.`);

        // 3. Clear existing coupon codes in the database (optional, for fresh seeding)
        await CouponCodes.deleteMany({});
        console.log('Cleared existing coupon codes from the database.');

        // 4. Insert new coupon codes efficiently
        await CouponCodes.insertMany(couponDocuments);
        console.log(`Successfully inserted ${couponDocuments.length} coupon codes into the database.`);

        // Verification log (optional, use after successful insertion)
        const savedCoupons = await CouponCodes.find({});
        console.log("\n--- Verifying Saved Coupons ---");
        savedCoupons.forEach(coupon => {
            console.log(`Code: ${coupon.code}, Type: ${coupon.type}, ID: ${coupon._id}`);
        });
        console.log("-----------------------------\n");


        console.log('Database seeding complete!');

    } catch (error) {
        console.error('Error during database seeding:', error);
        if (error.name === 'ValidationError') {
            console.error('Mongoose Validation Error details:');
            for (const field in error.errors) {
                console.error(`  ${field}: ${error.errors[field].message}`);
            }
        } else if (error.code === 11000) {
            console.error('MongoDB Duplicate Key Error: A unique code generated already exists.');
        } else {
            console.error('Generic Error:', error.message);
        }
    } finally {
        // 5. Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

// Call the main seeding function to start the process
seedDatabase();