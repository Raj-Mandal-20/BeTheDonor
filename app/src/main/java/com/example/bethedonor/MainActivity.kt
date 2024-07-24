package com.example.bethedonor

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.example.bethedonor.navigation.Destination
import com.example.bethedonor.navigation.NavigationStack
import com.example.bethedonor.ui.theme.BeTheDonorTheme
import com.example.bethedonor.viewmodels.LoginViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            BeTheDonorTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    // Initialize the ViewModel
                    val loginViewModel: LoginViewModel = viewModel()

                    // Check if the user is logged in and determine the start destination
                    val isUserLoggedIn = loginViewModel.isUserLoggedIn()
                    val userID= loginViewModel.getUserId()
                    val authToken=loginViewModel.getToken();
                    NavigationStack(
                        navController = rememberNavController(),
                        startDestination = if (isUserLoggedIn) Destination.Home(loginViewModel.getUserId()) else Destination.Login,
                        isUserLoggedIn = isUserLoggedIn,
                        userId=userID,
                        authToken=authToken
                    )
                }
            }
        }
    }
}
