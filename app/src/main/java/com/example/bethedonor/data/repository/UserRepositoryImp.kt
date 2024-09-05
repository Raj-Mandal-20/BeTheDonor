package com.example.bethedonor.data.repository


import com.example.bethedonor.data.api.ApiService
import com.example.bethedonor.data.dataModels.RequestID
import com.example.bethedonor.data.dataModels.AcceptDonationResponse
import com.example.bethedonor.data.dataModels.AccountResponse
import com.example.bethedonor.data.dataModels.BackendOTPResponse
import com.example.bethedonor.data.dataModels.BackendResponse
import com.example.bethedonor.data.dataModels.BloodRequestsResponse
import com.example.bethedonor.data.dataModels.ChangeEmailRequest
import com.example.bethedonor.data.dataModels.DonorListResponse
import com.example.bethedonor.data.dataModels.EmailID
import com.example.bethedonor.data.dataModels.HistoryBloodRequestsResponse
import com.example.bethedonor.data.dataModels.IsDonatedResponse
import com.example.bethedonor.data.dataModels.LogInRequest
import com.example.bethedonor.data.dataModels.NewBloodRequest
import com.example.bethedonor.data.dataModels.ProfileResponse
import com.example.bethedonor.data.dataModels.RegistrationRequest
import com.example.bethedonor.data.dataModels.UpdateProfileRequest
import com.example.bethedonor.data.dataModels.User
import com.example.bethedonor.data.dataModels.UserIdRequest
import com.example.bethedonor.data.dataModels.UserResponse
import com.example.bethedonor.data.dataModels.UserUpdate
import com.example.bethedonor.data.dataModels.VerifyOTPRequest
import com.example.bethedonor.domain.repository.UserRepository
import okhttp3.ResponseBody
import retrofit2.Response

class UserRepositoryImp(private val apiService: ApiService) : UserRepository {
    override suspend fun registerUser(user: User): Response<ResponseBody> {
        val request = RegistrationRequest(
            user.base.name,
            user.email,
            user.base.phoneNumber,
            user.base.dob,
            user.base.gender,
            user.base.bloodGroup,
            user.base.state,
            user.base.city,
            user.base.district,
            user.base.pin,
            user.base.password,
            user.base.available
        )
        return apiService.register(request)
    }

    override suspend fun loginUser(email: String, password: String): Response<ResponseBody> {
        val request = LogInRequest(email, password)
        return apiService.login(request)
    }

    override suspend fun forgetPassword(email: String): Response<ResponseBody> {
        val request = EmailID(email)
        return apiService.forgetPassword(request)
    }

    override suspend fun getUserProfile(token: String): Response<ProfileResponse> {
        return apiService.getProfile("Bearer $token")
    }

    override suspend fun getAllBloodRequests(token: String): Response<BloodRequestsResponse> {
        return apiService.getAllBloodRequests("Bearer $token")
    }

    override suspend fun fetchUserByUserId(token: String, userId: String): Response<UserResponse> {
        val request = UserIdRequest(userId)
        return apiService.fetchUserByUserId("Bearer $token", request)
    }

    override suspend fun closeAccount(token: String): Response<AccountResponse> {
        return apiService.closeAccount("Bearer $token")
    }

    override suspend fun updateProfile(
        sectionId: String,
        token: String,
        userUpdate: UserUpdate
    ): Response<BackendResponse> {
        val request = UpdateProfileRequest(
            //    userUpdate.phoneNumber,
            userUpdate.gender,
            userUpdate.state,
            userUpdate.city,
            userUpdate.district,
            userUpdate.pin,
            userUpdate.available
        )
        return apiService.updateProfile(sectionId, "Bearer $token", request)
    }

    override suspend fun checkIsDonated(
        token: String,
        requestId: String
    ): Response<IsDonatedResponse> {
        return apiService.isDonated("Bearer $token", requestId)
    }

    override suspend fun acceptDonation(
        token: String,
        requestId: String
    ): Response<AcceptDonationResponse> {
        val request = RequestID(requestId)
        return apiService.acceptDonation("Bearer $token", request)
    }

    override suspend fun createRequest(
        token: String,
        request: NewBloodRequest
    ): Response<BackendResponse> {
        return apiService.createRequest("Bearer $token", request)
    }

    override suspend fun getRequestHistory(token: String): Response<HistoryBloodRequestsResponse> {
        return apiService.getRequestHistory("Bearer $token")
    }

    override suspend fun getDonorList(
        token: String,
        requestId: String
    ): Response<DonorListResponse> {
        return apiService.getDonorList("Bearer $token", requestId)
    }

    override suspend fun deleteRequest(
        token: String,
        requestId: String
    ): Response<BackendResponse> {
        return apiService.deleteRequest("Bearer $token", requestId)
    }

    override suspend fun toggleRequestStatus(
        token: String,
        requestId: String
    ): Response<BackendResponse> {
        val requestBody = RequestID(requestId)
        return apiService.toggleRequestStatus("Bearer $token", requestBody)
    }

    override suspend fun changeEmailId(token: String, changeEmailRequest: ChangeEmailRequest): Response<BackendOTPResponse> {

        return apiService.changeEmail("Bearer $token", changeEmailRequest)
    }

    override suspend fun verifyOTP(
        token: String,
        verifyOTPRequest: VerifyOTPRequest
    ): Response<BackendResponse> {
        val verifyOtpRequest = VerifyOTPRequest(
            otp = verifyOTPRequest.otp,
            otpId = verifyOTPRequest.otpId
        )
        return apiService.verifyOTP("Bearer $token", verifyOtpRequest)
    }
}
