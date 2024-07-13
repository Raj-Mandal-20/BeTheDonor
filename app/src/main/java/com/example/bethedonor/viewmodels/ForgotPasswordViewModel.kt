package com.example.bethedonor.viewmodels

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.example.bethedonor.data.uievent.ForgotPasswordUiEvent
import com.example.bethedonor.data.uistate.ForgetPasswordUiState
import com.example.bethedonor.data.validationRules.Validator

class ForgotPasswordViewModel() : ViewModel() {
    private val TAG = ForgotPasswordViewModel::class.simpleName

    var `forgot-passwordUiState` = mutableStateOf(ForgetPasswordUiState())
    var requestInProgress = mutableStateOf(false)
    fun onEvent(event: ForgotPasswordUiEvent) {
        when (event) {
            is ForgotPasswordUiEvent.EmailValueChangeEvent -> {
                `forgot-passwordUiState`.value = `forgot-passwordUiState`.value.copy(
                    emailId = event.emailId,
                    emailIdErrorState = Validator.validateEmailId(event.emailId)
                )
            }
            is ForgotPasswordUiEvent.DoneClickBtn -> {
             //
            }
        }
    }
    fun resetPassWord(email: String, onProcessResult: (status: Boolean, message: String) -> Unit) {
        requestInProgress.value = true
       // val auth = FirebaseAuth.getInstance()
//        auth.sendPasswordResetEmail(email)
//            .addOnCompleteListener { task ->
//                if (task.isSuccessful) {
//                    onProcessResult(true, "Check $email to reset the password")
//                } else {
//                    onProcessResult(true, "${task.exception?.message}")
//                }
//                if (task.isComplete)
//                    requestInProgress.value = false
//
//            }
    }
}