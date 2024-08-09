package com.example.bethedonor.ui.utils.validationRules

import android.util.Log
import android.util.Patterns
import com.arpitkatiyarprojects.countrypicker.utils.CountryPickerUtils
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale


object Validator {

    fun validateFirstName(name: String): ValidationResult {
        if (name.isEmpty()) {
            return ValidationResult(false, "*required")
        } else {
            if (name.length < 3) {
                return ValidationResult(false, "length should be atleast 3")
            }
            return ValidationResult(true, "")
        }
    }

    fun validateEmailId(emailId: String): ValidationResult {
        if (emailId.isEmpty()) {
            return ValidationResult(false, "*required")
        } else {
            if (!Patterns.EMAIL_ADDRESS.matcher(emailId).matches()) {
                return ValidationResult(false, "Invalid email-Format")
            }
            return ValidationResult(true, "")
        }
    }

    fun validatePhoneNo(mobileNo: String): ValidationResult {
        Log.d("mobileNo", mobileNo)
        if (mobileNo.isEmpty()) {
            return ValidationResult(false, "*required")
        } else {
            if (!CountryPickerUtils.isMobileNumberValid(mobileNo)) {
                return ValidationResult(false, "Phone number is not valid")
            }
            return ValidationResult(true, "")
        }
    }

    fun validateAge(date: String): ValidationResult {
        if (date.isEmpty()) {
            return ValidationResult(false, "*required")
        }
        val dateFormat = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
        val dob = Calendar.getInstance().apply {
            time = dateFormat.parse(date) ?: return ValidationResult(false, "only 18+ allowed")
        }
        val today = Calendar.getInstance()
        var age = today.get(Calendar.YEAR) - dob.get(Calendar.YEAR)
        if (today.get(Calendar.DAY_OF_YEAR) < dob.get(Calendar.DAY_OF_YEAR)) {
            age--
        }
        if (age < 18)
            return ValidationResult(false, "only 18+ allowed")
        return ValidationResult(true, "")

    }


    fun validateGender(gender: String): ValidationResult {
        return if (gender.isEmpty()) {
            ValidationResult(false, "*required")
        } else {
            ValidationResult(true, "")
        }
    }

    fun validateBloodGroup(bloodGroup: String): ValidationResult {
        return if (bloodGroup.isEmpty()) {
            ValidationResult(false, "*required")
        } else {
            ValidationResult(true, "")
        }
    }

    fun validateString(state: String): ValidationResult {
        return if (state.isEmpty()) {
            ValidationResult(false, "*required")
        } else {
            ValidationResult(true, "")
        }
    }

    fun validateDistrict(district: String): ValidationResult {
        return if (district.isEmpty()) {
            ValidationResult(false, "*required")
        } else {
            ValidationResult(true, "")
        }
    }

    fun validateCity(city: String): ValidationResult {
        return if (city.isEmpty()) {
            ValidationResult(false, "*required")
        } else {
            ValidationResult(true, "")
        }
    }

    fun validatePinCode(pinCode: String): ValidationResult {
        if (pinCode.isEmpty()) {
            return ValidationResult(false, "*required")
        } else {
            if (pinCode.length < 6) {
                return ValidationResult(false, "length should be atleast 6")
            }
            return ValidationResult(true, "")
        }
    }

    fun validatePassword(password: String): ValidationResult {
        if (password.isEmpty()) {
            return ValidationResult(false, "*required")
        } else {
            if (!Regex("[!@#\$%^&*()]").containsMatchIn(password)) {
                return ValidationResult(false, "should have special character")
            }
            if (!password.matches(Regex("\\S+"))) {
                return ValidationResult(false, "whitespace is not allowed")
            }
            if (password.length < 6) {
                return ValidationResult(false, "should be more than 6 characters")
            }
            return ValidationResult(true, "")
        }
    }

    fun validateConfirmPassword(password: String, cPassword: String): ValidationResult {
        if (password != cPassword) {
            return ValidationResult(false, "not matched")
        }
        return ValidationResult(true)
    }

    fun validateBloodUnit(unit: String): ValidationResult {
        if (unit.isEmpty()) {
            return ValidationResult(false, "required")
        } else if (unit.toInt() < 0) {
            return ValidationResult(false, "should be positive")
        }
        return ValidationResult(true)
    }

    fun validateTermsAndConditionChecker(status: Boolean): ValidationResult {
        return ValidationResult(
            status
        )
    }
}

data class ValidationResult(
    val status: Boolean = false,
    val errorComment: String = ""
)
