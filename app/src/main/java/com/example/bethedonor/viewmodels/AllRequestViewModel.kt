package com.example.bethedonor.viewmodels

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.bethedonor.data.api.BloodRequest
import com.example.bethedonor.data.api.RetrofitClient
import com.example.bethedonor.data.api.UserProfile
import com.example.bethedonor.data.repository.UserRepositoryImp
import com.example.bethedonor.domain.usecase.FetchUserDetailsUseCase
import com.example.bethedonor.domain.usecase.GetAllBloodRequestsUseCase
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class BloodRequestWithUser(
    val bloodRequest: BloodRequest,
    val user: UserProfile
)

class AllRequestViewModel() : ViewModel() {
    private val _allBloodRequestResponse = MutableLiveData<Result<List<BloodRequestWithUser>>>()
    private val allBloodRequestResponse: LiveData<Result<List<BloodRequestWithUser>>> =
        _allBloodRequestResponse

    private val _allBloodRequestResponseList =
        MutableStateFlow<Result<List<BloodRequestWithUser>>?>(null)
    val allBloodRequestResponseList: StateFlow<Result<List<BloodRequestWithUser>>?> =
        _allBloodRequestResponseList

    private val apiService = RetrofitClient.instance
    private val userRepository = UserRepositoryImp(apiService)
    private val getAllBloodRequestsUseCase = GetAllBloodRequestsUseCase(userRepository)
    private val fetchUserDetailsUseCase = FetchUserDetailsUseCase(userRepository)
    val isRequestFetching = MutableStateFlow(false)

    private val _isSheetVisible = MutableStateFlow(false)
    val isSheetVisible: StateFlow<Boolean> = _isSheetVisible

    private val _searchText = MutableStateFlow("")
    val searchText = _searchText.asStateFlow()

    private val _filterState = MutableStateFlow("")
    val filterState: StateFlow<String> = _filterState

    private val _filterDistrict = MutableStateFlow("")
    val filterDistrict: StateFlow<String> = _filterDistrict

    private val _filterCity = MutableStateFlow("")
    val filterCity: StateFlow<String> = _filterCity

    private val _filterPin = MutableStateFlow("")
    val filterPin: StateFlow<String> = _filterPin

    fun getAllBloodRequest(token: String) {
        isRequestFetching.value = true
        viewModelScope.launch {
            try {
                val response = getAllBloodRequestsUseCase.execute(token)
                if (response.bloodRequests != null) {
                    val bloodRequestWithUsers = response.bloodRequests.map { bloodRequest ->
                        val userResponse =
                            fetchUserDetailsUseCase.execute(token, bloodRequest.userId)
                        if (userResponse.user == null) {
                            throw Exception("Failed to fetch user details for request: ${bloodRequest.userId}")
                        }
                        val user = userResponse.user
                        BloodRequestWithUser(bloodRequest, user)
                    }
                    _allBloodRequestResponse.value = Result.success(bloodRequestWithUsers)
                    _allBloodRequestResponseList.value = Result.success(bloodRequestWithUsers)
                } else {
                    _allBloodRequestResponse.value = Result.failure(Exception(response.message))
                    _allBloodRequestResponseList.value = Result.failure(Exception(response.message))
                }
            } catch (e: Exception) {
                _allBloodRequestResponse.value = Result.failure(e)
                _allBloodRequestResponseList.value = Result.failure(e)
            } finally {
                isRequestFetching.value = false
            }
        }
    }

    fun onToggleSheetDialog() {
        _isSheetVisible.value = !_isSheetVisible.value
    }

    fun onSearchTextChange(text: String) {
        _searchText.value = text
        filterBloodRequests()
    }

    fun updateFilterState(state: String) {
        _filterState.value = state
        clearDistrictFilter()
    }

    fun updateFilterDistrict(district: String) {
        _filterDistrict.value = district
        clearCityFilter()
    }

    fun updateFilterCity(city: String) {
        _filterCity.value = city
        clearPinFilter()
    }

    fun updateFilterPin(pin: String) {
        _filterPin.value = pin
        filterBloodRequests()
    }

    fun clearStateFilter() {
        clearFilters()
        filterBloodRequests()
    }

    fun clearDistrictFilter() {
        _filterDistrict.value = ""
        _filterCity.value = ""
        _filterPin.value = ""
        filterBloodRequests()
    }

    fun clearCityFilter() {
        _filterCity.value = ""
        _filterPin.value = ""
        filterBloodRequests()
    }

    fun clearPinFilter() {
        _filterPin.value = ""
        filterBloodRequests()
    }

    private fun clearFilters() {
        _filterState.value = ""
        _filterDistrict.value = ""
        _filterCity.value = ""
        _filterPin.value = ""
    }


    private fun filterBloodRequests() {
        try {
            val result = allBloodRequestResponse.value
            val query = _searchText.value.trim()

            val filteredResult = result?.let {
                it.fold(
                    onSuccess = { bloodRequestsResponse ->
                        val filteredList = bloodRequestsResponse
                            .asSequence()
                            .filter { bloodRequestWithUser ->
                                // Search query filter
                                query.isEmpty() || bloodRequestWithUser.bloodRequest.bloodGroup.contains(
                                    query,
                                    ignoreCase = true
                                ) ||
                                        bloodRequestWithUser.bloodRequest.state.contains(
                                            query,
                                            ignoreCase = true
                                        ) ||
                                        bloodRequestWithUser.bloodRequest.district.contains(
                                            query,
                                            ignoreCase = true
                                        ) ||
                                        bloodRequestWithUser.bloodRequest.city.contains(
                                            query,
                                            ignoreCase = true
                                        ) ||
                                        bloodRequestWithUser.bloodRequest.pin.contains(
                                            query,
                                            ignoreCase = true
                                        )
                            }
                            .filter { bloodRequestWithUser ->
                                // State filter
                                filterState.value.isEmpty() || bloodRequestWithUser.bloodRequest.state.contains(
                                    filterState.value.trim(),
                                    ignoreCase = true
                                )
                            }
                            .filter { bloodRequestWithUser ->
                                // District filter
                                filterDistrict.value.isEmpty() || bloodRequestWithUser.bloodRequest.district.contains(
                                    filterDistrict.value.trim(),
                                    ignoreCase = true
                                )
                            }
                            .filter { bloodRequestWithUser ->
                                // City filter
                                filterCity.value.isEmpty() || bloodRequestWithUser.bloodRequest.city.contains(
                                    filterCity.value.trim(),
                                    ignoreCase = true
                                )
                            }
                            .filter { bloodRequestWithUser ->
                                // Pin filter
                                filterPin.value.isEmpty() || bloodRequestWithUser.bloodRequest.pin.contains(
                                    filterPin.value.trim(),
                                    ignoreCase = true
                                )
                            }
                            .toList()
                        Log.d("filteredList", filteredList.toString())
                        Result.success(filteredList)
                    },
                    onFailure = { error ->
                        Result.failure(Exception(error.message))
                    }
                )
            }
            _allBloodRequestResponseList.value = filteredResult

        } catch (e: Exception) {
            e.printStackTrace()
            _allBloodRequestResponseList.value = Result.failure(e)
        }
    }
}
