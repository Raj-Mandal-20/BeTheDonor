package com.example.bethedonor.navigation

import android.util.Log
import androidx.compose.animation.AnimatedContentTransitionScope
import androidx.compose.animation.EnterTransition
import androidx.compose.animation.ExitTransition
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavBackStackEntry
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import com.example.bethedonor.ui.components.BottomNavBar
import com.example.bethedonor.ui.main_screens.AllRequestScreen
import com.example.bethedonor.ui.main_screens.CreateRequestScreen
import com.example.bethedonor.ui.main_screens.HistoryScreen
import com.example.bethedonor.ui.main_screens.HomeScreen
import com.example.bethedonor.ui.main_screens.LoginScreen
import com.example.bethedonor.ui.main_screens.ProfileScreen
import com.example.bethedonor.ui.main_screens.RegistrationScreen
import java.time.LocalDate

@Composable
fun NavigationStack(
    navController: NavHostController,
    startDestination: Destination,
    isUserLoggedIn: Boolean,
    userId: String,
    authToken: String
) {

    val userLoggedIn = remember {
        mutableStateOf(isUserLoggedIn)
    }
    val userId = remember {
        mutableStateOf(userId)
    }
    val token = remember {
        mutableStateOf(authToken)
    }

    val currentBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = currentBackStackEntry?.destination?.route

    // Check if the current route is "CreateRequest"
    val isCreateRequestScreen = currentRoute?.contains("CreateRequest", ignoreCase = true) ?: false
    Log.d("NavigationStack", "isCreateRequestScreen: $isCreateRequestScreen")

    //animation transitions
    /***************************************************************/


    /**********************************************************************/
    Scaffold(
        bottomBar = {
            if (userLoggedIn.value && !isCreateRequestScreen!!) {
                BottomNavBar(
                    onHomeNavigate = {
                        navController.navigate(Destination.Home(userId.value))
                    },
                    onAllRequestNavigate = {
                        navController.navigate(Destination.AllRequest(userId.value))
                    },
                    onCreateRequestNavigate = {
                        navController.navigate(Destination.CreateRequest(userId.value))
                    },
                    onHistoryNavigate = {
                        navController.navigate(Destination.History(userId.value))
                    },
                    onProfileNavigate = {
                        navController.navigate(Destination.Profile(token.value))
                    }
                )
            }
        },
        contentWindowInsets = WindowInsets(0.dp, 0.dp, 0.dp, 0.dp)
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = startDestination,
            Modifier.padding(innerPadding.calculateTopPadding(), 0.dp, 0.dp, 0.dp)
        ) {
            composable<Destination.Registration>(
            ) {
                RegistrationScreen(onRegisterNavigate = {
                    navController.navigate(Destination.Login)
                })
            }

            composable<Destination.Login>(

            ) {
                LoginScreen(onLoginNavigate = { uId, authtoken ->
                    userLoggedIn.value = true
                    userId.value = uId
                    token.value = authtoken
                    navController.navigate(Destination.Home(userId.value)) {
                        popUpTo(Destination.Login) {
                            inclusive = true
                        }
                    }
                }, onRegisterNavigate = {
                    navController.navigate(Destination.Registration)
                })
            }
            composable<Destination.Home> {
                HomeScreen(navController = navController, innerPadding, userId.value)
            }
            composable<Destination.AllRequest> {
                AllRequestScreen(navController = navController, innerPadding, userId.value)
            }
            composable<Destination.CreateRequest> {
                CreateRequestScreen(navController = navController, userId.value, onDone = {
                    navController.popBackStack()
                })
            }
            composable<Destination.History> {
                HistoryScreen(navController = navController, userId.value)
            }
            composable<Destination.Profile> {
                ProfileScreen(
                    token.value,
                    innerPadding = innerPadding,
                    onLogOutNavigate = {
                        userLoggedIn.value = false
                        navController.navigate(Destination.Login) {
                            popUpTo(0)
                        }
                    }
                )
            }
        }
    }
}