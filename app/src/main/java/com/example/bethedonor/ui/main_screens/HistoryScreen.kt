package com.example.bethedonor.ui.main_screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.navigation.NavHostController
import com.example.bethedonor.ui.theme.bgDarkBlue

@Composable
fun HistoryScreen(navController: NavHostController, uId: String) {
    Box(
        modifier = Modifier
            .fillMaxSize(), contentAlignment = Alignment.Center
    ) {
        Surface(
            modifier = Modifier
                .fillMaxSize(),

            ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        color = bgDarkBlue
                    ), contentAlignment = Alignment.Center
            ) {
                Text(text = "HIstory", color = Color.White)
            }
        }
    }
}