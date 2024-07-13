package com.example.bethedonor.data.uistate
import com.example.bethedonor.data.validationRules.ValidationResult

data class LoginUiState(
    val emailId: String = "",
    val password: String = "",

    val emailIdErrorState: ValidationResult = ValidationResult(),
    val passwordErrorState: ValidationResult= ValidationResult(),
)