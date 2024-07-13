package com.example.bethedonor.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavDestination
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.bethedonor.ui.screens.AllRequestScreen
import com.example.bethedonor.ui.screens.HomeScreen
import com.example.bethedonor.ui.screens.LoginScreen
import com.example.bethedonor.ui.screens.ProfileScreen
import com.example.bethedonor.ui.screens.RegistrationScreen

@Composable
fun NavigationStack(navController: NavHostController, startDestination: Destination) {
    NavHost(navController = navController, startDestination = startDestination::class.java.name) {
        composable(Destination.Registration::class.java.name) {
            RegistrationScreen(navController = navController)
        }
        composable(Destination.Login::class.java.name) {
            LoginScreen(navController = navController)
        }
        composable(Destination.Home::class.java.name) {
            HomeScreen(navController = navController)
        }
        composable(Destination.AllRequest::class.java.name) {
            AllRequestScreen(navController = navController)
        }
        composable(Destination.CreateRequest::class.java.name) {
            // Replace with appropriate screen
            //ProfileScreen(navController = navController)
        }
        composable(Destination.Profile::class.java.name) {
            ProfileScreen(navController = navController)
        }
    }
}