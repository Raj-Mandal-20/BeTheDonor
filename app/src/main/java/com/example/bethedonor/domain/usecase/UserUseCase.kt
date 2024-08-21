package com.example.bethedonor.domain.usecase

import android.util.Log
import com.example.bethedonor.data.dataModels.AcceptDonationResponse
import com.example.bethedonor.data.dataModels.AccountResponse
import com.example.bethedonor.data.dataModels.BackendResponse
import com.example.bethedonor.data.dataModels.BloodRequestsResponse
import com.example.bethedonor.data.dataModels.DonorListResponse
import com.example.bethedonor.data.dataModels.HistoryBloodRequestsResponse


import com.example.bethedonor.data.dataModels.LogInResponse
import com.example.bethedonor.data.dataModels.NewBloodRequest

import com.example.bethedonor.data.dataModels.ProfileResponse

import com.example.bethedonor.data.dataModels.User
import com.example.bethedonor.data.dataModels.UserResponse
import com.example.bethedonor.data.dataModels.UserUpdate
import com.example.bethedonor.domain.repository.UserRepository

import com.google.gson.Gson


class RegistrationUserUseCase(private val userRepository: UserRepository) {
    suspend fun execute(user: User): BackendResponse {
        return try {
            // Call the API service
            val response = userRepository.registerUser(user)

            if (response.isSuccessful) {
                // Convert the response body to RegistrationResponse
                val registrationResponse = Gson().fromJson(
                    response.body()?.charStream(), // Use charStream() for Gson
                    BackendResponse::class.java
                )
                registrationResponse
            } else {
                // Handle error response
                val errorBody = response.errorBody()?.string() ?: "{}"
                val errorResponse = Gson().fromJson(errorBody, BackendResponse::class.java)
                BackendResponse(
                    statusCode = response.code().toString(),
                    message = errorResponse.message
                )
            }
        } catch (e: Exception) {
            // Handle exception
            BackendResponse(message = e.message ?: "Unknown error")
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
                response.body()
                    ?: ProfileResponse(message = "Empty response body")
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
                response.body()
                    ?: BloodRequestsResponse(message = "Empty response body")
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
            BloodRequestsResponse(
                message = e.message ?: "Unknown error"

            )
        }
    }
}

class FetchUserDetailsUseCase(private val userRepository: UserRepository) {
    suspend fun execute(token: String, userId: String): UserResponse {
        return try {
            val response = userRepository.fetchUserByUserId(token, userId)
            if (response.isSuccessful) {
                response.body()
                    ?: UserResponse(message = "Empty response body")
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
                response.body()
                    ?: AccountResponse(message = "Empty response body")
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
    ): BackendResponse {
        return try {
            val response = userRepository.updateProfile(sectionId, token, userUpdate)
            if (response.isSuccessful) {
                response.body()
                    ?: BackendResponse(message = "Empty response body")
            } else {
                val errorBody = response.errorBody()?.string() ?: "{}"
                val errorResponse = Gson().fromJson(errorBody, BackendResponse::class.java)
                BackendResponse(
                    statusCode = response.code().toString(),
                    message = errorResponse.message

                )
            }
        } catch (e: Exception) {
            BackendResponse(message = e.message ?: "Unknown error")
        }
    }

}

//class CheckIsDonatedUseCase(private val userRepository: UserRepository) {
//    suspend fun execute(token: String, requestId: String): IsDonatedResponse {
//        return try {
//            val response = userRepository.checkIsDonated(token, requestId)
//            if (response.isSuccessful) {
//                response.body() ?: IsDonatedResponse(isDonated = false, message = "Empty response body")
//            } else {
//                val errorBody = response.errorBody()?.string() ?: "{}"
//                val errorResponse = Gson().fromJson(errorBody, IsDonatedResponse::class.java)
//                errorResponse
//            }
//        } catch (e: Exception) {
//            IsDonatedResponse(
//                isDonated = false,
//                message = e.message ?: "Unknown error"
//            ) // Handle the exception and return a default response
//        }
//    }
//}

class AcceptDonationUseCase(private val userRepository: UserRepository) {
    suspend fun execute(token: String, requestId: String): AcceptDonationResponse {
        return try {
            val response = userRepository.acceptDonation(token, requestId)
            if (response.isSuccessful) {
                response.body()
                    ?: AcceptDonationResponse(message = "Empty response body")
            } else {
                val errorBody = response.errorBody()?.string() ?: "{}"
                val errorResponse = Gson().fromJson(errorBody, AcceptDonationResponse::class.java)
                AcceptDonationResponse(
                    statusCode = response.code().toString(),
                    message = errorResponse.message

                )
            }
        } catch (e: Exception) {
            e.printStackTrace()
            AcceptDonationResponse(
                message = e.message ?: "Unknown error"
            )
        }
    }
}

class CreateRequestUseCase(private val userRepository: UserRepository) {
    suspend fun execute(token: String, request: NewBloodRequest): BackendResponse {
        return try {
            val response = userRepository.createRequest(token, request)
            if (response.isSuccessful) {
                response.body() ?: BackendResponse(
                    message = "Empty response body"
                )
            } else {
                val errorBody = response.errorBody()?.string() ?: "{}"
                val errorResponse = Gson().fromJson(errorBody, BackendResponse::class.java)
                BackendResponse(
                    statusCode = response.code().toString(),
                    message = errorResponse.message

                )
            }
        } catch (e: Exception) {
            BackendResponse(message = e.message ?: "Unknown error")
        }
    }
}

class GetRequestHistoryUseCase(private val userRepository: UserRepository) {
    suspend fun execute(token: String): HistoryBloodRequestsResponse {
        return try {
            val response = userRepository.getRequestHistory(token)
            if (response.isSuccessful) {
                response.body() ?: HistoryBloodRequestsResponse(message = "Empty response body")
            } else {
                val errorBody = response.errorBody()?.string() ?: "{}"
                val errorResponse = Gson().fromJson(errorBody, BloodRequestsResponse::class.java)
                HistoryBloodRequestsResponse(
                    statusCode = response.code().toString(),
                    message = errorResponse.message
                )
            }
        } catch (e: Exception) {
            Log.d("errorFromGetRequestHistory", e.message.toString())
            HistoryBloodRequestsResponse(message = e.message ?: "Unknown error")
        }
    }
}


class GetDonorListUseCase(private val userRepository: UserRepository) {
    suspend fun execute(token: String, requestId: String): DonorListResponse {
        return try {
            val response = userRepository.getDonorList(token, requestId)
            if (response.isSuccessful) {
                response.body() ?: DonorListResponse(message = "Empty response body")
            } else {
                val errorBody = response.errorBody()?.string() ?: "{}"
                val errorResponse = Gson().fromJson(errorBody, DonorListResponse::class.java)
                DonorListResponse(
                    statusCode = response.code().toString(),
                    message = errorResponse.message
                )
            }
        } catch (e: Exception) {
            DonorListResponse(message = e.message ?: "Unknown error")
        }
    }
}

