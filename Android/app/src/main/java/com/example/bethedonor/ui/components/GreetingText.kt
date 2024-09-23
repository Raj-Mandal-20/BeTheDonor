package com.example.bethedonor.ui.components

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.example.bethedonor.ui.theme.teal

@Composable
fun GreetingText() {
    Text(
        text = "Hey there,",
        style = TextStyle(fontSize = 18.sp, fontWeight = FontWeight.SemiBold, color = teal)
    )
}