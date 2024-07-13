package com.example.bethedonor.ui.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Cancel
import androidx.compose.material.icons.filled.Email
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import com.example.bethedonor.data.uievent.ForgotPasswordUiEvent
import com.example.bethedonor.ui.theme.Gray1
import com.example.bethedonor.ui.theme.teal
import com.example.bethedonor.viewmodels.ForgotPasswordViewModel


@Composable
fun ForgotPasswordRecoveryDialog(
    setShowDialog: (status: Boolean) -> Unit,
    viewModel: ForgotPasswordViewModel,
    onButtonCLick: () -> Unit,
    recheck: MutableState<Boolean>
) {
    var recheckFiled by remember {
        mutableStateOf(recheck)
    }
    val context = LocalContext.current

    Dialog(
        onDismissRequest = { setShowDialog(false) }, properties = DialogProperties(
            dismissOnBackPress = false, dismissOnClickOutside = false
        )
    ) {
        Surface(
            shape = RoundedCornerShape(16.dp),
            color = Color.White
        ) {
            Box(
                contentAlignment = Alignment.Center
            ) {
                Column(modifier = Modifier.padding(20.dp)) {

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Enter Valid Email to Reset Password",
                            modifier = Modifier.weight(1f),
                            style = TextStyle(
                                fontSize = 18.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.Black
                            ),
                            textAlign = TextAlign.Left
                        )
                        Icon(
                            imageVector = Icons.Filled.Cancel,
                            contentDescription = "",
                            tint = Color.Gray,
                            modifier = Modifier
                                .width(30.dp)
                                .height(30.dp)
                                .clickable { setShowDialog(false) }
                        )
                    }
                    Spacer(modifier = Modifier.height(16.dp))
                    EditText(
                        label = "Email-id",
                        labelIcon = Icons.Filled.Email,
                        onFiledValueChanged = {
                            viewModel.onEvent(ForgotPasswordUiEvent.EmailValueChangeEvent(it))
                            //viewModel.printState()
                            viewModel.`forgot-passwordUiState`.value.emailIdErrorState
                        },recheckFiled=recheck.value)
                    Spacer(modifier = Modifier.height(16.dp))
                    ButtonComponent(
                        text = "Done",
                        onButtonClick = onButtonCLick
                    )
                }
                if (viewModel.requestInProgress.value)
                    CircularProgressIndicator(color = teal, trackColor = Gray1)
            }
        }
    }
}

//@Preview
//@Composable
//private fun preview() {
//    ForgotPasswordRecoveryDialog(setShowDialog = {
//        true
//    }, ForgotPasswordViewModel(), onButtonCLick = {
//
//    }, recheck=false)
//}