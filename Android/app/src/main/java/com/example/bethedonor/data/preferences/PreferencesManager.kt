package com.example.bethedonor.data.preferences

import android.content.Context
import android.content.SharedPreferences

class PreferencesManager(context: Context) {
    private val sharedPreferences: SharedPreferences =
        context.getSharedPreferences("app_prefs", Context.MODE_PRIVATE)

    var jwtToken: String?
        get() = sharedPreferences.getString("jwt_token", null)
        set(value) = sharedPreferences.edit().putString("jwt_token", value).apply()

    var userId: String?
        get() = sharedPreferences.getString("user_id", null)
        set(value) = sharedPreferences.edit().putString("user_id", value).apply()

    var userAvailabilityStatus: Boolean?
        get()=sharedPreferences.getBoolean("userAvailabilityStatus",false)
        set(value) = sharedPreferences.edit().putBoolean("userAvailabilityStatus",value!!).apply()

    // Method to clear user data
      fun clearUserData() {
        sharedPreferences.edit()
            .remove("jwt_token")
            .remove("user_id")
            .remove("userAvailabilityStatus")
            .apply()
    }


}