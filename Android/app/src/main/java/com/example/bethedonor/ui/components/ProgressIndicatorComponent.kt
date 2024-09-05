package com.example.bethedonor.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color.Companion.White
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import com.example.bethedonor.ui.theme.bgDarkBlue2
import com.example.bethedonor.ui.theme.bloodRed2
import com.example.bethedonor.ui.theme.darkGray
import com.example.bethedonor.ui.theme.fadeBlue11
import com.example.bethedonor.ui.theme.fadeBlue2
import com.example.bethedonor.ui.theme.teal

@Preview
@Composable
fun ProgressIndicatorComponent(label: String="Deleting...") {
    Dialog(
        onDismissRequest = { },
        DialogProperties(dismissOnBackPress = false, dismissOnClickOutside = false)
    ) {
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier
                .fillMaxWidth()
                .background(fadeBlue11, shape = RoundedCornerShape(8.dp))
        ) {
            Row(
                Modifier.fillMaxWidth().padding(vertical = 20.dp, horizontal = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                CircularProgressIndicator(
                    color = bloodRed2,
                    strokeWidth = 4.dp,
                    trackColor = darkGray,
                    strokeCap = StrokeCap.Round
                )

                Text(text = label, style = MaterialTheme.typography.bodyLarge, color = White)
            }

        }
    }

}