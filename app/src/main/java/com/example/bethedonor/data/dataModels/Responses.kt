package com.example.bethedonor.data.dataModels

import com.google.gson.annotations.SerializedName

data class BackendResponse(
    val statusCode: String? = null,
    val message: String? = null
)

data class LogInResponse(
    val token: String? = null,
    val userId: String? = null,
    val available:Boolean=false,
    val message: String = "Login SuccessFull",
    val statusCode: String? = null
)

data class ProfileResponse(
    val myProfile: UserProfile? = null,
    val statusCode: String? = null,
    val message: String? = null
)
data class AccountResponse(
    val isAccountClosed: Boolean = false,
    val statusCode: String? = null,
    val message: String? = null
)

data class BloodRequestsResponse(
    @SerializedName("allBloodRequest") val bloodRequests: List<BloodRequest>? = null,
    val statusCode: String? = null,
    val message: String? = null
)
data class HistoryBloodRequestsResponse(
    @SerializedName("bloodRequests")
    val bloodRequests: List<BloodRequest>?=null,
    val statusCode: String? = null,
    val message: String? = null
)

data class UserResponse(
    val user: UserProfile? = null,
    val statusCode: String? = null,
    val message: String? = null
)

data class IsDonatedResponse(
    val isDonated: Boolean,
    val response: BackendResponse
)

data class AcceptDonationResponse(
    val bloodRequest: BloodRequest? = null,
    val statusCode: String? = null,
    val message: String? = null
)