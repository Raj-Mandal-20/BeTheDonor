package com.example.bethedonor.ui.utils.uievent

sealed class ForgotPasswordUiEvent {
    data class EmailValueChangeEvent(val emailId: String) : ForgotPasswordUiEvent()
    data object DoneClickBtn : ForgotPasswordUiEvent()
}