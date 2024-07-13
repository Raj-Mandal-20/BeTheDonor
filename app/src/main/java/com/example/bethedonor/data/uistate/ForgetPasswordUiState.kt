package com.example.bethedonor.data.uistate
import com.example.bethedonor.data.validationRules.ValidationResult
data class ForgetPasswordUiState(
    val emailId: String = "",
    val emailIdErrorState: ValidationResult = ValidationResult()
)