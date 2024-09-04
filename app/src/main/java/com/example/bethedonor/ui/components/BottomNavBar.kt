package com.example.bethedonor.ui.components

import android.util.Log
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Add
import androidx.compose.material3.BottomAppBar
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.bethedonor.ui.theme.Gray1
import com.example.bethedonor.ui.theme.Gray3
import com.example.bethedonor.ui.theme.bloodRed2
import com.example.bethedonor.ui.theme.fadeBlue11
import com.example.bethedonor.ui.utils.uievent.BottomNavItem

@Composable
fun BottomNavBar(
    navController: NavController,
    selectedDestination: String,
    onHomeNavigate: () -> Unit,
    onAllRequestNavigate: () -> Unit,
    onCreateRequestNavigate: () -> Unit,
    onHistoryNavigate: () -> Unit,
    onProfileNavigate: () -> Unit
) {
    // Log the currently selected destination for debugging
    Log.d("BottomNavBar", "selectedDestination: $selectedDestination")

    // Define the bottom app bar with a specific background color and padding
    BottomAppBar(
        containerColor = fadeBlue11,
        contentPadding = PaddingValues(top = 0.dp)
    ) {
        // Add individual navigation items
        BottomNavBarItem(
            BottomNavItem.Home,
            selectedDestination,
            modifier = Modifier.weight(1f),
            onCLick = {
                onHomeNavigate()
            }
        )
        BottomNavBarItem(
            BottomNavItem.Request,
            selectedDestination,
            modifier = Modifier.weight(1f),
            onCLick = {
                onAllRequestNavigate()
            }
        )
        // Center create request icon
        CreateRequestIcon(modifier = Modifier.weight(1f), onClick = {
            onCreateRequestNavigate()
        })
        BottomNavBarItem(
            BottomNavItem.History,
            selectedDestination,
            modifier = Modifier.weight(1f),
            onCLick = {
                onHistoryNavigate()
            }
        )
        BottomNavBarItem(
            BottomNavItem.Profile,
            selectedDestination,
            modifier = Modifier.weight(1f),
            onCLick = {
                onProfileNavigate()
            }
        )
    }
}

@Composable
fun CreateRequestIcon(onClick: () -> Unit, modifier: Modifier) {
    // Create a circular red button with a plus icon in the middle
    Box(
        modifier = modifier
            .fillMaxSize()
            .padding(8.dp)
            .clickable { onClick() }
            .clip(RoundedCornerShape(60))
            .background(bloodRed2),
        contentAlignment = Alignment.Center,
    ) {
        Icon(imageVector = Icons.Outlined.Add, contentDescription = "create", tint = Color.White)
    }
}

@Composable
fun BottomNavBarItem(
    item: BottomNavItem,
    selected: String,
    onCLick: () -> Unit,
    modifier: Modifier
) {
    // Create individual bottom navigation item
    Box(
        contentAlignment = Alignment.Center,
        modifier = modifier
            .clickable { onCLick() }
            .drawBehind {
                // Draw an underline if the item is selected
                if (selected == item.route) {
                    val strokeWidth = 4.dp.toPx()
                    drawLine(
                        color = bloodRed2,
                        start = Offset(0f, 0f),
                        end = Offset(size.width, 0f),
                        strokeWidth = strokeWidth
                    )
                }
            }
    ) {
        // Arrange icon and text vertically
        Column(
            modifier = modifier.fillMaxHeight(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Icon(
                imageVector = item.icon,
                contentDescription = item.label,
                modifier = Modifier.size(30.dp),
                tint = if (selected == item.route) bloodRed2 else Gray3,
            )
            Text(
                text = item.label,
                color = if (selected == item.route) bloodRed2 else Gray3,
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold
            )
        }
    }
}