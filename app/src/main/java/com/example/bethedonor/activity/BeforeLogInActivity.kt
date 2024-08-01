package com.example.bethedonor.activity

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.example.bethedonor.activity.ui.theme.BeTheDonorTheme
import com.example.bethedonor.navigation.BeforeLogInNavigationStack
import com.example.bethedonor.navigation.Destination
import com.example.bethedonor.viewmodels.LoginViewModel

class BeforeLogInActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            BeTheDonorTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    // Initialize the ViewModel
                    val loginViewModel: LoginViewModel = viewModel()
                    // Check if the user is logged in and determine the start destination
                    val isUserLoggedIn = loginViewModel.isUserLoggedIn()
                    // Navigate to the appropriate screen based on the user's login status
                    if (isUserLoggedIn) goNextActivity()
                    BeforeLogInNavigationStack(
                        navController = rememberNavController(),
                        startDestination = Destination.Login,
                        onResponseLoggedIn = {
                            goNextActivity() // Start the new activity
                        })

                }
            }
        }
    }

    private fun goNextActivity() {
        finish() // Finish the current activity
        val intent = Intent(this, AfterLogInActivity::class.java)
        startActivity(intent) // Start the new activity
    }
}

