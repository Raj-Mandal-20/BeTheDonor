package com.example.bethedonor.viewmodels

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.example.bethedonor.utils.AreaData

class CreateRequestViewModel : ViewModel() {
    private val areaData: MutableState<AreaData?> = mutableStateOf(null)

    // Initialize selectedState
    var selectedState: MutableState<String?> = mutableStateOf(null)
    var selectedDistrict: MutableState<String?> = mutableStateOf(null)
    var selectedCity: MutableState<String?> = mutableStateOf(null)
    var selectedPinCode: MutableState<String?> = mutableStateOf(null)
    var requestInProgress = mutableStateOf(false)

    fun setAreaData(data: AreaData?) {
        areaData.value = data
    }

    fun getStateDataList(): List<String> {
        return areaData.value?.states?.keys?.toList() ?: emptyList()
    }

    fun getDistrictList(): List<String> {
        return selectedState.value?.let { areaData.value?.states?.get(it)?.keys?.toList() }
            ?: emptyList()
    }

    fun getCityList(): List<String> {
        return selectedDistrict.value?.let {
            areaData.value?.states?.get(selectedState.value)?.get(it)?.keys?.toList()
        } ?: emptyList()
    }

    fun getPinCodeList(): List<String> {
        return selectedCity.value?.let {
            areaData.value?.states?.get(selectedState.value)?.get(selectedDistrict.value)
                ?.get(it)
        }?.let { listOf(it) } ?: emptyList()
    }

    fun selectState(state: String) {
        selectedState.value = state
        selectedDistrict.value = null
        selectedCity.value = null
        selectedPinCode.value = null
    }

    fun selectDistrict(district: String) {
        selectedDistrict.value = district
        selectedCity.value = null
        selectedPinCode.value = null
    }

    fun selectCity(city: String) {
        selectedCity.value = city
        selectedPinCode.value = null
    }

    fun selectPin(pinCode: String) {
        selectedPinCode.value = pinCode
    }


}