package com.example.bethedonor.ui.components

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

@Composable
fun SubGreetText(text: String) {
    Text(
        text = text,
        style = TextStyle(fontSize = 22.sp, fontWeight = FontWeight.Bold, color = Color.White)
    )
}