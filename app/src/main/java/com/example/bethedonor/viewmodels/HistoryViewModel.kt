package com.example.bethedonor.viewmodels

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.bethedonor.data.api.RetrofitClient
import com.example.bethedonor.data.dataModels.BackendResponse
import com.example.bethedonor.data.dataModels.BloodRequest
import com.example.bethedonor.data.dataModels.DonorListResponse
import com.example.bethedonor.data.repository.UserRepositoryImp
import com.example.bethedonor.domain.usecase.DeleteRequestUseCase
import com.example.bethedonor.domain.usecase.GetDonorListUseCase
import com.example.bethedonor.domain.usecase.GetRequestHistoryUseCase
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

data class RequestHistory(
    val bloodRequest: BloodRequest
)

class HistoryViewModel : ViewModel() {
    val authToken = MutableStateFlow("")

    fun updateAuthToken(token: String) {
        authToken.value = token
    }

    private val _requestHistoryResponseList = MutableStateFlow<Result<List<RequestHistory>>?>(null)
    val requestHistoryResponseList: StateFlow<Result<List<RequestHistory>>?> =
        _requestHistoryResponseList

    private val apiService = RetrofitClient.instance
    private val userRepository = UserRepositoryImp(apiService)
    private val getRequestHistoryUseCase = GetRequestHistoryUseCase(userRepository)
    private val getDonorListUseCase = GetDonorListUseCase(userRepository)
    private val deleteRequestUseCase = DeleteRequestUseCase(userRepository)
    private val _isDonorListFetching = MutableStateFlow(false)
    val isDonorListFetching: StateFlow<Boolean> = _isDonorListFetching

    private val _donorListResponse = MutableStateFlow<Result<DonorListResponse>?>(null)
    val donorListResponse: StateFlow<Result<DonorListResponse>?> = _donorListResponse

    private val _deleteRequestResponse = MutableStateFlow<Result<String>?>(null)
    val deleteRequestResponse: StateFlow<Result<String>?> = _deleteRequestResponse

    private var _toggleStatusResult = BackendResponse()


    val isRequestFetching = MutableStateFlow(false)

    private val _recomposeTime = MutableStateFlow(-1L)
    val recomposeTime: StateFlow<Long> = _recomposeTime

    fun updateRecomposeTime() {
        _recomposeTime.value += 1
    }

    fun shouldFetch(): Boolean {
        return (_recomposeTime.value % 3).toInt() == 0;
    }

    fun fetchRequestHistory(token: String) {
        viewModelScope.launch {
            isRequestFetching.value = true
            try {
                // Fetch request history
                val response = getRequestHistoryUseCase.execute(token)
                if (response.bloodRequests != null) {
                    // Wrap BloodRequest in RequestHistory
                    val requestHistoryList = response.bloodRequests.map { RequestHistory(it) }
                    _requestHistoryResponseList.value = Result.success(requestHistoryList)
                } else {
                    _requestHistoryResponseList.value = Result.failure(Exception(response.message))
                }
                Log.d("HistoryViewModel", response.toString())
                Log.d("HistoryViewModel", "${requestHistoryResponseList.value}")
            } catch (e: Exception) {
                _requestHistoryResponseList.value = Result.failure(e)
            } finally {
                isRequestFetching.value = false
            }
        }
    }

    fun fetchDonorList(token: String, requestId: String) {
        _donorListResponse.value = null
        viewModelScope.launch {
            _isDonorListFetching.value = true
            try {
                val response = getDonorListUseCase.execute(token, requestId)
                if (response.donors != null) {
                    _donorListResponse.value = Result.success(response)
                } else {
                    _donorListResponse.value = Result.failure(Exception(response.message))
                }
                Log.d("HistoryViewModel", "Donor List Response: $response")
            } catch (e: Exception) {
                _donorListResponse.value = Result.failure(e)
                Log.e("HistoryViewModel", "Error fetching donor list: ${e.message}")
            } finally {
                _isDonorListFetching.value = false
            }
        }
    }

    fun deleteRequest(token: String, requestId: String, onResponse: (Result<String>) -> Unit) {
        viewModelScope.launch {
            isRequestFetching.value = true
            try {
                Log.d("delete-request-id", requestId)
                val response = deleteRequestUseCase.execute(token, requestId)
                Log.d("HistoryViewModel", "Delete Request Response: $response")
                if (response.statusCode == "200") {
                    // Update the request history list after successful deletion
                    val updatedList = _requestHistoryResponseList.value?.getOrNull()
                        ?.filter { it.bloodRequest.id != requestId }
                    _requestHistoryResponseList.value = Result.success(updatedList ?: listOf())

                    // Notify success
                    _deleteRequestResponse.value =
                        Result.success(response.message ?: "Request deleted successfully")
                } else {
                    // Notify failure if status code is not 200
                    _deleteRequestResponse.value =
                        Result.failure(Exception("Error: ${response.message}"))
                }
            } catch (e: Exception) {
                _deleteRequestResponse.value = Result.failure(e)
                Log.e("HistoryViewModel", "Error deleting request: ${e.message}")
            } finally {
                _deleteRequestResponse.value?.let { onResponse(it) }
                isRequestFetching.value = false
            }
        }
    }

    fun toggleRequestStatus(
        token: String,
        requestId: String,
        onToggleStatus: (BackendResponse) -> Unit
    ) {
        isRequestFetching.value = true
        viewModelScope.launch {
            _toggleStatusResult = try {
                val response = userRepository.toggleRequestStatus(token, requestId)
                if (response.isSuccessful) {
                    BackendResponse(message = response.message(), statusCode = response.code().toString())
                } else {
                    BackendResponse(message = response.message(), statusCode = response.code().toString())
                }
            } catch (e: Exception) {
                BackendResponse(message = e.message, statusCode = "500")
            } finally {
                isRequestFetching.value = false
                onToggleStatus(_toggleStatusResult)
            }
        }
    }
}
