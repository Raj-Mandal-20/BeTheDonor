package com.example.bethedonor.data.uistate

import com.example.bethedonor.data.validationRules.ValidationResult
data class RegistrationUiState(
    val name: String = "",
    val emailId: String = "",
    val phoneNo: String = "",
    val age:String="",
    val gender:String="",
    val bloodGroup:String="",
    val state:String="",
    val city:String="",
    val district:String="",
    val pinCode:String="",
    val password: String = "",
    val confirmPassword: String = "",
    val checkedAvailabilityStatus: Boolean = false,

    val nameErrorState: ValidationResult = ValidationResult(),
    val emailIdErrorState: ValidationResult= ValidationResult(),
    val phoneNoErrorState:ValidationResult=ValidationResult(),
    val ageErrorState:ValidationResult=ValidationResult(),
    val genderErrorState:ValidationResult=ValidationResult(),
    val bloodGroupErrorState:ValidationResult=ValidationResult(),
    val stateErrorState:ValidationResult=ValidationResult(),
    val districtErrorState:ValidationResult=ValidationResult(),
    val cityErrorState:ValidationResult=ValidationResult(),
    val pinCodeErrorState:ValidationResult=ValidationResult(),
    val passwordErrorState: ValidationResult= ValidationResult(),
    val confirmPasswordState: ValidationResult= ValidationResult(),
    )
