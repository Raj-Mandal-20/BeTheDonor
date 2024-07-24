package com.example.bethedonor.ui.utils.uievent

sealed class RegistrationUIEvent {
    data class NameValueChangeEvent(val name: String) : RegistrationUIEvent()
    data class EmailValueChangeEvent(val emailId: String) : RegistrationUIEvent()
    data class PhoneNoChangeEvent(val phoneNo: String) : RegistrationUIEvent()
    data class AgeValueChangeEvent(val age: String) : RegistrationUIEvent()
    data class GenderValueChangeEvent(val gender: String) : RegistrationUIEvent()
    data class BloodGroupValueChangeEvent(val bloodGroup: String) : RegistrationUIEvent()
    data class StateValueChangeEvent(val state: String) : RegistrationUIEvent()
    data class DistrictValueChangeEvent(val district: String) : RegistrationUIEvent()
    data class CityValueChangeEvent(val city: String) : RegistrationUIEvent()
    data class PinCodeValueChangeEvent(val pinCode: String) : RegistrationUIEvent()
    data class PasswordValueChangeEvent(val password: String) : RegistrationUIEvent()
    data class ConfirmPasswordValueChangeEvent(val confirmPassword: String) : RegistrationUIEvent()
    data class AvailabilityCheckerValueChangeEvent(val status: Boolean) :
        RegistrationUIEvent()

    data object RegistrationButtonClick : RegistrationUIEvent()
}
