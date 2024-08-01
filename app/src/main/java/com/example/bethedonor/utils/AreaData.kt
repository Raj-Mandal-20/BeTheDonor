package com.example.bethedonor.utils

import android.content.Context
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

