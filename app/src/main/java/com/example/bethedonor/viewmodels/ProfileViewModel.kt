package com.example.bethedonor.viewmodels

import android.app.Application
import android.util.Log
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.example.bethedonor.data.api.RetrofitClient
import com.example.bethedonor.data.dataModels.AccountResponse
import com.example.bethedonor.data.dataModels.ProfileResponse
import com.example.bethedonor.data.preferences.PreferencesManager
import com.example.bethedonor.data.repository.UserRepositoryImp
import com.example.bethedonor.data.dataModels.UserUpdate
import com.example.bethedonor.domain.usecase.CloseAccountUseCase
import com.example.bethedonor.domain.usecase.GetUserProfileUseCase
import com.example.bethedonor.domain.usecase.UpdateProfileUseCase
import com.example.bethedonor.ui.utils.uievent.RegistrationUIEvent
import com.example.bethedonor.ui.utils.uistate.RegistrationUiState
import com.example.bethedonor.ui.utils.validationRules.Validator
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class ProfileViewModel(application: Application) : AndroidViewModel(application) {

    var updateProfileUiState = mutableStateOf(RegistrationUiState())

    //***update-profile-bottom-sheet ***//
    fun onEvent(event: RegistrationUIEvent) {
        when (event) {

            is RegistrationUIEvent.PhoneNoChangeEvent -> {
                updateProfileUiState.value = updateProfileUiState.value.copy(
                    phoneNo = event.phoneNo,
                    phoneNoErrorState = Validator.validatePhoneNo(event.phoneNo)
                )
            }

            is RegistrationUIEvent.DistrictValueChangeEvent -> {
                updateProfileUiState.value = updateProfileUiState.value.copy(
                    district = event.district,
                    districtErrorState = Validator.validateString(event.district)
                )
            }

            is RegistrationUIEvent.CityValueChangeEvent -> {
                updateProfileUiState.value = updateProfileUiState.value.copy(
                    city = event.city,
                    cityErrorState = Validator.validateString(event.city)
                )
            }

            is RegistrationUIEvent.GenderValueChangeEvent -> {
                updateProfileUiState.value = updateProfileUiState.value.copy(
                    gender = event.gender,
                    genderErrorState = Validator.validateString(event.gender)
                )
            }

            is RegistrationUIEvent.PinCodeValueChangeEvent -> {
                updateProfileUiState.value = updateProfileUiState.value.copy(
                    pinCode = event.pinCode,
                    pinCodeErrorState = Validator.validatePinCode(event.pinCode)
                )
            }

            is RegistrationUIEvent.StateValueChangeEvent -> {
                updateProfileUiState.value = updateProfileUiState.value.copy(
                    state = event.state,
                    stateErrorState = Validator.validateString(event.state)
                )
            }

            is RegistrationUIEvent.AvailabilityCheckerValueChangeEvent -> {
                updateProfileUiState.value = updateProfileUiState.value.copy(
                    checkedAvailabilityStatus = event.status
                )
            }

            is RegistrationUIEvent.PasswordValueChangeEvent -> {}
            is RegistrationUIEvent.ConfirmPasswordValueChangeEvent -> {}
            is RegistrationUIEvent.DateValueChangeEvent -> {}
            is RegistrationUIEvent.BloodGroupValueChangeEvent -> {}
            is RegistrationUIEvent.NameValueChangeEvent -> {}
            is RegistrationUIEvent.EmailValueChangeEvent -> {}
            RegistrationUIEvent.RegistrationButtonClick -> {
                //  printState()
            }
            is RegistrationUIEvent.BloodUnitValueChangeEvent -> {}
            is RegistrationUIEvent.DonationCenterValueChangeEvent -> {}
        }
    }

    fun validateWithRulesForUpdate(): Boolean {
        //  printState()
        Log.d("updateProfileUiState", updateProfileUiState.value.genderErrorState.toString())
        Log.d("updateProfileUiState", updateProfileUiState.value.stateErrorState.toString())
        Log.d("updateProfileUiState", updateProfileUiState.value.districtErrorState.toString())
        Log.d("updateProfileUiState", updateProfileUiState.value.cityErrorState.toString())
        Log.d("updateProfileUiState", updateProfileUiState.value.pinCodeErrorState.toString())
        //  if (availableToDonate.value)
        return updateProfileUiState.value.genderErrorState.status
                && updateProfileUiState.value.stateErrorState.status
                && updateProfileUiState.value.districtErrorState.status
                && updateProfileUiState.value.cityErrorState.status
                && updateProfileUiState.value.pinCodeErrorState.status
    }

    var selectedState: MutableState<String?> = mutableStateOf(null)
    var selectedDistrict: MutableState<String?> = mutableStateOf(null)
    var selectedCity: MutableState<String?> = mutableStateOf(null)
    var selectedPinCode: MutableState<String?> = mutableStateOf(null)
    var availableToDonate: MutableState<Boolean> = mutableStateOf(true)

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

    private val _recomposeTime = MutableStateFlow(-1L)
    val recomposeTime: StateFlow<Long> = _recomposeTime

    fun updateRecomposeTime() {
        _recomposeTime.value += 1
    }

    fun shouldFetch(): Boolean {
        return (_recomposeTime.value % 3).toInt() == 0
    }

    private val preferencesManager = PreferencesManager(getApplication())

    //*** api-responses ***//
    private val _profileResponse = MutableLiveData<Result<ProfileResponse>>()
    val profileResponse: LiveData<Result<ProfileResponse>> = _profileResponse
    private val _deleteAccountResponse = MutableStateFlow<Result<AccountResponse>?>(null)
    val deleteAccountResponse: StateFlow<Result<AccountResponse>?> = _deleteAccountResponse

    //*** api_service  use case ***
    private val apiService = RetrofitClient.instance
    private val userRepository = UserRepositoryImp(apiService)
    private val getUserProfileUserUseCase = GetUserProfileUseCase(userRepository)
    private val closeAccountUseCase = CloseAccountUseCase(userRepository)
    private val updateProfileUseCase = UpdateProfileUseCase(userRepository)
    var requestInProgress = mutableStateOf(false)

    fun getProfile(token: String, onProfileFetched: () -> Unit) {
        requestInProgress.value = true
        viewModelScope.launch {
            try {
                Log.d("token", token)
                val response = getUserProfileUserUseCase.execute(token)
                val result = Result.success(response)
                _profileResponse.value = result
                Log.d("Response", response.toString())
            } catch (e: Exception) {
                e.printStackTrace()
                val result = Result.failure<ProfileResponse>(e)
                _profileResponse.value = result
            } finally {
                requestInProgress.value = false
                onProfileFetched()
            }
        }
    }

    fun updateProfile(token: String, onUpdate: (Pair<String,String>) -> Unit) {

        val updates = UserUpdate(
           // phoneNumber = updateProfileUiState.value.phoneNo,
            gender = updateProfileUiState.value.gender,
            state = updateProfileUiState.value.state,
            city = updateProfileUiState.value.city,
            district = updateProfileUiState.value.district,
            pin = updateProfileUiState.value.pinCode,
            available = updateProfileUiState.value.checkedAvailabilityStatus
        )
        requestInProgress.value = true
        viewModelScope.launch {
            try {
                val response = updateProfileUseCase.execute("0", token, updates)
                val result = Result.success(response)
              //  _profileResponse.value = result
                Log.d("Response", response.toString())
                onUpdate(Pair("success",result.getOrNull()?.message.toString()))
            } catch (e: Exception) {
                val result = Result.failure<String>(e)
                Log.d("Error", e.message.toString())
                onUpdate(Pair("failure",result.exceptionOrNull()?.message.toString()))
            }
            finally {
                requestInProgress.value=false
            }
        }
    }


    fun deleteAccount(token: String, onDeletePerformed: (Result<AccountResponse>) -> Unit) {
        requestInProgress.value = true
        viewModelScope.launch {
            try {
                val response = closeAccountUseCase.execute(token)
                _deleteAccountResponse.value = Result.success(response)
                Log.d("Response", response.toString())
                onDeletePerformed(Result.success(response))
            } catch (e: Exception) {
                _deleteAccountResponse.value = Result.failure(e)
                Log.d("Error", e.message.toString())
                onDeletePerformed(Result.failure(e))
            } finally {
                requestInProgress.value = false
            }
        }
    }


    suspend fun logoutUser(onLogout: () -> Unit) {
        preferencesManager.clearUserData()
        // Confirm the data has been cleared
        if (preferencesManager.jwtToken.isNullOrEmpty() && preferencesManager.userId.isNullOrEmpty()) {
            onLogout()
        } else {
            Log.e("Logout Error", "Failed to clear user data")
        }
    }

}
