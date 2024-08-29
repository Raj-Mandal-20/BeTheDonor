package com.example.bethedonor.data.api

import com.example.bethedonor.data.dataModels.RequestID
import com.example.bethedonor.data.dataModels.AcceptDonationResponse
import com.example.bethedonor.data.dataModels.AccountResponse
import com.example.bethedonor.data.dataModels.BackendResponse
import com.example.bethedonor.data.dataModels.BloodRequestsResponse
import com.example.bethedonor.data.dataModels.DonorListResponse
import com.example.bethedonor.data.dataModels.HistoryBloodRequestsResponse
import com.example.bethedonor.data.dataModels.IsDonatedResponse
import com.example.bethedonor.data.dataModels.LogInRequest
import com.example.bethedonor.data.dataModels.NewBloodRequest
import com.example.bethedonor.data.dataModels.ProfileResponse
import com.example.bethedonor.data.dataModels.RegistrationRequest
import com.example.bethedonor.data.dataModels.UpdateProfileRequest
import com.example.bethedonor.data.dataModels.UserIdRequest
import com.example.bethedonor.data.dataModels.UserResponse
import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query

interface ApiService {
    @POST("auth/signup")
    suspend fun register(@Body request: RegistrationRequest): Response<ResponseBody>

    @POST("auth/signin")
    suspend fun login(@Body request: LogInRequest): Response<ResponseBody>

    @GET("v1/my-profile")
    suspend fun getProfile(@Header("Authorization") token: String): Response<ProfileResponse>

    @GET("v1/all-blood-request")
    suspend fun getAllBloodRequests(@Header("Authorization") token: String): Response<BloodRequestsResponse>

    @POST("v1/fetchUserByUserId")
    suspend fun fetchUserByUserId(
        @Header("Authorization") token: String,
        @Body request: UserIdRequest
    ): Response<UserResponse>

    @DELETE("v1/closeAccount")
    suspend fun closeAccount(
        @Header("Authorization") token: String,
    ): Response<AccountResponse>

    @PUT("v1/updateProfile/{sectionId}")
    suspend fun updateProfile(
        @Path("sectionId") sectionId: String,
        @Header("Authorization") token: String,
        @Body request: UpdateProfileRequest
    ): Response<BackendResponse>

    @GET("donor")
    suspend fun isDonated(
        @Header("Authorization") token: String,
        @Query("requestId") requestId: String
    ): Response<IsDonatedResponse>

    @POST("v1/donation")
    suspend fun acceptDonation(
        @Header("Authorization") token: String,
        @Body request: RequestID
    ): Response<AcceptDonationResponse>

    @POST("v1/create-request")
    suspend fun createRequest(
        @Header("Authorization") token: String,
        @Body request: NewBloodRequest
    ): Response<BackendResponse>

    @GET("v1/request-history")
    suspend fun getRequestHistory(@Header("Authorization") token: String): Response<HistoryBloodRequestsResponse>

    @GET("v1/donorlist/{requestId}")
    suspend fun getDonorList(
        @Header("Authorization") token: String,
        @Path("requestId") requestId: String
    ): Response<DonorListResponse>

    @DELETE("v1/deleteRequest")
    suspend fun deleteRequest(
        @Header("Authorization") token: String,
        @Query("requestId") requestId: String
    ): Response<BackendResponse>

    @PUT("v1/toggleRequestStatus")
    suspend fun toggleRequestStatus(
        @Header("Authorization") token: String,
        @Body requestBody: RequestID
    ): Response<BackendResponse>


}
