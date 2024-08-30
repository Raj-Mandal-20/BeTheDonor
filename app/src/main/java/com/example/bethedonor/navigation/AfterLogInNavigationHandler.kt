package com.example.bethedonor.navigation

import android.util.Log
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import com.example.bethedonor.ui.components.BottomNavBar
import com.example.bethedonor.ui.main_screens.AllRequestScreen
import com.example.bethedonor.ui.main_screens.CreateRequestScreen
import com.example.bethedonor.ui.main_screens.HistoryScreen
import com.example.bethedonor.ui.main_screens.HomeScreen
import com.example.bethedonor.ui.main_screens.ProfileScreen
import com.example.bethedonor.ui.utils.uievent.BottomNavItem
import com.example.bethedonor.viewmodels.MainViewModel

@Composable
fun AfterLogInNavigationStack(
    navController: NavHostController,
    userId: String,
    token: String,
    onLogOut: () -> Unit,
    mainViewModel: MainViewModel,
) {
    //  val selectedDestination = remember { mutableStateOf(BottomNavItem.Home.route) }

    // Obtain the current back stack entry as a State
    val navBackStackEntry by navController.currentBackStackEntryAsState()


    // Derive the current route from the back stack entry
    val currentRoute by remember(navBackStackEntry) {
        derivedStateOf {
            val route = navBackStackEntry?.destination?.route ?: BottomNavItem.Home.route
            getBaseRoute(route)
        }
    }
    Log.d("CurrentRoute", "Current Route: $currentRoute")
    Scaffold(
        bottomBar = {
            BottomNavBar(
                navController = navController,
                selectedDestination = currentRoute,
                onHomeNavigate = {
                    navController.navigate(Destination.Home(userId)) {
                        popUpTo(Destination.Home(userId)) { inclusive = true }
                    }
                },
                onAllRequestNavigate = {
                    navController.navigate(Destination.AllRequest(userId)) {
                        popUpTo(Destination.AllRequest(userId)) { inclusive = true }
                    }
                },
                onCreateRequestNavigate = {
                    navController.navigate(Destination.CreateRequest(userId)) {
                        popUpTo(Destination.History(userId)) { inclusive = true }
                    }
                },
                onHistoryNavigate = {
                    navController.navigate(Destination.History(userId)) {

                    }
                },
                onProfileNavigate = {
                    navController.navigate(Destination.Profile(token)) {
                        popUpTo(Destination.History(userId)) { inclusive = true }
                    }
                }
            )

        }) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Destination.Home(userId),
            //  Modifier.padding(innerPadding.calculateTopPadding()*0, 0.dp, 0.dp, 0.dp)
        ) {
            composable<Destination.Home> {
                HomeScreen(
                    navController = navController,
                    innerPadding,
                    userId,
                    mainViewModel.homeViewModel
                )
            }
            composable<Destination.AllRequest> {
                AllRequestScreen(
                    navController = navController,
                    innerPadding = innerPadding,
                    token = token,
                    userId = userId,
                    mainViewModel.allRequestViewModel
                )
            }
            composable<Destination.CreateRequest> {
                CreateRequestScreen(navController = navController, innerPadding, token, onDone = {
                    navController.popBackStack()
                }, mainViewModel.createRequestViewModel)
            }
            composable<Destination.History> {
                HistoryScreen(navController = navController, token,mainViewModel.historyViewModel,innerPadding)
            }
            composable<Destination.Profile> {
                ProfileScreen(
                    token,
                    innerPadding = innerPadding,
                    onLogOutNavigate = onLogOut,
                    profileViewmodel = mainViewModel.profileViewModel
                )
            }
        }
    }
}

fun getBaseRoute(route: String): String {
    // Split the route by '/'
    val segments = route.split("/")
    // Get the first segment and remove any prefix if needed
    return segments.firstOrNull()?.substringAfterLast('.') ?: route
}
