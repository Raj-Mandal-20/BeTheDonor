package com.example.bethedonor.utils

import android.content.Context
import androidx.compose.runtime.mutableStateOf
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import java.io.IOException

data class AreaData(
    val states: Map<String, Map<String, Map<String, String>>>
)

fun readJsonFromAssets(context: Context, fileName: String): AreaData? {
    return try {
        val jsonString = context.assets.open(fileName).bufferedReader().use { it.readText() }
        val gson = Gson()
        val type = object : TypeToken<Map<String, Map<String, Map<String, String>>>>() {}.type
        val states: Map<String, Map<String, Map<String, String>>> = gson.fromJson(jsonString, type)
        AreaData(states)
    } catch (ioException: IOException) {
        ioException.printStackTrace()
        null
    }
}

private var areaData: AreaData? = null

fun setAreaData(data: AreaData) {
    areaData = data
}

fun getStateDataList(): List<String> {
    return areaData?.states?.keys?.toList() ?: emptyList()
}

fun getDistrictList(selectedState: String?): List<String> {
    return selectedState.let { areaData?.states?.get(it)?.keys?.toList() }
        ?: emptyList()
}

fun getPinCodeList(selectedState: String?, selectedDistrict: String?): List<String> {
    // Fetch all pin codes for the selected district
    return selectedDistrict?.let {
        areaData?.states?.get(selectedState)?.get(it)?.values?.distinct()?.toList()
    } ?: emptyList()
}

fun getCityList(
    selectedState: String?,
    selectedDistrict: String?,
    selectedPinCode: String?
): List<String> {
    // Fetch cities based on the selected pin code
    return selectedPinCode?.let {
        areaData?.states?.get(selectedState)?.get(selectedDistrict)
            ?.filterValues { it == selectedPinCode }
            ?.keys
            ?.toList()
    } ?: emptyList()
}



