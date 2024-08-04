package com.example.bethedonor.domain.usecase

import android.util.Log
import com.example.bethedonor.data.api.AccountResponse
import com.example.bethedonor.data.api.BloodRequestsResponse
import com.example.bethedonor.data.api.EditProfileResponse
import com.example.bethedonor.data.api.IsDonatedResponse
import com.example.bethedonor.data.api.LogInResponse
import com.example.bethedonor.data.api.ProfileResponse
import com.example.bethedonor.data.api.RegistrationResponse
import com.example.bethedonor.data.api.UserResponse
import com.example.bethedonor.domain.model.User
import com.example.bethedonor.domain.model.UserUpdate
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

class GetAllBloodRequestsUseCase(private val userRepository: UserRepository) {
    suspend fun execute(token: String): BloodRequestsResponse {
        return try {
            val response = userRepository.getAllBloodRequests(token)
            Log.d("responseBloodReq", response.toString())
            if (response.isSuccessful) {
                //   Log.d("responseBloodReqBody", response.body().toString())
                response.body() ?: BloodRequestsResponse(message = "Empty response body")
            } else {
                val errorBody = response.errorBody()?.string() ?: "{}"
                val errorResponse = Gson().fromJson(errorBody, BloodRequestsResponse::class.java)
                BloodRequestsResponse(
                    statusCode = response.code().toString(),
                    message = errorResponse.message
                )
            }
        } catch (e: Exception) {
            Log.d("errorFromGetAllBloodRequests", e.message.toString())
            BloodRequestsResponse(message = e.message ?: "Unknown error")
        }
    }
}

class FetchUserDetailsUseCase(private val userRepository: UserRepository) {
    suspend fun execute(token: String, userId: String): UserResponse {
        return try {
            val response = userRepository.fetchUserByUserId(token, userId)
            if (response.isSuccessful) {
                response.body() ?: UserResponse(message = "Empty response body")
            } else {
                val errorBody = response.errorBody()?.string() ?: "{}"
                val errorResponse = Gson().fromJson(errorBody, UserResponse::class.java)
                UserResponse(
                    statusCode = response.code().toString(),
                    message = errorResponse.message
                )
            }
        } catch (e: Exception) {
            Log.d("errorFromFetchUserDetails", e.message.toString())
            UserResponse(message = e.message ?: "Unknown error")
        }
    }
}

class CloseAccountUseCase(private val userRepository: UserRepository) {
    suspend fun execute(token: String): AccountResponse {
        return try {
            val response = userRepository.closeAccount(token)
            if (response.isSuccessful) {
                response.body() ?: AccountResponse(message = "Empty response body")
            } else {
                val errorBody = response.errorBody()?.string() ?: "{}"
                val errorResponse = Gson().fromJson(errorBody, AccountResponse::class.java)
                AccountResponse(
                    statusCode = response.code().toString(),
                    message = errorResponse.message
                )
            }
        } catch (e: Exception) {
            AccountResponse(message = e.message ?: "Unknown error")
        }
    }
}

class UpdateProfileUseCase(private val userRepository: UserRepository) {
    suspend fun execute(
        sectionId: String,
        token: String,
        userUpdate: UserUpdate
    ): EditProfileResponse {
        return try {
            val response = userRepository.updateProfile(sectionId, token, userUpdate)
            if (response.isSuccessful) {
                response.body() ?: EditProfileResponse(message = "Empty response body")
            } else {
                val errorBody = response.errorBody()?.string() ?: "{}"
                val errorResponse = Gson().fromJson(errorBody, EditProfileResponse::class.java)
                EditProfileResponse(
                    statusCode = response.code().toString(),
                    message = errorResponse.message
                )
            }
        } catch (e: Exception) {
            EditProfileResponse(message = e.message ?: "Unknown error")
        }
    }

}

class CheckIsDonatedUseCase(private val userRepository: UserRepository) {
    suspend fun execute(token: String, requestId: String): IsDonatedResponse {
        return try {
            val response = userRepository.checkIsDonated(token, requestId)
            if (response.isSuccessful) {
                response.body() ?: IsDonatedResponse(isDonated = false)
            } else {
                val errorBody = response.errorBody()?.string() ?: "{}"
                val errorResponse = Gson().fromJson(errorBody, IsDonatedResponse::class.java)
                errorResponse
            }
        } catch (e: Exception) {
            IsDonatedResponse(
                isDonated = false,
                message = e.message ?: "Unknown error"
            ) // Handle the exception and return a default response
        }
    }
}
