package com.example.bethedonor.viewmodels

import android.util.Log
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.bethedonor.data.api.RetrofitClient
import com.example.bethedonor.data.dataModels.BackendResponse
import com.example.bethedonor.data.dataModels.NewBloodRequest
import com.example.bethedonor.data.repository.UserRepositoryImp
import com.example.bethedonor.domain.usecase.CreateRequestUseCase
import com.example.bethedonor.domain.usecase.RegistrationUserUseCase
import com.example.bethedonor.ui.utils.uievent.RegistrationUIEvent
import com.example.bethedonor.ui.utils.uistate.RegistrationUiState
import com.example.bethedonor.ui.utils.validationRules.Validator
import com.example.bethedonor.utils.toDate
import kotlinx.coroutines.launch

class CreateRequestViewModel : ViewModel() {


    var newRequestUiState = mutableStateOf(RegistrationUiState())

    //***create-request-bottom-sheet ***//
    fun onEvent(event: RegistrationUIEvent) {
        when (event) {
            is RegistrationUIEvent.StateValueChangeEvent -> {
                newRequestUiState.value = newRequestUiState.value.copy(
                    state = event.state,
                    stateErrorState = Validator.validateString(event.state)
                )
            }

            is RegistrationUIEvent.DistrictValueChangeEvent -> {
                newRequestUiState.value = newRequestUiState.value.copy(
                    district = event.district,
                    districtErrorState = Validator.validateString(event.district)
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
                    bloodUnitErrorState = Validator.validateBloodUnit(event.unit)
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
            RegistrationUIEvent.RegistrationButtonClick -> {
//
            }
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
        Log.d("Validation", "Donation Center Status: ${newRequestUiState.value.donationCenterErrorState.status}")
        Log.d("Validation", "State Status: ${newRequestUiState.value.stateErrorState.status}")
        Log.d("Validation", "District Status: ${newRequestUiState.value.districtErrorState.status}")
        Log.d("Validation", "City Status: ${newRequestUiState.value.cityErrorState.status}")
        Log.d("Validation", "Pin Code Status: ${newRequestUiState.value.pinCodeErrorState.status}")
        Log.d("Validation", "Blood Group Status: ${newRequestUiState.value.bloodGroupErrorState.status}")
        Log.d("Validation", "Blood Unit Status: ${newRequestUiState.value.bloodUnitErrorState.status}")
        Log.d("Validation", "Deadline Status: ${newRequestUiState.value.deadLineErrorState.status}")

        return newRequestUiState.value.donationCenterErrorState.status
                && newRequestUiState.value.stateErrorState.status
                && newRequestUiState.value.districtErrorState.status
                && newRequestUiState.value.cityErrorState.status
                && newRequestUiState.value.pinCodeErrorState.status
                && newRequestUiState.value.bloodGroupErrorState.status
                && newRequestUiState.value.bloodUnitErrorState.status
                && newRequestUiState.value.deadLineErrorState.status
    }


    private val apiService = RetrofitClient.instance
    private val userRepository = UserRepositoryImp(apiService)
    private val createNewBloodRequestUseCase = CreateRequestUseCase(userRepository)
    fun createNewBloodRequest(token: String, onCreated: (BackendResponse) -> Unit) {
        requestInProgress.value = true
        val bloodRequest = NewBloodRequest(
            donationCenter = newRequestUiState.value.donationCenter,
            state = newRequestUiState.value.state,
            district = newRequestUiState.value.district,
            city = newRequestUiState.value.city,
            pin = newRequestUiState.value.pinCode,
            bloodGroup = newRequestUiState.value.bloodGroup,
            bloodUnit = newRequestUiState.value.bloodUnit,
            deadline = newRequestUiState.value.date.toDate()!!
        )
        viewModelScope.launch {
            try {
                val response = createNewBloodRequestUseCase.execute(token, bloodRequest)
                val result = Result.success(response)
                Log.d("Response", response.toString())
                onCreated(response)
            } catch (e: Exception) {
                e.printStackTrace()
                onCreated(BackendResponse(message = "Exception: ${e.message}"))
            } finally {
                requestInProgress.value = false
            }
        }
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
    fun selectPin(pinCode: String) {
        selectedPinCode.value = pinCode
        selectedCity.value=null
    }
    fun selectCity(city: String) {
        selectedCity.value = city
    }
}