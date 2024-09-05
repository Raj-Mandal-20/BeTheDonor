package com.example.bethedonor.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.bethedonor.ui.main_screens.LoginScreen
import com.example.bethedonor.ui.main_screens.RegistrationScreen


@Composable
fun BeforeLogInNavigationStack(
    navController: NavHostController,
    startDestination: Destination,
    onResponseLoggedIn:()->Unit
) {
    NavHost(
        navController = navController,
        startDestination = startDestination,
    ){
        composable<Destination.Registration>{
            RegistrationScreen(onRegisterNavigate = {
                navController.navigate(Destination.Login)
            })
        }
        composable<Destination.Login>{
            LoginScreen(onLoginNavigate = {
                onResponseLoggedIn()
            }, onRegisterNavigate = {
                navController.navigate(Destination.Registration){
                    popUpTo(0)
                }
            })
        }
    }
}