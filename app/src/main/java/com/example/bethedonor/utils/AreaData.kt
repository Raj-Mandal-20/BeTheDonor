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

fun getCityList(selectedState: String?, selectedDistrict: String?): List<String> {
    return selectedDistrict.let {
        areaData?.states?.get(selectedState)?.get(it)?.keys?.toList()
    } ?: emptyList()
}

fun getPinCodeList(
    selectedState: String?,
    selectedDistrict: String?,
    selectedCity: String?
): List<String> {
    return selectedCity.let {
        areaData?.states?.get(selectedState)?.get(selectedDistrict)
            ?.get(it)
    }?.let { listOf(it) } ?: emptyList()
}



