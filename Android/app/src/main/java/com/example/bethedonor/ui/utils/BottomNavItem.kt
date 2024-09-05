package com.example.bethedonor.ui.utils

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.History
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.Notifications
import androidx.compose.material.icons.outlined.Person
import androidx.compose.ui.graphics.vector.ImageVector

sealed class BottomNavItem(val route: String, val icon: ImageVector, val label: String) {
    data object Home : BottomNavItem("Home", Icons.Outlined.Home, "Home")
    data object Request : BottomNavItem("AllRequest", Icons.Outlined.Notifications, "Requests")
    data object History : BottomNavItem("History", Icons.Outlined.History, "History")
    data object Profile : BottomNavItem("Profile", Icons.Outlined.Person, "Profile")
}