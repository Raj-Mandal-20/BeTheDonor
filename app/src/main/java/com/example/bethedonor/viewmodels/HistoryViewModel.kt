package com.example.bethedonor.viewmodels

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.bethedonor.data.api.RetrofitClient
import com.example.bethedonor.data.dataModels.BloodRequest
import com.example.bethedonor.data.repository.UserRepositoryImp
import com.example.bethedonor.domain.usecase.GetRequestHistoryUseCase
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

data class RequestHistory(
    val bloodRequest: BloodRequest
)

class HistoryViewModel : ViewModel() {
    private val _requestHistoryResponseList = MutableStateFlow<Result<List<RequestHistory>>?>(null)
    val requestHistoryResponseList: StateFlow<Result<List<RequestHistory>>?> = _requestHistoryResponseList

    private val apiService = RetrofitClient.instance
    private val userRepository = UserRepositoryImp(apiService)
    private val getRequestHistoryUseCase = GetRequestHistoryUseCase(userRepository)

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
}
