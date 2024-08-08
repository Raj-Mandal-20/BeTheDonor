package com.example.bethedonor.viewmodels

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.example.bethedonor.ui.utils.uievent.RegistrationUIEvent
import com.example.bethedonor.ui.utils.uistate.RegistrationUiState
import com.example.bethedonor.ui.utils.validationRules.Validator

class CreateRequestViewModel : ViewModel() {


    var newRequestUiState = mutableStateOf(RegistrationUiState())

    //***create-request-bottom-sheet ***//
    fun onEvent(event: RegistrationUIEvent) {
        when (event) {
            is RegistrationUIEvent.StateValueChangeEvent -> {
                newRequestUiState.value = newRequestUiState.value.copy(
                    district = event.state,
                    cityErrorState = Validator.validateString(event.state)
                )
            }

            is RegistrationUIEvent.DistrictValueChangeEvent -> {
                newRequestUiState.value = newRequestUiState.value.copy(
                    district = event.district,
                    cityErrorState = Validator.validateString(event.district)
                )
            }

            is RegistrationUIEvent.CityValueChangeEvent -> {
                newRequestUiState.value = newRequestUiState.value.copy(
                    city = event.city,
                    cityErrorState = Validator.validateString(event.city)
                )
            }

            is RegistrationUIEvent.PinCodeValueChangeEvent -> {
                newRequestUiState.value = newRequestUiState.value.copy(
                    pinCode = event.pinCode,
                    pinCodeErrorState = Validator.validatePinCode(event.pinCode)
                )
            }

            is RegistrationUIEvent.BloodGroupValueChangeEvent -> {
                newRequestUiState.value = newRequestUiState.value.copy(
                    bloodGroup = event.bloodGroup,
                    bloodGroupErrorState = Validator.validateString(event.bloodGroup)
                )
            }

            is RegistrationUIEvent.BloodUnitValueChangeEvent -> {
                newRequestUiState.value = newRequestUiState.value.copy(
                    bloodUnit = event.unit,
                    bloodUnitErrorState = Validator.validateString(event.unit)
                )
            }

            is RegistrationUIEvent.DonationCenterValueChangeEvent -> {
                newRequestUiState.value = newRequestUiState.value.copy(
                    donationCenter = event.center,
                    donationCenterErrorState = Validator.validateString(event.center)
                )
            }
            is RegistrationUIEvent.DateValueChangeEvent -> {
                newRequestUiState.value = newRequestUiState.value.copy(
                    date = event.date,
                    deadLineErrorState = Validator.validateString(event.date)
                )
            }
            RegistrationUIEvent.RegistrationButtonClick -> TODO()
            is RegistrationUIEvent.AvailabilityCheckerValueChangeEvent -> {}
            is RegistrationUIEvent.ConfirmPasswordValueChangeEvent -> {}
            is RegistrationUIEvent.EmailValueChangeEvent -> {}
            is RegistrationUIEvent.GenderValueChangeEvent -> {}
            is RegistrationUIEvent.NameValueChangeEvent -> {}
            is RegistrationUIEvent.PasswordValueChangeEvent -> {}
            is RegistrationUIEvent.PhoneNoChangeEvent -> {}
        }
    }

    fun validateWithRulesForNewRequest(): Boolean {
        return newRequestUiState.value.donationCenterErrorState.status
                && newRequestUiState.value.stateErrorState.status
                && newRequestUiState.value.districtErrorState.status
                && newRequestUiState.value.cityErrorState.status
                && newRequestUiState.value.pinCodeErrorState.status
                && newRequestUiState.value.bloodGroupErrorState.status
                && newRequestUiState.value.bloodUnitErrorState.status
    }

    // Initialize selectedState
    var selectedState: MutableState<String?> = mutableStateOf(null)
    var selectedDistrict: MutableState<String?> = mutableStateOf(null)
    var selectedCity: MutableState<String?> = mutableStateOf(null)
    var selectedPinCode: MutableState<String?> = mutableStateOf(null)
    var requestInProgress = mutableStateOf(false)

    fun selectState(state: String) {
        selectedState.value = state
        selectedDistrict.value = null
        selectedCity.value = null
        selectedPinCode.value = null
    }

    fun selectDistrict(district: String) {
        selectedDistrict.value = district
        selectedCity.value = null
        selectedPinCode.value = null
    }

    fun selectCity(city: String) {
        selectedCity.value = city
        selectedPinCode.value = null
    }

    fun selectPin(pinCode: String) {
        selectedPinCode.value = pinCode
    }


}