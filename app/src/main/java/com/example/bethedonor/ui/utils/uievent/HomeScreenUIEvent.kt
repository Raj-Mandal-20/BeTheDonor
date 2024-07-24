package com.example.bethedonor.ui.utils.uievent

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.History
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.Notifications
import androidx.compose.material.icons.outlined.Person
import androidx.compose.ui.graphics.vector.ImageVector

sealed class BottomNavItem(val route: String, val icon: ImageVector, val label: String) {
    data object Home : BottomNavItem("home", Icons.Outlined.Home, "Home")
    data object Request : BottomNavItem("search", Icons.Outlined.Notifications, "Requests")
    data object History : BottomNavItem("activity", Icons.Outlined.History, "History")
    data object Profile : BottomNavItem("profile", Icons.Outlined.Person, "Profile")
}