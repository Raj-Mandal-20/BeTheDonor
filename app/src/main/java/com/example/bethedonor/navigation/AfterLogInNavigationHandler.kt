package com.example.bethedonor.navigation

import android.util.Log
import androidx.compose.animation.AnimatedContentTransitionScope
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.EaseInQuad
import androidx.compose.animation.core.EaseOutQuad
import androidx.compose.animation.core.FastOutLinearInEasing
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.tween
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
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
import com.example.bethedonor.ui.main_screens.EditEmailScreen
import com.example.bethedonor.ui.main_screens.HistoryScreen
import com.example.bethedonor.ui.main_screens.HomeScreen
import com.example.bethedonor.ui.main_screens.ProfileScreen
import com.example.bethedonor.ui.theme.bgDarkBlue
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
    // Get the current back stack entry state
    val navBackStackEntry by navController.currentBackStackEntryAsState()

    // Derive the current route based on the back stack entry
    val currentRoute by remember(navBackStackEntry) {
        derivedStateOf {
            val route = navBackStackEntry?.destination?.route ?: BottomNavItem.Home.route
            getBaseRoute(route)
        }
    }

    // Determine if the current screen should show the bottom bar
    val showBottomBar = currentRoute in listOf(
        BottomNavItem.Home.route,
        BottomNavItem.Request.route,
        BottomNavItem.History.route,
        BottomNavItem.Profile.route
    )

    Log.d("CurrentRoute", "Current Route: $currentRoute")

    Scaffold(
        bottomBar = {
            // Show bottom navigation bar if the current screen is part of the list
            AnimatedVisibility(
                visible = showBottomBar,
                enter = slideInVertically(
                    initialOffsetY = { fullHeight -> fullHeight },
                    animationSpec = tween(durationMillis = 600, easing = FastOutSlowInEasing)
                ),
                exit = slideOutVertically(
                    targetOffsetY = { fullHeight -> fullHeight },
                    animationSpec = tween(durationMillis = 450, easing = FastOutLinearInEasing)
                )
            ) {
                BottomNavBar(
                    navController = navController,
                    selectedDestination = currentRoute,
                    onHomeNavigate = {
                        navController.navigate(Destination.Home(userId)) {
                            launchSingleTop = true
                            restoreState = true
                            popUpTo(Destination.Home(userId)) { inclusive = true }
                        }
                    },
                    onAllRequestNavigate = {
                        navController.navigate(Destination.AllRequest(userId)) {
                            launchSingleTop = true
                            restoreState = true
                            popUpTo(Destination.AllRequest(userId)) { inclusive = true }
                        }
                    },
                    onCreateRequestNavigate = {
                        navController.navigate(Destination.CreateRequest(userId)) {
                            launchSingleTop = true
                            restoreState = true
                        }
                    },
                    onHistoryNavigate = {
                        navController.navigate(Destination.History(userId)) {
                            launchSingleTop = true
                            restoreState = true
                        }
                    },
                    onProfileNavigate = {
                        navController.navigate(Destination.Profile(token)) {
                            launchSingleTop = true
                            restoreState = true
                            popUpTo(Destination.History(userId)) { inclusive = true }
                        }
                    }
                )
            }
        },
        containerColor = bgDarkBlue
    ) { innerPadding ->
        // Define the navigation graph for different screens
        NavHost(
            navController = navController,
            startDestination = Destination.Home(userId)
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
            composable<Destination.CreateRequest>(
                enterTransition = {
                    Log.d("Transition", "Enter transition triggered")
                    slideIntoContainer(
                        AnimatedContentTransitionScope.SlideDirection.Up,
                        tween(durationMillis=700, easing = FastOutSlowInEasing)
                    )
                },
                exitTransition = {
                    Log.d("Transition", "Exit transition triggered")
                    slideOutOfContainer(
                        AnimatedContentTransitionScope.SlideDirection.Down,
                        tween(durationMillis = 700, easing = FastOutSlowInEasing)
                    )
                }
            ) {
                CreateRequestScreen(
                    navController = navController,
                    innerPadding,
                    token,
                    onDone = { navController.popBackStack() },
                    mainViewModel.createRequestViewModel
                )
            }
            composable<Destination.History> {
                HistoryScreen(
                    navController = navController,
                    token,
                    mainViewModel.historyViewModel,
                    innerPadding
                )
            }
            composable<Destination.Profile> {
                ProfileScreen(
                    token,
                    innerPadding = innerPadding,
                    onLogOutNavigate = onLogOut,
                    onEmailEditNavigate = {
                        navController.navigate(Destination.EmailEdit)
                    },
                    profileViewmodel = mainViewModel.profileViewModel
                )
            }
            composable<Destination.EmailEdit>(
                exitTransition = {
                    return@composable slideOutOfContainer(
                        AnimatedContentTransitionScope.SlideDirection.Right,
                        tween(300, easing = EaseInQuad)
                    )
                },
                enterTransition = {
                    return@composable slideIntoContainer(
                        AnimatedContentTransitionScope.SlideDirection.Up,
                        tween(300, easing = EaseOutQuad)
                    )
                }
            ) {
                EditEmailScreen(
                    authToken = token,
                    userId = userId,
                    editEmailViewModel = mainViewModel.editEmailViewModel,
                    onNavigateBack = { navController.popBackStack() }
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
