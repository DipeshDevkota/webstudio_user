const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    role: {
        type: String,
        enum: ["Admin", "Staff", "Student"], 
        required: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"]
    },
    commonInfo: {
        phone: {
            type: Number,
            required: true,
            validate: {
                validator: function (v) {
                    return /^\d{10}$/.test(v.toString());
                },
                message: "Invalid phone number format"
            }
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"]
        },
        dob: {
            type: Date,
            required: true
        },
        address: {
            permanent: { type: String, required: true },
            temporary: { type: String, required: true }
        },
        personalDetails: {
            bloodGroup: {
                type: String,
                enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
            },
            religion: String,
            motherTongue: String,
            languageKnown: [String]
        },
        citizenshipId: { type: String, unique: true },
        panNo: { type: String, unique: true },
        epfNo: String
    },
    staffInfo: {
        professional: {
            staffId: { type: String, unique: true },
            staffType: String,
            designation: String,
            qualification: String
        },
        paymentInfo: {
            payrollType: { type: String, enum: ["Monthly", "Hourly"] },
            basicSalary: { type: Number, min: 1000 },
            deductions: [String],
            allowances: [String]
        },
        bankDetails: {
            accountHolderName: String,
            accountNo: { type: String, unique: true },
            bankName: String,
            branchName: String,
            ifscCode: String
        },
        nominee: {
            name: String,
            contactNo: {
                type: Number,
                validate: {
                    validator: function (v) {
                        return /^\d{10}$/.test(v.toString());
                    },
                    message: "Invalid contact number format"
                }
            },
            email: { type: String, match: [/^\S+@\S+\.\S+$/, "Invalid email format"] },
            occupation: String
        }
    },
    studentInfo: {
        academics: {
            symbolNo: [{
                symbol: String,
                year: String,
                semester: String
            }]
        }
    },
    documents: {
        profileImage: String
    },
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
