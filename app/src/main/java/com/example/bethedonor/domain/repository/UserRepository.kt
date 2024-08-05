package com.example.bethedonor.domain.repository

import com.example.bethedonor.data.api.AcceptDonationResponse
import com.example.bethedonor.data.api.AccountResponse
import com.example.bethedonor.data.api.BloodRequestsResponse
import com.example.bethedonor.data.api.EditProfileResponse
import com.example.bethedonor.data.api.IsDonatedResponse
import com.example.bethedonor.data.api.ProfileResponse
import com.example.bethedonor.data.api.UserResponse
import com.example.bethedonor.domain.model.User
import com.example.bethedonor.domain.model.UserUpdate
import okhttp3.ResponseBody
import retrofit2.Response

interface UserRepository {
    suspend fun registerUser(user: User): Response<ResponseBody>
    suspend fun loginUser(email: String, password: String): Response<ResponseBody>
    suspend fun getUserProfile(token: String): Response<ProfileResponse>
    suspend fun getAllBloodRequests(token: String): Response<BloodRequestsResponse>
    suspend fun fetchUserByUserId(token: String, userId: String): Response<UserResponse>
    suspend fun closeAccount(token: String): Response<AccountResponse>
    suspend fun updateProfile(
        sectionId: String,
        token: String,
        userUpdate: UserUpdate
    ): Response<EditProfileResponse>

    suspend fun checkIsDonated(token: String, requestId: String): Response<IsDonatedResponse>
    suspend fun acceptDonation(token: String, request: String): Response<AcceptDonationResponse>
}