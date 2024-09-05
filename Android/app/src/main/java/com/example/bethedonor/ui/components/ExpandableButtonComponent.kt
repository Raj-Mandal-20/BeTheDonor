package com.example.bethedonor.ui.components

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ExpandLess
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun ExpandableButtonComponent(
    expanded: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    IconButton(
        onClick = onClick,
        modifier = modifier.clip(RoundedCornerShape(30.dp))
    ) {
        val icon = if (expanded) Icons.Default.ExpandLess else Icons.Default.ExpandMore
        Icon(
            imageVector = icon,
            contentDescription = if (expanded) "Show less" else "Show more",
            tint = Color.Gray
        )
    }

}