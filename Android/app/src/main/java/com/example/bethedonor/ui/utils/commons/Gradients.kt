package com.example.bethedonor.ui.utils.commons

import android.graphics.Color
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import com.example.bethedonor.ui.theme.fadeBlue1
import com.example.bethedonor.ui.theme.fadeBlue2

fun linearGradientBrush(
    start: Offset = Offset.Zero,
    end: Offset = Offset.Infinite
): Brush {
    return Brush.linearGradient(
        colors = listOf(fadeBlue1, fadeBlue2),
        start = start,
        end = end
    )
}

