package com.example.bethedonor.viewmodels

import android.media.session.MediaSession.Token
import android.util.Log
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.bethedonor.data.api.RetrofitClient
import com.example.bethedonor.data.dataModels.BackendOTPResponse
import com.example.bethedonor.data.dataModels.BackendResponse
import com.example.bethedonor.data.dataModels.ChangeEmailRequest
import com.example.bethedonor.data.dataModels.VerifyOTPRequest
import com.example.bethedonor.data.repository.UserRepositoryImp
import com.example.bethedonor.domain.usecase.ChangeEmailIDUseCase
import com.example.bethedonor.domain.usecase.VerifyOTPUseCase
import com.example.bethedonor.ui.utils.uievent.RegistrationUIEvent
import com.example.bethedonor.ui.utils.uistate.RegistrationUiState
import com.example.bethedonor.ui.utils.validationRules.Validator
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class EditEmailViewModel : ViewModel() {

    val editEmailUiState = mutableStateOf(RegistrationUiState())

    fun onEvent(event: RegistrationUIEvent) {
        when (event) {
            is RegistrationUIEvent.EmailValueChangeEvent -> {
                editEmailUiState.value = editEmailUiState.value.copy(
                    emailId = event.emailId,
                    emailIdErrorState = Validator.validateEmailId(event.emailId)
                )
            }

            is RegistrationUIEvent.AvailabilityCheckerValueChangeEvent -> {}
            is RegistrationUIEvent.BloodGroupValueChangeEvent -> {}
            is RegistrationUIEvent.BloodUnitValueChangeEvent -> {}
            is RegistrationUIEvent.CityValueChangeEvent -> {}
            is RegistrationUIEvent.ConfirmPasswordValueChangeEvent -> {}
            is RegistrationUIEvent.DateValueChangeEvent -> {}
            is RegistrationUIEvent.DistrictValueChangeEvent -> {}
            is RegistrationUIEvent.DonationCenterValueChangeEvent -> {}
            is RegistrationUIEvent.GenderValueChangeEvent -> {}
            is RegistrationUIEvent.NameValueChangeEvent -> {}
            is RegistrationUIEvent.PasswordValueChangeEvent -> {}
            is RegistrationUIEvent.PhoneNoChangeEvent -> {}
            is RegistrationUIEvent.PinCodeValueChangeEvent -> {}
            RegistrationUIEvent.RegistrationButtonClick -> {}
            is RegistrationUIEvent.StateValueChangeEvent -> {}
        }
    }

    private val _otpDialog = MutableStateFlow(false)
    val otpDialog: StateFlow<Boolean> get() = _otpDialog
    fun setOTPDialog(value: Boolean) {
        _otpDialog.value = value
    }

    //Api connect and get response by request
    private val apiService = RetrofitClient.instance
    private val userRepository = UserRepositoryImp(apiService)
    private val changeEmailUseCase = ChangeEmailIDUseCase(userRepository)
    private val verifyOTPUseCase = VerifyOTPUseCase(userRepository)
    var requestInProgress = mutableStateOf(false)
    private val otpId = mutableStateOf("")

    fun changeEmailId(token: String, userId: String, onResponse: (BackendOTPResponse) -> Unit) {
        requestInProgress.value = true
        viewModelScope.launch {
            try {
                Log.d("token", token)
                val response = changeEmailUseCase.execute(
                    token,
                    ChangeEmailRequest(emailId = editEmailUiState.value.emailId, /*userId = userId*/)
                )
                val result = Result.success(response)
                if (result.isSuccess) {
                    otpId.value = result.getOrNull()?.otpId.toString()
                    Log.d("otpId", otpId.value)
                }
                onResponse(response)
                Log.d("Response", response.toString())
            } catch (e: Exception) {
                e.printStackTrace()
                onResponse(BackendOTPResponse(message = e.message.toString()))
            } finally {
                requestInProgress.value = false
            }
        }
    }

    fun verifyOTP(token: String, otp: String, onResponse: (BackendResponse) -> Unit) {
        requestInProgress.value = true
        viewModelScope.launch {
            try {
                val response = verifyOTPUseCase.execute(
                    token,
                    VerifyOTPRequest(otp = otp, otpId = otpId.value)
                )
                Log.d("Response", response.toString())
                onResponse(response)
            } catch (e: Exception) {
                e.printStackTrace()
                onResponse(BackendResponse(message = e.message.toString()))
            } finally {
                resetTheUiState()
                requestInProgress.value = false
            }
        }
    }

    private fun resetTheUiState() {
       editEmailUiState.value=RegistrationUiState()
    }
}