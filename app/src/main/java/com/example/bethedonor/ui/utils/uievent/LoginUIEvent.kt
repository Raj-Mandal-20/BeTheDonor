package com.example.bethedonor.ui.utils.uievent

sealed class LoginUIEvent {
    data class EmailValueChangeEvent(val emailId: String) : LoginUIEvent()
    data class PasswordValueChangeEvent(val password: String) : LoginUIEvent()

    data object RegistrationButtonClick : LoginUIEvent()
}