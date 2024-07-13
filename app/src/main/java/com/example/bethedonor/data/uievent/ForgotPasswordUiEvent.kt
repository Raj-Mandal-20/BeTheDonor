package com.example.bethedonor.data.uievent

sealed class ForgotPasswordUiEvent {
    data class EmailValueChangeEvent(val emailId: String) : ForgotPasswordUiEvent()
    data object DoneClickBtn : ForgotPasswordUiEvent()
}