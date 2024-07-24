package com.example.bethedonor.ui.temporay_screen

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Fill
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.clipPath
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.bethedonor.ui.theme.bgDarkBlue
import com.example.bethedonor.ui.theme.bloodRed

@Composable
fun LoadingScreen() {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(bgDarkBlue),
        contentAlignment = Alignment.Center
    ) {
        BloodDropLoadingAnimation()
    }
}

@Composable
fun BloodDropLoadingAnimation() {
    var fillFraction by remember { mutableFloatStateOf(0f) }
    val animatedFillFraction by animateFloatAsState(
        targetValue = fillFraction,
        animationSpec = tween(
            durationMillis = 2000,
            easing = LinearEasing
        ), label = ""
    )

    // Start the animation when the composable is launched
    LaunchedEffect(Unit) {
        fillFraction = 1f
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(bgDarkBlue),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        BloodPouchShape(animatedFillFraction)
    }
}

@Composable
fun BloodPouchShape(fillFraction: Float) {
    Canvas(modifier = Modifier.size(200.dp)) {
        val width = size.width
        val height = size.height

        val path = Path().apply {
            // Create the blood pouch shape
            moveTo(width / 2, 0f) // Start at the top center
            quadraticTo(width * 0.85f, height * 0.2f, width * 0.75f, height * 0.4f) // Top curve
            cubicTo(width * 0.9f, height * 0.6f, width * 0.1f, height * 0.6f, width * 0.25f, height * 0.4f) // Pouch sides
            quadraticTo(width * 0.15f, height * 0.2f, width / 2, 0f) // Bottom curve
            close()
        }

        drawPath(path, color = Color.Gray, style = Stroke(width = 10f))

        clipPath(path) {
            drawRect(
                color = bloodRed,
                size = size.copy(height = size.height * fillFraction),
                topLeft = Offset(0f, size.height * (1 - fillFraction))
            )
        }
    }
}