package com.example.bethedonor.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.bethedonor.ui.theme.bloodRed2
import com.example.bethedonor.ui.theme.bloodRed3


@Composable
fun ButtonComponent(text: String, onButtonClick: () -> Unit, isEnable: Boolean = false) {
    Box {
        Button(
            onClick = { onButtonClick() },
            //   enabled = isEnable,
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    brush = Brush.horizontalGradient(
                        colors = listOf(
                            bloodRed2, bloodRed3
                        )
                    ), shape = ButtonDefaults.shape
                )
                .padding(vertical = 4.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
        ) {
            Text(
                text = text,
                color = Color.White,
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold
            )
        }
    }
}