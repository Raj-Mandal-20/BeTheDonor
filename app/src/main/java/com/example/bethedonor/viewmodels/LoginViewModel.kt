package com.example.bethedonor.viewmodels

import android.app.Application
import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.bethedonor.data.api.RetrofitClient
import com.example.bethedonor.data.dataModels.LogInResponse
import com.example.bethedonor.data.preferences.PreferencesManager
import com.example.bethedonor.data.repository.UserRepositoryImp
import com.example.bethedonor.domain.usecase.LogInUserUseCase
import com.example.bethedonor.ui.utils.uievent.LoginUIEvent
import com.example.bethedonor.ui.utils.uistate.LoginUiState
import com.example.bethedonor.ui.utils.validationRules.Validator
import kotlinx.coroutines.launch

class LoginViewModel(application: Application) : AndroidViewModel(application){

    private val TAG = LoginViewModel::class.simpleName

    //*
    private val preferencesManager = PreferencesManager(getApplication())
    //*
    var loginUIState = mutableStateOf(LoginUiState())
    var requestInProgress = mutableStateOf(false)

    private val _loginResponse = MutableLiveData<Result<LogInResponse>>()
    val loginResponse: LiveData<Result<LogInResponse>> = _loginResponse
    private val apiService = RetrofitClient.instance
    private val userRepository = UserRepositoryImp(apiService)
    private val logInUserUseCase = LogInUserUseCase(userRepository)

    fun logInUser(onLogin: () -> Unit?) {
        requestInProgress.value = true
        val email = loginUIState.value.emailId
        val password = loginUIState.value.password
        viewModelScope.launch {
            try {
                val response = logInUserUseCase.execute(email, password)
                _loginResponse.value = Result.success(response)
                Log.d("Response", response.toString())
                response.token?.let {
                    preferencesManager.jwtToken = it
                    preferencesManager.userId = response.userId
                }
            } catch (e: Exception) {
                _loginResponse.value = Result.failure(e)
                Log.e("Error", e.toString())
            } finally {
                requestInProgress.value = false
                onLogin()
            }
        }
    }

    fun isUserLoggedIn(): Boolean {
        return preferencesManager.jwtToken != null
    }
    fun getUserId(): String {
        return preferencesManager.userId.toString()
    }

    fun getToken(): String {
        return preferencesManager.jwtToken.toString()
    }

    fun onEvent(event: LoginUIEvent) {
        when (event) {
            is LoginUIEvent.EmailValueChangeEvent -> {
                loginUIState.value = loginUIState.value.copy(
                    emailId = event.emailId,
                    emailIdErrorState = Validator.validateEmailId(event.emailId)
                )
            }

            is LoginUIEvent.PasswordValueChangeEvent -> {
                loginUIState.value = loginUIState.value.copy(
                    password = event.password,
                    //passwordErrorState = Validator.validatePassword(event.password)
                )
            }

            LoginUIEvent.RegistrationButtonClick -> {
                printState()
            }
        }
    }

    fun validateWithRulesForLogIn(): Boolean {
        return loginUIState.value.emailIdErrorState.status
               // && loginUIState.value.passwordErrorState.status
    }

    fun printState() {
        Log.d(TAG, "Inside_printState")
        Log.d(TAG, loginUIState.value.toString())
    }


    fun resetUiState() {
        loginUIState.value = LoginUiState()
    }
}