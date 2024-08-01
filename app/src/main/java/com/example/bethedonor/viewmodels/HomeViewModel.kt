package com.example.bethedonor.viewmodels

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import com.example.bethedonor.data.preferences.PreferencesManager

class HomeViewModel(application: Application) : AndroidViewModel(application){
    private val TAG = HomeViewModel::class.simpleName
    private val preferencesManager = PreferencesManager(getApplication())
    fun getUserId(): String {
        return preferencesManager.userId.toString()
    }
    fun getToken(): String {
        return preferencesManager.jwtToken.toString()
    }
}