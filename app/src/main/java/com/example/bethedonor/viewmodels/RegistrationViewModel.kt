package com.example.bethedonor.viewmodels

import android.util.Log
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.bethedonor.data.api.RegistrationResponse
import com.example.bethedonor.data.api.RetrofitClient
import com.example.bethedonor.data.repository.UserRepositoryImp
import com.example.bethedonor.domain.model.User
import com.example.bethedonor.domain.usecase.RegistrationUserUseCase
import com.example.bethedonor.ui.utils.uievent.RegistrationUIEvent
import com.example.bethedonor.ui.utils.uistate.RegistrationUiState
import com.example.bethedonor.ui.utils.validationRules.Validator
import com.example.bethedonor.utils.AreaData
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat


class RegistrationViewModel() : ViewModel() {
    private val TAG = RegistrationViewModel::class.simpleName

    private val areaData: MutableState<AreaData?> = mutableStateOf(null)

    var registrationUIState = mutableStateOf(RegistrationUiState())

    //*** api_service and registration use case ***
    private val _registrationResponse = MutableLiveData<Result<RegistrationResponse>>()
    val registrationResponse: LiveData<Result<RegistrationResponse>> = _registrationResponse
    private val apiService = RetrofitClient.instance
    private val userRepository = UserRepositoryImp(apiService)
    private val registrationUserUseCase = RegistrationUserUseCase(userRepository)

    fun registerUser(onRegister: () -> Unit?) {
        requestInProgress.value=true
        val dob = SimpleDateFormat("dd/MM/yyyy").parse(registrationUIState.value.age)!!
        val user = User(
            registrationUIState.value.name,
            registrationUIState.value.emailId,
            registrationUIState.value.phoneNo,
            dob,
            registrationUIState.value.gender,
            registrationUIState.value.bloodGroup,
            registrationUIState.value.state,
            registrationUIState.value.district,
            registrationUIState.value.city,
            registrationUIState.value.pinCode,
            registrationUIState.value.password,
            registrationUIState.value.checkedAvailabilityStatus
        )
        viewModelScope.launch {
            try {
                //val response = userRepository.registerUser(user)

                val response = registrationUserUseCase.execute(user)
                _registrationResponse.value = Result.success(response)
                Log.d("Response", response.toString())
            } catch (e: Exception) {
                 e.stackTrace
                _registrationResponse.value = Result.failure(e)
            }
            finally {
                requestInProgress.value=false
                onRegister()
            }
        }
    }

    // Initialize selectedState
    var selectedState: MutableState<String?> = mutableStateOf(null)
    var selectedDistrict: MutableState<String?> = mutableStateOf(null)
    var selectedCity: MutableState<String?> = mutableStateOf(null)
    var selectedPinCode: MutableState<String?> = mutableStateOf(null)
    var availableToDonate: MutableState<Boolean> = mutableStateOf(true)
    var requestInProgress = mutableStateOf(false)

    fun setAreaData(data: AreaData?) {
        areaData.value = data
    }

    fun getStateDataList(): List<String> {
        return areaData.value?.states?.keys?.toList() ?: emptyList()
    }

    fun getDistrictList(): List<String> {
        return selectedState.value?.let { areaData.value?.states?.get(it)?.keys?.toList() }
            ?: emptyList()
    }

    fun getCityList(): List<String> {
        return selectedDistrict.value?.let {
            areaData.value?.states?.get(selectedState.value)?.get(it)?.keys?.toList()
        } ?: emptyList()
    }

    fun getPinCodeList(): List<String> {
        return selectedCity.value?.let {
            areaData.value?.states?.get(selectedState.value)?.get(selectedDistrict.value)
                ?.get(it)
        }?.let { listOf(it) } ?: emptyList()
    }

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

    fun setAvailableToDonate(value: Boolean) {
        availableToDonate.value = value
    }

    fun onEvent(event: RegistrationUIEvent) {
        when (event) {
            is RegistrationUIEvent.NameValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    name = event.name,
                    nameErrorState = Validator.validateFirstName(event.name)
                )
            }

            is RegistrationUIEvent.EmailValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    emailId = event.emailId,
                    emailIdErrorState = Validator.validateEmailId(event.emailId)
                )
            }

            is RegistrationUIEvent.PhoneNoChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    phoneNo = event.phoneNo,
                    phoneNoErrorState = Validator.validatePhoneNo(event.phoneNo)
                )
            }

            is RegistrationUIEvent.PasswordValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    password = event.password,
                    passwordErrorState = Validator.validatePassword(event.password)
                )
            }

            is RegistrationUIEvent.ConfirmPasswordValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    confirmPassword = event.confirmPassword,
                    confirmPasswordState = Validator.validateConfirmPassword(
                        registrationUIState.value.password,
                        event.confirmPassword
                    )
                )
            }

            is RegistrationUIEvent.AgeValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    age = event.age,
                    ageErrorState = Validator.validateAge(event.age)
                )
            }

            is RegistrationUIEvent.BloodGroupValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    bloodGroup = event.bloodGroup,
                    bloodGroupErrorState = Validator.validateBloodGroup(event.bloodGroup)
                )
            }

            is RegistrationUIEvent.DistrictValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    district = event.district,
                    cityErrorState = Validator.validateDistrict(event.district)
                )
            }

            is RegistrationUIEvent.CityValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    city = event.city,
                    cityErrorState = Validator.validateCity(event.city)
                )
            }

            is RegistrationUIEvent.GenderValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    gender = event.gender,
                    genderErrorState = Validator.validateGender(event.gender)
                )
            }

            is RegistrationUIEvent.PinCodeValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    pinCode = event.pinCode,
                    pinCodeErrorState = Validator.validatePinCode(event.pinCode)
                )
            }

            is RegistrationUIEvent.StateValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    state = event.state,
                    stateErrorState = Validator.validateState(event.state)
                )
            }

            is RegistrationUIEvent.AvailabilityCheckerValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    checkedAvailabilityStatus = event.status
                )
            }

            RegistrationUIEvent.RegistrationButtonClick -> {
                printState()
            }

        }
    }


    fun validateWithRulesForRegister(): Boolean {
      //  if (availableToDonate.value)
            return registrationUIState.value.nameErrorState.status
                    && registrationUIState.value.emailIdErrorState.status
                    && registrationUIState.value.phoneNoErrorState.status
                    && registrationUIState.value.ageErrorState.status
                    && registrationUIState.value.genderErrorState.status
                    && registrationUIState.value.bloodGroupErrorState.status
                    && registrationUIState.value.stateErrorState.status
                    && registrationUIState.value.cityErrorState.status
                    && registrationUIState.value.pinCodeErrorState.status
                    && registrationUIState.value.passwordErrorState.status
                    && registrationUIState.value.confirmPasswordState.status

//        return registrationUIState.value.nameErrorState.status
//                && registrationUIState.value.emailIdErrorState.status
//                && registrationUIState.value.phoneNoErrorState.status
//                && registrationUIState.value.passwordErrorState.status
    }


    fun printState() {
        Log.d(TAG, "Inside_printState")
        Log.d(TAG, registrationUIState.value.toString())
    }


    fun resetUiState() {
        registrationUIState.value = RegistrationUiState()
    }
}
