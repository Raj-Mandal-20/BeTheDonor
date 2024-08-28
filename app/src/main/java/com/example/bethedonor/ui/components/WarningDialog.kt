package com.example.bethedonor.ui.components

import androidx.compose.foundation.layout.size
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.example.bethedonor.ui.theme.Gray1
import com.example.bethedonor.ui.theme.bloodRed2
import com.example.bethedonor.ui.theme.fadeBlue11

@Composable
fun WarningDialog(
    onDismissRequest: () -> Unit,
    onConfirmation: () -> Unit,
    dialogTitle: String,
    dialogText: String,
    icon: ImageVector
) {
    AlertDialog(
        containerColor = fadeBlue11,
        icon = {
            Icon(icon, contentDescription = "Example Icon", tint = bloodRed2, modifier = Modifier.size(30.dp))
        },
        title = {
            Text(text = dialogTitle, color = Color.White)
        },
        text = {
            Text(text = dialogText, color = Gray1, textAlign = TextAlign.Justify)
        },
        onDismissRequest = {
          //
        },
        confirmButton = {
            TextButton(
                onClick = {
                    onConfirmation()
                }
            ) {

                Text("Confirm",color = bloodRed2)
            }
        },
        dismissButton = {
            TextButton(
                onClick = {
                    onDismissRequest()
                }
            ) {
                Text("Dismiss",color = Color.White)
            }
        }
    )
}