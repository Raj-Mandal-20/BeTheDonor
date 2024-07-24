package com.example.bethedonor.domain.usecase

import android.util.Log
import com.example.bethedonor.data.api.LogInRequest
import com.example.bethedonor.data.api.LogInResponse
import com.example.bethedonor.data.api.ProfileResponse
import com.example.bethedonor.data.api.RegistrationResponse
import com.example.bethedonor.domain.model.User
import com.example.bethedonor.domain.repository.UserRepository

import com.google.gson.Gson

class RegistrationUserUseCase(private val userRepository: UserRepository) {
    suspend fun execute(user: User): RegistrationResponse {
        return try {
            // Call the API service
            val response = userRepository.registerUser(user)

            if (response.isSuccessful) {
                // Convert the response body to RegistrationResponse
                val registrationResponse = Gson().fromJson(
                    response.body()?.charStream(), // Use charStream() for Gson
                    RegistrationResponse::class.java
                )
                registrationResponse
            } else {
                // Handle error response
                val errorBody = response.errorBody()?.string() ?: "{}"
                val errorResponse = Gson().fromJson(errorBody, RegistrationResponse::class.java)
                RegistrationResponse(
                    statusCode = response.code().toString(),
                    message = errorResponse.message
                )
            }
        } catch (e: Exception) {
            // Handle exception
            RegistrationResponse(message = e.message ?: "Unknown error")
        }
    }
}

class LogInUserUseCase(private val userRepository: UserRepository) {
    suspend fun execute(email: String, password: String): LogInResponse {
        return try {
            // Call the API service
            val response = userRepository.loginUser(email, password)

            if (response.isSuccessful) {
                // Convert the response body to LogInResponse
                val loginResponse = Gson().fromJson(
                    response.body()?.charStream(), // Use charStream() for Gson
                    LogInResponse::class.java
                )
                loginResponse
            } else {
                // Handle error response
                val errorBody = response.errorBody()?.string() ?: "{}"
                val errorResponse = Gson().fromJson(errorBody, LogInResponse::class.java)
                LogInResponse(
                    statusCode = response.code().toString(),
                    message = errorResponse.message
                )
            }
        } catch (e: Exception) {
            // Handle exception
            LogInResponse(message = e.message ?: "Unknown error")
        }
    }
}
class GetUserProfileUseCase(private val userRepository: UserRepository) {
    suspend fun execute(token: String): ProfileResponse {
        return try {
            val response = userRepository.getUserProfile(token)
            Log.d("responseProfile", response.toString())
            if (response.isSuccessful) {
                response.body() ?: ProfileResponse(message = "Empty response body")
            } else {
                val errorBody = response.errorBody()?.string() ?: "{}"
                val errorResponse = Gson().fromJson(errorBody, ProfileResponse::class.java)
                ProfileResponse(
                    statusCode = response.code().toString(),
                    message = errorResponse.message
                )
            }
        } catch (e: Exception) {
            ProfileResponse(message = e.message ?: "Unknown error")
        }
    }
}
