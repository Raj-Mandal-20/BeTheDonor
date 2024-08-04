package com.example.bethedonor.viewmodels

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider

// MainViewModel that holds other ViewModels
class MainViewModel(application: Application) : AndroidViewModel(application) {
    // Initialize ViewModels with Application context
    val homeViewModel: HomeViewModel by lazy { HomeViewModel(application) }
    val profileViewModel: ProfileViewModel by lazy { ProfileViewModel(application) }
    val allRequestViewModel: AllRequestViewModel by lazy { AllRequestViewModel() }
    val createRequestViewModel: CreateRequestViewModel by lazy { CreateRequestViewModel() }
    //val historyViewModel: HistoryViewModel by lazy { HistoryViewModel(application) }
}

// Factory for creating MainViewModel with Application context
class MainViewModelFactory(private val application: Application) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(MainViewModel::class.java)) {
            return MainViewModel(application) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}

