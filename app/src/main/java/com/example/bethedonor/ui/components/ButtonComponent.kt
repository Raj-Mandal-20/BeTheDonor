package com.example.bethedonor.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.bethedonor.R
import com.example.bethedonor.ui.theme.Gray3
import com.example.bethedonor.ui.theme.bgDarkBlue
import com.example.bethedonor.ui.theme.bgDarkBlue2
import com.example.bethedonor.ui.theme.bloodRed2
import com.example.bethedonor.ui.theme.bloodRed3


@Composable
fun ButtonComponent(
    buttonText: String,
    onButtonClick: () -> Unit,
    showDialog: Boolean = false,
    dialogTitle: String = "",
    dialogMessage: String = "",
    onConfirmAction: () -> Unit = {},
    dialogIcon: ImageVector = Icons.Filled.Warning,
    isEnable: Boolean = true
) {
    var isDialogVisible by remember { mutableStateOf(false) }

    if (isDialogVisible && showDialog) {
        WarningDialog(
            icon = dialogIcon,
            dialogTitle = dialogTitle,
            dialogText = dialogMessage,
            onDismissRequest = { isDialogVisible = false },
            onConfirmation = {
                isDialogVisible = false
                onConfirmAction()
            }
        )
    }

    Box(modifier = Modifier.wrapContentSize().shadow(8.dp, shape =ButtonDefaults.shape, spotColor = bgDarkBlue2, ambientColor = bgDarkBlue2)) {
        Button(
            enabled = isEnable,
            onClick = {
                isDialogVisible = true
                onButtonClick()
            },
            //   enabled = isEnable,
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    brush = Brush.horizontalGradient(
                        colors = if (isEnable) listOf(
                            bloodRed2, bloodRed3
                        ) else listOf(bgDarkBlue2, bgDarkBlue2)

                    ), shape = ButtonDefaults.shape
                )
                .clip(
                    shape = ButtonDefaults.shape
                ),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color.Transparent,
                disabledContainerColor = Color.Transparent
            ),
            // elevation = ButtonDefaults.elevatedButtonElevation(4.dp),
            // contentPadding = PaddingValues(vertical = 4.dp)
        ) {
            Text(
                text = buttonText,
                color = if(isEnable)Color.White else Color.Gray,
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold
            )
        }
    }
}