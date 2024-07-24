package com.example.bethedonor.viewmodels

import android.app.Application
import android.util.Log
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.bethedonor.data.api.ProfileResponse
import com.example.bethedonor.data.api.RegistrationResponse
import com.example.bethedonor.data.api.RetrofitClient
import com.example.bethedonor.data.preferences.PreferencesManager
import com.example.bethedonor.data.repository.UserRepositoryImp
import com.example.bethedonor.domain.usecase.GetUserProfileUseCase
import kotlinx.coroutines.launch

class ProfileViewModel(application: Application) : AndroidViewModel(application) {

    private val preferencesManager = PreferencesManager(getApplication())
    private val _profileResponse = MutableLiveData<Result<ProfileResponse>>()
    val profileResponse: LiveData<Result<ProfileResponse>> = _profileResponse

    private val apiService = RetrofitClient.instance
    private val userRepository = UserRepositoryImp(apiService)
    private val getUserProfileUserUseCase = GetUserProfileUseCase(userRepository)

    var requestInProgress = mutableStateOf(false)

    fun getProfile(token: String, onProfileFetched: () -> Unit) {
        requestInProgress.value = true
        viewModelScope.launch {
            try {
                Log.d("token", token)
                val response = getUserProfileUserUseCase.execute(token)
                _profileResponse.value = Result.success(response)
                Log.d("Response", response.toString())
            } catch (e: Exception) {
                e.printStackTrace()
                _profileResponse.value = Result.failure(e)
            } finally {
                requestInProgress.value = false
                onProfileFetched()
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