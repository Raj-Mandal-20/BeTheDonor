package com.example.bethedonor.domain.repository

import com.example.bethedonor.data.api.ProfileResponse
import com.example.bethedonor.domain.model.User
import okhttp3.ResponseBody
import retrofit2.Response

interface UserRepository {
    suspend fun registerUser(user: User): Response<ResponseBody>
    suspend fun loginUser(email: String, password: String): Response<ResponseBody>
    suspend fun getUserProfile(token: String): Response<ProfileResponse>
}