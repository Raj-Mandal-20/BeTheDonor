package com.example.bethedonor.ui.utils.uistate

import com.example.bethedonor.ui.utils.validationRules.ValidationResult

data class RegistrationUiState(
    val name: String = "",
    val emailId: String = "",
    val phoneNo: String = "",
    val date: String = "",
    val gender: String = "",
    val bloodGroup: String = "",
    val state: String = "",
    val city: String = "",
    val district: String = "",
    val pinCode: String = "",
    val password: String = "",
    val confirmPassword: String = "",
    val donationCenter: String = "",
    val bloodUnit: String = "",
    val checkedAvailabilityStatus: Boolean = true,

    val nameErrorState: ValidationResult = ValidationResult(),
    val emailIdErrorState: ValidationResult = ValidationResult(),
    val phoneNoErrorState: ValidationResult = ValidationResult(),
    val ageErrorState: ValidationResult = ValidationResult(),
    val genderErrorState: ValidationResult = ValidationResult(),
    val bloodGroupErrorState: ValidationResult = ValidationResult(),
    val stateErrorState: ValidationResult = ValidationResult(),
    val districtErrorState: ValidationResult = ValidationResult(),
    val cityErrorState: ValidationResult = ValidationResult(),
    val pinCodeErrorState: ValidationResult = ValidationResult(),
    val passwordErrorState: ValidationResult = ValidationResult(),
    val confirmPasswordState: ValidationResult = ValidationResult(),
    val donationCenterErrorState: ValidationResult = ValidationResult(),
    val bloodUnitErrorState: ValidationResult = ValidationResult(),
    val deadLineErrorState: ValidationResult = ValidationResult(),
)
