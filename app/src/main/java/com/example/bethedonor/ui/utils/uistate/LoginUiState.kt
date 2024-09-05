package com.example.bethedonor.ui.utils.uistate
import com.example.bethedonor.ui.utils.validationRules.ValidationResult

data class LoginUiState(
    val emailId: String = "",
    val password: String = "",

    val emailIdErrorState: ValidationResult = ValidationResult(),
    val passwordErrorState: ValidationResult = ValidationResult(),
)