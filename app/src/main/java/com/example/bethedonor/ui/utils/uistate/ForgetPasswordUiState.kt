package com.example.bethedonor.ui.utils.uistate
import com.example.bethedonor.ui.utils.validationRules.ValidationResult
data class ForgetPasswordUiState(
    val emailId: String = "",
    val emailIdErrorState: ValidationResult = ValidationResult()
)