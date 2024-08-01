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
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
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
    Log.d("BottomNavBar", "selectedDestination: ${selectedDestination}")
    BottomAppBar(
        containerColor = fadeBlue11,
        contentPadding = PaddingValues(top = 0.dp)
    ) {
//        Row(
//            modifier = Modifier
//                .fillMaxWidth()
//                .background(Color.Transparent),
//            horizontalArrangement = Arrangement.SpaceBetween,
//            verticalAlignment = Alignment.CenterVertically,
//        ) {
        BottomNavBarItem(
            BottomNavItem.Home,
            selectedDestination,
            modifier = Modifier.weight(1f),
            onCLick = {
                //     selectedDestination.value = BottomNavItem.Home.route
                onHomeNavigate()
            })
        BottomNavBarItem(
            BottomNavItem.Request,
            selectedDestination,
            modifier = Modifier.weight(1f),
            onCLick = {
                //selectedDestination.value = BottomNavItem.Request.route
                onAllRequestNavigate()
            })
        CreateRequestIcon(modifier = Modifier.weight(1f), onClick = {
            onCreateRequestNavigate()
        })
        BottomNavBarItem(
            BottomNavItem.History,
            selectedDestination,
            modifier = Modifier.weight(1f),
            onCLick = {
                //  selectedDestination.value = BottomNavItem.History.route
                onHistoryNavigate()
            })
        BottomNavBarItem(
            BottomNavItem.Profile,
            selectedDestination,
            modifier = Modifier.weight(1f),
            onCLick = {
                //    selectedDestination = BottomNavItem.Profile.route
                onProfileNavigate()
            })
        // }
    }
}


@Composable
fun CreateRequestIcon(onClick: () -> Unit, modifier: Modifier) {
    Box(
        modifier = modifier
            .fillMaxSize()
            .padding(8.dp)
            .clickable { onClick() }
            .background(bloodRed2, shape = RoundedCornerShape(60.dp)),
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

    Box(
        contentAlignment = Alignment.Center,
        modifier = modifier
            .clickable { onCLick() }
            .drawBehind {
                if (selected == item.route) {
                    val strokeWidth = 4.dp.toPx()
                    val y = size.height - strokeWidth / 2
                    drawLine(
                        color = bloodRed2,
                        start = Offset(0f, 0f),
                        end = Offset(size.width, 0f),
                        strokeWidth = strokeWidth
                    )
                }
            }
    )
    {
        Column(
            modifier = modifier.fillMaxHeight(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Icon(
                imageVector = item.icon,
                contentDescription = item.label,
                modifier = Modifier
                    .size(30.dp),
                tint = if (selected == item.route) bloodRed2 else Color.Gray,
            )
            Text(
                text = item.label,
                color = if (selected == item.route) bloodRed2 else Color.Gray,
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold
                //modifier = Modifier.padding(top = 8.dp) // Reduced padding to decrease space
            )
//            if(selected.value == item.route)
//            HorizontalDivider(modifier = Modifier.size(25.dp), thickness = 3.dp, color = bloodRed3)
        }
    }
}


//@Preview
//@Composable
//fun HomePreview() {
//    BottomNavBar(navController = NavController(LocalContext.current), onHomeNavigate = {
//    })
//}
