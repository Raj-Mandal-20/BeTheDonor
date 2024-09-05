package com.example.bethedonor.data.dataModels

import com.google.gson.annotations.SerializedName
import java.util.Date

data class RegistrationRequest(
    val name: String,
    val email: String,
    val phoneNumber: String,
    val dob: Date,
    val gender: String,
    val bloodGroup: String,
    val state: String,
    val city: String,
    val district: String,
    val pin: String,
    val password: String,
    val available: Boolean
)

data class LogInRequest(
    val email: String,
    val password: String
)

data class NewBloodRequest(
    val state: String,
    val district: String,
    val city: String,
    val donationCenter: String,
    val pin: String,
    val bloodUnit: String,
    val bloodGroup: String,
    val deadline: Date
)

data class UserProfile(
    @SerializedName("_id")
    val id: String? = null,
    val name: String? = null,
    val email: String? = null,
    val state: String? = null,
    val city: String? = null,
    val district: String? = null,
    val dob: Date? = null,
    val gender: String? = null,
    val pin: String? = null,
    val phoneNumber: String? = null,
    val bloodGroup: String? = null,
    val available: Boolean? = null,
    val requests: List<String>? = null,
    val donates: List<String>? = null,
    val createdAt: Date? = null,
    val updatedAt: Date? = null,
    @SerializedName("__v")
    val v: Int? = null
)

data class BloodRequest(
    val isClosed:Boolean,
    @SerializedName("_id")
    val id: String,
    val city: String,
    val state: String,
    val pin: String,
    val bloodUnit: String,
    val bloodGroup: String,
    val donationCenter: String,
    val district: String,
    val deadline: Date,
    val donors: List<String>,
    val userId: String,
    val createdAt: Date,
    val updatedAt: Date,
    @SerializedName("__v")
    val v: Int? = null,
)

data class UserIdRequest(val userId: String)
data class DeleteRequestBody(val requestId: String)
data class UpdateProfileRequest(
  //  val phoneNumber: String,
    val gender: String,
    val state: String,
    val district: String,
    val city: String,
    val pin: String,
    val available: Boolean,
)

data class RequestID(
    val requestId: String
)
data class EmailID(
    val email: String
)
data class ChangeEmailRequest(
    val emailId: String,
   // val userId: String
)
data class VerifyOTPRequest(
    val otp: String,
    val otpId: String
)
data class Donor(
    val name: String,
    val email: String,
    val state: String,
    val city: String,
    val district: String,
    val pin: String,
    val phoneNumber: String,
    val bloodGroup: String
)

