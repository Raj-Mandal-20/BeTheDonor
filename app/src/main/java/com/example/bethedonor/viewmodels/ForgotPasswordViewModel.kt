package com.example.bethedonor.viewmodels

import android.util.Log
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.bethedonor.data.api.RetrofitClient
import com.example.bethedonor.data.dataModels.BackendResponse
import com.example.bethedonor.data.repository.UserRepositoryImp
import com.example.bethedonor.domain.usecase.ForgetPasswordUseCase
import com.example.bethedonor.ui.utils.uievent.ForgotPasswordUiEvent
import com.example.bethedonor.ui.utils.uistate.ForgetPasswordUiState
import com.example.bethedonor.ui.utils.validationRules.Validator
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class ForgotPasswordViewModel : ViewModel() {

    private val TAG = ForgotPasswordViewModel::class.simpleName

    var forgotPasswordUiState = mutableStateOf(ForgetPasswordUiState())
    var requestInProgress = mutableStateOf(false)

    private val _forgetPasswordResponse = MutableStateFlow<Result<BackendResponse>?>(null)
    val forgetPasswordResponse: StateFlow<Result<BackendResponse>?> = _forgetPasswordResponse

    private val apiService = RetrofitClient.instance
    private val userRepository = UserRepositoryImp(apiService)
    private val forgetPasswordUseCase = ForgetPasswordUseCase(userRepository)

    fun onEvent(event: ForgotPasswordUiEvent) {
        when (event) {
            is ForgotPasswordUiEvent.EmailValueChangeEvent -> {
                forgotPasswordUiState.value = forgotPasswordUiState.value.copy(
                    emailId = event.emailId,
                    emailIdErrorState = Validator.validateEmailId(event.emailId)
                )
            }

            is ForgotPasswordUiEvent.DoneClickBtn -> {
                // Trigger the forget password API call
                val email = forgotPasswordUiState.value.emailId
                if (Validator.validateEmailId(email).status) {
                    forgetPassword(email) { response ->
                        // Handle the response here, e.g., show a message or navigate
                        Log.d(TAG, "Forget Password Response: $response")
                    }
                }
            }
        }
    }

    fun forgetPassword(email: String, onResponse: (BackendResponse) -> Unit) {
        requestInProgress.value = true
        viewModelScope.launch {
            try {
                val response = forgetPasswordUseCase.execute(email)
                _forgetPasswordResponse.value = Result.success(response)
                onResponse(response)
                Log.d(TAG, "ForgetPasswordResponse: $response")
            } catch (e: Exception) {
                _forgetPasswordResponse.value = Result.failure(e)
                onResponse(BackendResponse(message = e.message ?: "Unknown error"))
                Log.e(TAG, "Error: ${e.message}")
            } finally {
                requestInProgress.value = false
            }
        }
    }
}
