package com.example.bethedonor.ui.components


import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.bethedonor.ui.components.ForgotPasswordRecoveryDialog
import com.example.bethedonor.ui.theme.teal
import com.example.bethedonor.viewmodels.ForgotPasswordViewModel


@Composable
fun ForgotPassword(
    viewModel: ForgotPasswordViewModel = viewModel(),
    onResetProcessResult: (message: String) -> Unit
) {
    val context = LocalContext.current
    val showDialog = remember { mutableStateOf(false) }
    val recheck = remember {
        mutableStateOf(false)
    }
    Text(
        text = "Forgot Password?",
        style = TextStyle(fontSize = 15.sp, fontWeight = FontWeight.SemiBold, color = teal),
        modifier = Modifier
            .fillMaxWidth()
            .clickable {
                showDialog.value = true
            }, textAlign = TextAlign.Right

    )
    if (showDialog.value) {
        ForgotPasswordRecoveryDialog(
            setShowDialog = {
                showDialog.value = it
            }, viewModel = viewModel, onButtonCLick = {
                recheck.value = true
                if (viewModel.`forgot-passwordUiState`.value.emailIdErrorState.status) {
                    viewModel.resetPassWord(
                        viewModel.`forgot-passwordUiState`.value.emailId,
                        onProcessResult = { status, message ->
                            onResetProcessResult(message)
                            showDialog.value = false
                        })
                }
            }, recheck = recheck
        )
    }
}

