package com.example.bethedonor.domain.repository


import com.example.bethedonor.data.dataModels.AcceptDonationResponse
import com.example.bethedonor.data.dataModels.AccountResponse
import com.example.bethedonor.data.dataModels.BackendResponse
import com.example.bethedonor.data.dataModels.BloodRequestsResponse
import com.example.bethedonor.data.dataModels.DonorListResponse
import com.example.bethedonor.data.dataModels.HistoryBloodRequestsResponse
import com.example.bethedonor.data.dataModels.IsDonatedResponse
import com.example.bethedonor.data.dataModels.NewBloodRequest
import com.example.bethedonor.data.dataModels.ProfileResponse
import com.example.bethedonor.data.dataModels.User
import com.example.bethedonor.data.dataModels.UserResponse
import com.example.bethedonor.data.dataModels.UserUpdate
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
    ): Response<BackendResponse>

    suspend fun checkIsDonated(token: String, requestId: String): Response<IsDonatedResponse>
    suspend fun acceptDonation(token: String, request: String): Response<AcceptDonationResponse>
    suspend fun createRequest(token: String, request:NewBloodRequest):Response<BackendResponse>
    suspend fun getRequestHistory(token: String): Response<HistoryBloodRequestsResponse>
    suspend fun getDonorList(token: String, requestId: String): Response<DonorListResponse>
}